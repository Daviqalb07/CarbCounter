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
end
