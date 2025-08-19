import React from "react";

const Results = ({ candidates, votes }) => {
  function getCandidateName(id) {
    return candidates.find((candidate) => id === candidate.id).name;
  }

  // Convert list to an array of [id, count] pairs & ensure they're Numbers
  // for easier sorting and display.
  const voteList = Object.entries(votes).map(([id, count]) => [
    Number(id),
    Number(count),
  ]);

  // Sort by count descending.
  voteList.sort(([, countA], [, countB]) => countB - countA);

  return (
    <div className="table">
      <h2>View Results</h2>
      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {voteList.map(([candId, count]) => (
            <tr key={candId}>
              <td scope="row">{getCandidateName(candId)}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
