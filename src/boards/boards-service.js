const xss = require("xss");

const boardsService = {
  getById(db, id) {
    return db
      .from("trelloclone_boards AS board")
      .select(
        "board.id",
        "board.title",
        "board.date_created",
        "board.user_id",
        db.raw(
          `json_strip_nulls(
          row_to_json(
            (SELECT tmp FROM (
              SELECT
                usr.id,
                usr.email,
                usr.date_created
            ) tmp)
          )
        ) AS 'user'`
        )
      )
      .leftjoin("trelloclone_users AS usr", "board.user_id", "usr.id")
      .where("board.id", id)
      .first();
  },
  postBoard(db, newBoard) {
    return db
      .insert(newBoard)
      .into("trelloclone_boards")
      .returning("*")
      .then(([board]) => board)
      .then((board) => boardsService.getById(db, board.id));
  },
  serializeBoard(board) {
    const { user } = board;
    return {
      id: board.id,
      title: xss(board.title),
    };
  },
};

module.exports = boardsService;
