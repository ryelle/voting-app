require 'rails_helper'

RSpec.describe "Results", type: :request do
  describe "GET /results" do
    it "renders successfully" do
      get "/results"
      expect(response).to be_successful
      expect(response.body).to include('Vote.Website')
      expect(response.body).to include('data-react-class="Results"')
    end
  end
end
