class Api::PatientsController < ApplicationController
  require 'csv'
  before_action :authenticate_user!
  before_action :set_patient

  def show
    render json: @patient
  end

  def meals
    meals = @patient.meals.where('created_at >= ?', Date.today.beginning_of_day).map { |m| m.info }
    render json: meals
  end

  def reports
    filter = params[:filter] || 'last_week'
    reports = @patient.generate_reports(filter)
    render json: reports
  end

  def reports_csv
    filter = params[:filter] || 'last_week'
    reports = @patient.generate_reports(filter)

    csv_data = CSV.generate(headers: true) do |csv|
      csv << ["Date", "Total Calories", "Total Carbohydrates"]
      reports[:meals_by_day].each do |date, data|
        csv << [date, data[:total_calories], data[:total_carbohydrates]]
      end
    end

    send_data csv_data, filename: "reports_#{filter}.csv"
  end

  private

  def set_patient
    @patient = current_user.role == 'patient' ? current_user : User.find_by(id: params[:id])
    render json: { error: 'Patiient not found' }, status: :not_found unless @patient.role == 'patient'
  end
end