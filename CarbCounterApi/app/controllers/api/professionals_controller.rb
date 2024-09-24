class Api::ProfessionalsController < ApplicationController
  before_action :set_professional, only: [:add_patient, :get_patients]
  before_action :set_patient, only: [:add_patient]

  def add_patient
    if @professional && @patient
      if @patient.professionals.include?(@professional)
        render json: { error: 'Patient is already associated with this professional.' }, status: :unprocessable_entity
      else
        @patient.professionals << @professional
        render json: { message: 'Professional successfully added to patient.' }, status: :ok
      end
    else
      render json: { error: 'Professional or patient not found.' }, status: :not_found
    end
  end

  def get_patients
    if @professional
      patients = @professional.patients
      render json: { patients: patients }, status: :ok
    else
      render json: { error: 'Professional not found' }, status: :not_found
    end
  end

  private

  def set_professional
    @professional = current_user.role == 'professional' ? current_user : User.find_by(id: params[:id])
    render json: { error: 'Professional not found' }, status: :not_found unless @professional&.role == 'professional'
  end

  def set_patient
    @patient = User.find_by(unique_code: params[:unique_code])
    render json: { error: 'Patient not found' }, status: :not_found unless @patient&.role == 'patient'
  end
end