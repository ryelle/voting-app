class VotesController < ApiController
  def index
    # Anyone can read/list votes
    render json: Vote.all
  end

  def create
    # Only authenticated users can create a vote
    vote = Vote.new(vote_params.merge(user: current_user))
    if vote.save
      render json: vote, status: :created
    else
      render json: { errors: vote.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def vote_params
    params.require(:vote).permit(:candidate_id)
  end
end
