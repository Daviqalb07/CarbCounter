class Api::MealsController < ApplicationController
  before_action :authenticate_user!

  def create
    foods_attributes = meal_params.delete(:foods)
    meal = current_user.meals.build(name: meal_params[:name], image: meal_params[:image])

    if meal.save!
      foods_attributes.each do |food_attr|
        meal.foods.create!(food_attr)
      end
      render json: meal.info, status: :created
    else
      render json: meal.errors, status: :unprocessable_entity
    end
  end

  private

  def meal_params
    params.require(:meal).permit(:name, :image, foods: [:name, :portion, :calories, :carbohydrates])
  end
end