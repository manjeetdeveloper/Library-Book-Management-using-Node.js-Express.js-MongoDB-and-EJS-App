// mongoose model hai 

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // title required hai
  },
  author: {
    type: String,
    required: true // author bhi required hai
  },
  yearPublished: {
    type: Number,
    required: true // year bhi chahiye
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/150?text=No+Image' // default image agar URL na mile
  },
  createdAt: {
    type: Date,
    default: Date.now // jab book add kare to date save ho jaye
  }
});

module.exports = mongoose.model('Book', bookSchema);
