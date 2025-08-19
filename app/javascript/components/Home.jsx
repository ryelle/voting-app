import React, { useState } from "react";
import Button from "./button";
import InputControl from "./input-control";
import RadioInputControl from "./input-control/radio";

const Home = ({ candidates, user, votedFor = 0 }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(!!votedFor);
  const [newCandidate, setNewCandidate] = useState("");
  const [selected, setSelected] = useState(votedFor);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Don't do anything if the form is not filled in yet.
    if (!selected && !newCandidate) {
      return;
    }
    // Indicate to the user that something is happening.
    setIsSubmitting(true);
    // If a candidate is created, it will overwrite this
    // (which should be 0 in that case).
    let voteFor = selected;

    // If there is a new candidate, create it and save the ID to voteFor.
    if (newCandidate) {
      try {
        const response = await fetch("/candidates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": document.querySelector("[name='csrf-token']")
              .content,
          },
          body: JSON.stringify({ candidate: { name: newCandidate } }),
        });
        // Failed to insert new candidate.
        if (response.status !== 201) {
          // @todo Actual error handling.
          setIsSubmitting(false);
          return;
        }
        const data = await response.json();
        voteFor = data.id;
      } catch (error) {
        // @todo Actual error handling.
        console.log(error);
        setIsSubmitting(false);
        return;
      }
    }

    // Whether we've just created it or it existed, we now need to submit
    // the vote for the selected candidate.
    try {
      const response = await fetch("/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        },
        body: JSON.stringify({ vote: { candidate_id: voteFor } }),
      });
      if (response.status === 201) {
        setHasSubmitted(true);
      }
    } catch (error) {
      // @todo Actual error handling.
      console.log(error);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center" }}>
        <p>You must be logged in to vote.</p>
        <p className="row" style={{ marginBlockStart: "var(--spacing--30)" }}>
          <span className="separator" aria-hidden />
          <a
            href="/login"
            className="button"
            style={{ display: "inline-block" }}
          >
            Log in
          </a>
          <span className="separator" aria-hidden />
          <a
            href="/signup"
            className="button"
            style={{ display: "inline-block" }}
          >
            Sign up
          </a>
          <span className="separator" aria-hidden />
        </p>
      </div>
    );
  }

  if (hasSubmitted) {
    // @todo Use some kind of shared Card component for these messages,
    // to avoid the inline styles.
    return (
      <div style={{ textAlign: "center" }}>
        <p>Thank you for voting!</p>
        <p style={{ marginBlockStart: "var(--spacing--30)" }}>
          <a
            href="/results"
            className="button"
            style={{ display: "inline-block" }}
          >
            View all results
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>Cast your vote!</h2>
        <fieldset>
          <legend className="sr-only">Cast your vote</legend>
          {candidates.map(({ id, name }) => (
            <RadioInputControl
              key={id}
              label={name}
              name="candidate"
              value={id}
              checked={selected === id && !newCandidate}
              onChange={(value) => {
                if (newCandidate) {
                  setNewCandidate("");
                }
                setSelected(Number(value));
              }}
            />
          ))}
          {candidates.length < 10 && (
            <InputControl
              label="Add a new candidate"
              value={newCandidate}
              placeholder="Someone else"
              onClick={() => {
                if (selected) {
                  setSelected(0);
                }
              }}
              onChange={(value) => setNewCandidate(value)}
            />
          )}
        </fieldset>
        <Button disabled={isSubmitting}>Vote</Button>
      </form>
    </div>
  );
};

export default Home;
