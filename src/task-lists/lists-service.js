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
      list_title: xss(list.list_title),
      date_created: list.date_created,
      user_id: list.user_id,
      board_id: list.board_id,
    };
  },
  getAllListsByBoardId(db, boardId) {
    return db
      .select("*")
      .from("trelloclone_lists")
      .where("trelloclone_lists.board_id", boardId);
  },
};
module.exports = listsService;
