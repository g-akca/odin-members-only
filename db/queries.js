import pool from "./pool.js";

async function insertUser(firstName, lastName, email, hashedPassword) {
  try {
    await pool.query("INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)", [firstName, lastName, email, hashedPassword]);
  } catch (error) {
    console.error("Error inserting user to the database: ", error);
    throw(error);
  }
}

async function makeUserMember(id) {
  try {
    await pool.query("UPDATE users SET is_member = TRUE WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error making user a member:", error);
    throw(error);
  }
}

export { insertUser, makeUserMember };