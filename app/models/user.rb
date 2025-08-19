class User < ApplicationRecord
  has_one :vote
  has_one :voted_candidate, through: :vote, source: :candidate
  validates :email, uniqueness: true
end
