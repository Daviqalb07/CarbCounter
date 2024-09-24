# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  birth_date             :date
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  jti                    :string
#  name                   :string
#  professional_register  :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  role                   :string
#  unique_code            :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_jti                   (jti)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_unique_code           (unique_code) UNIQUE
#
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  ROLES = %w[patient supervisor professional].freeze
  REPORTS_FILTERS = %w[last_week last_fortnight last_month]

  before_create :generate_unique_code

  validates :role, inclusion: { in: ROLES }
  validates :name, presence: true
  validates :birth_date, presence: true
  validates :professional_register, presence: true, if: -> { role == 'professional' }
  validates :unique_code, uniqueness: true


  has_many :meals, dependent: :destroy

  has_and_belongs_to_many :professionals,
    class_name: 'User',
    join_table: :patients_professionals,
    foreign_key: :patient_id,
    association_foreign_key: :professional_id

  has_and_belongs_to_many :supervisors,
    class_name: 'User',
    join_table: :patients_supervisors,
    foreign_key: :patient_id,
    association_foreign_key: :supervisor_id

  has_and_belongs_to_many :patients,
    class_name: 'User',
    join_table: :patients_professionals,
    foreign_key: :professional_id,
    association_foreign_key: :patient_id

  has_and_belongs_to_many :supervised_patients,
    class_name: 'User',
    join_table: :patients_supervisors,
    foreign_key: :supervisor_id,
    association_foreign_key: :patient_id


  def role?(base_role)
    role == base_role.to_s
  end

  def generate_reports(filter)
    return unless REPORTS_FILTERS.include?(filter)
  
    start_date = case filter
                 when 'last_week'
                   1.week.ago.beginning_of_day
                 when 'last_month'
                   1.month.ago.beginning_of_day
                 when 'last_fortnight'
                   2.week.ago.beginning_of_day
                 end

  
    meals_within_filter = meals.where('created_at >= ?', start_date)
 
    meals_grouped_by_day = meals_within_filter.group_by { |meal| meal.created_at.to_date }

  
    total_calories = meals_within_filter.sum { |meal| meal.total_calories }
    total_carbohydrates = meals_within_filter.sum { |meal| meal.total_cho }
  
    report = {
      total_calories: total_calories,
      total_carbohydrates: total_carbohydrates,
      meals_by_day: meals_grouped_by_day.sort_by { |date, _| -date.to_time.to_i }.to_h.transform_values do |meals|
        {
          total_calories: meals.sum(&:total_calories),
          total_carbohydrates: meals.sum(&:total_cho),
          meals: meals.map(&:info)
        }
      end
    }
  
    report
  end

  def info
    user_info = {
      id: id,
      name: name,
      email: email,
      role: role,
      created_at: created_at,
      updated_at: updated_at,
      unique_code: unique_code
    }

    case role
    when 'patient'
      user_info[:professionals] = professionals.map do |professional|
        {
          id: professional.id,
          name: professional.name,
          email: professional.email
        }
      end

      user_info[:supervisors] = supervisors.map do |supervisor|
        {
          id: supervisor.id,
          name: supervisor.name,
          email: supervisor.email
        }
      end
    when 'professional'
      user_info[:patients] = patients.map do |patient|
        {
          id: patient.id,
          name: patient.name,
          email: patient.email
        }
      end
    when 'supervisor'
      user_info[:supervised_patients] = supervised_patients.map do |patient|
        {
          id: patient.id,
          name: patient.name,
          email: patient.email
        }
      end
    end

    user_info
  end

  private

  def generate_unique_code
    loop do
      self.unique_code = SecureRandom.random_number(10**6).to_s.rjust(6, '0')
      break unless User.exists?(unique_code: unique_code)
    end
  end
  
end
