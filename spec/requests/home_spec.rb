require 'rails_helper'

RSpec.describe "Home", type: :request do
  describe "GET /index" do
    it "renders successfully" do
      get root_path
      expect(response).to be_successful
      expect(response.body).to include('Vote.Website')
      expect(response.body).to include('data-react-class="Home"')
    end
  end
end
