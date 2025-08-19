class ResultsController < ApplicationController
  def index
    # Get full candidates list so we can display names in table.
    @candidates = Candidate.all
    # Get vote counts grouped by candidate ID.
    @votes = Vote.group('candidate_id').count
  end
end
