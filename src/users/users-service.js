const UsersService = {
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
