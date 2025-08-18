class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :zip
      # Placeholder field for password, anything entered will be valid.
      t.string :password

      t.timestamps
    end
  end
end
