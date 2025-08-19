class CandidatesController < ApiController
  def index
    render json: Candidate.all
  end

  def create
    candidate = Candidate.new(candidate_params)
    if candidate.save
      render json: candidate, status: :created
    else
      render json: { errors: candidate.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def candidate_params
    params.require(:candidate).permit(:name)
  end
end
