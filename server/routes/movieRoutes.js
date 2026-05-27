const router = require("express").Router();
const { addMovie, updateMovie, deleteMovie, getAllMovies } = require("../controllers/movieControllers");
const MovieModel = require("../models/movieModel");



router.post("/add", addMovie)
router.get("/get-all", getAllMovies);
router.put("/update", updateMovie);
router.put("/delete", deleteMovie);
module.exports = router;