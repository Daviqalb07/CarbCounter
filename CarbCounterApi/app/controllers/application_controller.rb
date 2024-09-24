class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include ActionController::Flash


  protect_from_forgery with: :null_session

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:role, :name, :birth_date, :professional_register])
    devise_parameter_sanitizer.permit(:account_update, keys: [:role, :name, :birth_date, :professional_register, :email, :password, :password_confirmation])
  end
end