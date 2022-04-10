const controller = require('./../controllers/moviesController');
const middleware = require('./../middlewares/roleCheckMiddleware');
module.exports = (app) => {
    app.route('/get-movies').get(controller.getMovies);
    app.route('/add-movie').post(middleware, controller.addMovie);
};