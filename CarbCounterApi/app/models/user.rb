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
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_jti                   (jti)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  ROLES = %w[patient supervisor professional].freeze
  REPORTS_FILTERS = %w[last_week last_month last_year]

  validates :role, inclusion: { in: ROLES }
  validates :name, presence: true
  validates :birth_date, presence: true
  validates :professional_register, presence: true, if: -> { role == 'professional' }

  has_many :meals, dependent: :destroy

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
                 when 'last_year'
                   1.year.ago.beginning_of_day
                 end

  
    meals_within_filter = meals.where('created_at >= ?', start_date)
 
    meals_grouped_by_day = meals_within_filter.group_by { |meal| meal.created_at.to_date }

  
    total_calories = meals_within_filter.sum { |meal| meal.total_calories }
    total_carbohydrates = meals_within_filter.sum { |meal| meal.total_cho }
  
    report = {
      total_calories: total_calories,
      total_carbohydrates: total_carbohydrates,
      meals_by_day: meals_grouped_by_day.transform_values do |meals|
        {
          total_calories: meals.sum(&:total_calories),
          total_carbohydrates: meals.sum(&:total_cho),
          meals: meals.map(&:info)
        }
      end
    }
  
    report
  end
  
end
