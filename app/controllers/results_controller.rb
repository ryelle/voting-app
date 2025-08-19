class ResultsController < ApplicationController
  def index
    # Get full candidates list so we can display names in table.
    @candidates = Candidate.all
    # Get vote counts grouped by candidate ID.
    # This could group by name since name should be unique,
    # but I prefer grouping by ID.
    @votes = Vote.joins(:candidate)
      .group('candidates.id')
      .count
  end
end
