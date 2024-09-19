class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  ROLES = %w[patient supervisor professional].freeze

  validates :role, inclusion: { in: ROLES }

  def role?(base_role)
    role == base_role.to_s
  end
end
