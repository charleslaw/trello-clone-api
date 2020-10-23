const xss = require("xss");
const bcrypt = require("bcrypt");

// regex checks if string contains upper case char, lower case char, number and special character
const passwordValidationRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  containsUserWithEmailAddress(db, email) {
    return db("trelloclone_users")
      .where({ email })
      .first()
      .then((user) => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("trelloclone_users")
      .returning("*")
      .then(([user]) => user);
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      email: xss(user.email),
      date_created: new Date(user.date_created),
    };
  },
  validatePassword(password, confirmPassword) {
    if (password.length < 8) {
      return "Password must be longer than 8 characters";
    }
    if (password.length > 72) {
      return "Password must be less than 72 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty spaces";
    }
    if (!passwordValidationRegex.test(password)) {
      return "Password must contain at least 1 lower case letter, 1 upper case letter, 1 number, and 1 special character";
    }
    if (password != confirmPassword) {
      return "Passwords must match";
    }
    return null;
  },
  getAllUsers(knex) {
    return knex.select("*").from("trelloclone_users");
  },
  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("trelloclone_users")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from("trelloclone_users")
      .select("*")
      .where("id", id)
      .first();
  },
  deleteUser(knex, id) {
    return knex("trelloclone_users").where({ id }).delete();
  },
  updateUser(knex, id, newUserFields) {
    return knex("trelloclone_user").where({ id }).update(newUserFields);
  },
};
module.exports = UsersService;
