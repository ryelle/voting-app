class SessionsController < ApplicationController
  helper_method :destroy

  def new
  end

  def create
    @user = User.find_by_email(params[:session][:email])
    # If this were real, we would also validate the password.
    if @user
      session[:user_id] = @user.id
      redirect_to '/', allow_other_host: true
    else
      redirect_to '/login', allow_other_host: true
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/'
  end

end
