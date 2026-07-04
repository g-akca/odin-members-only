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

async function getUserByEmail(email) {
  try {
    return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw(error);
  }
}

async function getUserById(id) {
  try {
    return await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error finding user by id:", error);
    throw(error);
  }
}

async function insertMessage(userId, title, message, timestamp) {
  try {
    await pool.query("INSERT INTO messages (user_id, title, message, timestamp) VALUES ($1, $2, $3, $4)", [userId, title, message, timestamp]);
  } catch (error) {
    console.error("Error inserting new message:", error);
    throw(error);
  }
}

async function getAllMessages() {
  try {
    return await pool.query("SELECT messages.*, users.first_name, users.last_name FROM messages JOIN users ON messages.user_id = users.id");
  } catch (error) {
    console.error("Error getting messages:", error);
    throw(error);
  }
}

export { insertUser, makeUserMember, getUserByEmail, getUserById, insertMessage, getAllMessages };