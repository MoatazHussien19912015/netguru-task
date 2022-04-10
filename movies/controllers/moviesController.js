const Movie = require('./../models/movieModel');
const jwt = require('jsonwebtoken');
const joi = require("@hapi/joi");
exports.getMovies = async(req, res) => {
    try {const movies = await Movie.find({});
    if(movies.length) {
        return res.status(200).json({success: true, movies});
    }
    return res.status(404).json({success: true, message: 'there are no movies added yet'});
}
    catch(err){
        return res.status(500).json({success: false, message: err});
    }
};

exports.addMovie = async(req, res) => {
    // checking if user is basic or premium
    if (req.role == 'basic') {
        try { const montlyCount = await Movie.count({createdAt: { $gte: new Date(`${new Date().getFullYear}-${new Date().getMonth()+1}-1`)}});
        if (montlyCount > 4) {
            return res.status(400).json({success: false, message: 'please come back next month, your number of added movies exceeded'});
        }
    } 
        catch(err) {return res.status(500).json({success: false, message: err});}
    }
    
    // checking errors in the request body
    const schema = joi.object({title: joi.string().required(), released: joi.date().required(), 
                                genre: joi.string().required(), director: joi.string().required()});

    const {error, value} = schema.validate({title: req.body.title, released: req.body.released, genre: req.body.genre, director: req.body.director});
    if(error){
     return res.status(400).json({success: false, message: error.details[0].message});
      }


    const movie = new Movie(req.body);
    try {const savedMovie = await movie.save();
    
        return res.status(200).json({success: true, movie: savedMovie});
    
}
    catch(err){
        return res.status(500).json({success: false, message: err});
    }
};