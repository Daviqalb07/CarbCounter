class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    resource.save
    if resource.persisted?
      sign_up(resource_name, resource)
      render json: { message: 'Signed up successfully', user: resource }, status: :ok
    else
      clean_up_passwords resource
      set_minimum_password_length
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if update_params[:password] != update_params[:password_confirmation]
      render json: { errors: ["Password and password confirmation do not match"] }, status: :unprocessable_entity
    elsif current_user.update(update_params)
      render json: { message: 'Profile updated successfully', user: current_user }, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def update_params
    params.require(:user).permit(:name, :birth_date, :professional_register, :role, :email, :password, :password_confirmation)
  end
end