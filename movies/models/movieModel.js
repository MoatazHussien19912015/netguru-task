const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    
    title: {type: String, required: true},
    released: {type: Date, required: true},
    genre: {type: String, required: true},
    director: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});


MovieSchema.set('timestamps', true);

const model =  mongoose.model('Movie', MovieSchema);


module.exports = model;