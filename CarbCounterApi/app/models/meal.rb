# == Schema Information
#
# Table name: meals
#
#  id         :bigint           not null, primary key
#  image      :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_meals_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Meal < ApplicationRecord
  belongs_to :user
  has_many :foods, dependent: :destroy

  validates :name, presence: true
  validates :image, presence: true

  before_destroy :destroy_foods

  def total_calories
    foods.sum(:calories)
  end

  def total_cho
    foods.sum(:carbohydrates)
  end

  def info
    {
      id: id,
      name: name,
      image: image,
      created_at: created_at,
      updated_at: updated_at,
      total_calories: total_calories,
      total_cho: total_cho,
      foods: foods.map do |food|
        {
          id: food.id,
          name: food.name,
          portion: food.portion,
          calories: food.calories,
          carbohydrates: food.carbohydrates
        }
      end
    }
  end

  private

  def destroy_foods
    foods.destroy_all
  end
end
