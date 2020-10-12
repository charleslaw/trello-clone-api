const xss = require("xss");

const tasksService = {
  postTask(db, task) {
    return db
      .insert(task)
      .into("trelloclone_tasks")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  serializeTask(task) {
    return {
      id: task.id,
      title: xss(task.title),
      date_created: task.date_created,
      user_id: task.user_id,
      list_id: task.list_id,
    };
  },
  getTasksByListId(db, listId) {
    return db
      .select("*")
      .from("trelloclone_tasks")
      .where("trelloclone_tasks.list_id", listId);
  },
};
module.exports = tasksService;
