const xss = require("xss");

const boardsService = {
  postBoard(db, newBoard) {
    return db
      .insert(newBoard)
      .into("trelloclone_boards")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  serializeBoard(board) {
    return {
      id: board.id,
      title: xss(board.title),
      date_created: board.date_created,
      user_id: board.user_id,
    };
  },
  getAllUserBoards(db, userId) {
    return db
      .select("*")
      .from("trelloclone_boards")
      .where("trelloclone_boards.user_id", userId);
  },
};
module.exports = boardsService;
