const xss = require("xss");

const listsService = {
  postList(db, newList) {
    return db
      .insert(newList)
      .into("trelloclone_lists")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  serializeList(list) {
    return {
      id: list.id,
      title: xss(list.title),
      date_created: list.date_created,
      user_id: list.user_id,
      board_id: list.board_id,
    };
  },
  // getAllUserBoards(db, userId) {
  //   return db
  //     .select("*")
  //     .from("trelloclone_boards")
  //     .where("trelloclone_boards.user_id", userId);
  // },
};
module.exports = listsService;
