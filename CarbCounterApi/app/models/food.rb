# == Schema Information
#
# Table name: foods
#
#  id            :bigint           not null, primary key
#  calories      :integer
#  carbohydrates :integer
#  name          :string
#  portion       :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  meal_id       :bigint           not null
#
# Indexes
#
#  index_foods_on_meal_id  (meal_id)
#
# Foreign Keys
#
#  fk_rails_...  (meal_id => meals.id)
#
class Food < ApplicationRecord
  belongs_to :meal

  validates :name, presence: true
  validates :portion, presence: true
  validates :calories, presence: true
  validates :carbohydrates, presence: true
end
