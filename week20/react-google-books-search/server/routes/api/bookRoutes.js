const router = require("express").Router();
const bookListdb = require("../../controllers/bookListdb");

router
  .route("/")
  .get(bookListdb.findAll)
  .post(bookListdb.create);

router
  .route("/:id")
  .get(bookListdb.findById)
  .put(bookListdb.update)
  .delete(bookListdb.remove);

module.exports = router;
