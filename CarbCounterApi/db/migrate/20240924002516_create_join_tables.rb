class CreateJoinTables < ActiveRecord::Migration[7.0]
  def change
    create_table :patients_professionals, id: false do |t|
      t.bigint :patient_id, null: false
      t.bigint :professional_id, null: false
    end

    create_table :patients_supervisors, id: false do |t|
      t.bigint :patient_id, null: false
      t.bigint :supervisor_id, null: false
    end

    add_index :patients_professionals, :patient_id
    add_index :patients_professionals, :professional_id
    add_index :patients_supervisors, :patient_id
    add_index :patients_supervisors, :supervisor_id
  end
end