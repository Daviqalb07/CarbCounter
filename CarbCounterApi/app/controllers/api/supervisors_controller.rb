class Api::SupervisorsController < ApplicationController
  before_action :set_supervisor, only: [:add_patient, :get_patients]
  before_action :set_patient, only: [:add_patient]

  def add_patient
    if @supervisor && @patient
      if @patient.supervisors.include?(@supervisor)
        render json: { error: 'Patient is already associated with this supervisor.' }, status: :unprocessable_entity
      else
        @patient.supervisors << @supervisor
        render json: { message: 'Supervisor successfully added to patient.' }, status: :ok
      end
    else
      render json: { error: 'Supervisor or patient not found.' }, status: :not_found
    end
  end

  def get_patients
    if @supervisor
      patients = @supervisor.supervised_patients
      render json: { patients: patients }, status: :ok
    else
      render json: { error: 'Supervisor not found' }, status: :not_found
    end
  end

  private

  def set_supervisor
    @supervisor = current_user.role == 'supervisor' ? current_user : User.find_by(id: params[:id])
    render json: { error: 'Supervisor not found' }, status: :not_found unless @supervisor&.role == 'supervisor'
  end

  def set_patient
    @patient = User.find_by(unique_code: params[:unique_code])
    render json: { error: 'Patient not found' }, status: :not_found unless @patient&.role == 'patient'
  end
end