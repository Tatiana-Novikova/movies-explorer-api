const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateMovieCardId } = require('../middlewares/celebrate-validator');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:id', validateMovieCardId, deleteMovie);

module.exports = router;
