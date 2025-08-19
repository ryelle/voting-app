class ApiController < ActionController::API
  before_action :authenticate_user!, only: [:create]
  helper_method :current_user

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authenticate_user!
    unless current_user
      render json: { error: "Not Authorized" }, status: :unauthorized
    end
  end
end
