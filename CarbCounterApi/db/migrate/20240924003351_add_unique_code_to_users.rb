class AddUniqueCodeToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :unique_code, :string
    add_index :users, :unique_code, unique: true
  end
end
