import pool from "./pool.js";

async function insertUser(firstName, lastName, email, hashedPassword) {
  try {
    await pool.query("INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)", [firstName, lastName, email, hashedPassword]);
  }
  catch (error) {
    console.error("Error inserting user to the database: ", error);
    throw(error);
  }
}

export { insertUser };