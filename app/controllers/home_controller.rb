class HomeController < ApplicationController
  def index
    @candidates = Candidate.all
    @voted_candidate_id = current_user&.vote&.candidate_id
  end
end
