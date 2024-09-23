class AddDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :name, :string
    add_column :users, :birth_date, :date
    add_column :users, :professional_register, :string
  end
end