# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_09_24_003351) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "foods", force: :cascade do |t|
    t.string "name"
    t.string "portion"
    t.integer "calories"
    t.integer "carbohydrates"
    t.bigint "meal_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meal_id"], name: "index_foods_on_meal_id"
  end

  create_table "meals", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_meals_on_user_id"
  end

  create_table "patients_professionals", id: false, force: :cascade do |t|
    t.bigint "patient_id", null: false
    t.bigint "professional_id", null: false
    t.index ["patient_id"], name: "index_patients_professionals_on_patient_id"
    t.index ["professional_id"], name: "index_patients_professionals_on_professional_id"
  end

  create_table "patients_supervisors", id: false, force: :cascade do |t|
    t.bigint "patient_id", null: false
    t.bigint "supervisor_id", null: false
    t.index ["patient_id"], name: "index_patients_supervisors_on_patient_id"
    t.index ["supervisor_id"], name: "index_patients_supervisors_on_supervisor_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role"
    t.string "name"
    t.date "birth_date"
    t.string "professional_register"
    t.string "jti"
    t.string "unique_code"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unique_code"], name: "index_users_on_unique_code", unique: true
  end

  add_foreign_key "foods", "meals"
  add_foreign_key "meals", "users"
end
