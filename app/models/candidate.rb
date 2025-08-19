class Candidate < ApplicationRecord
  has_many :votes
  has_many :voters, through: :votes, source: :user
  validate :maximum_candidates_limit
  
  private
  
  def maximum_candidates_limit
    if Candidate.count >= 10 && new_record?
      errors.add(:base, "Cannot create more than 10 candidates")
    end
  end
end
