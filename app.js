// Jaruri packages ko import karna
const express = require('express');        // Server banane ke liye
const bodyParser = require('body-parser'); // Form data ko parse karne ke liye
const methodOverride = require('method-override'); // PUT/DELETE requests ke liye
const mongoose = require('mongoose');      // Database ke liye
const path = require('path');             // File paths ke liye
const Book = require('./models/book');    // Book model ko import karna

// Optional: Use dotenv for environment variables
try {
  require('dotenv').config();
} catch (err) {
  console.log('No .env file found');
}

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mylibrary';

// MongoDB database se connection banana
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Connection timeout 5 seconds
})
.then(() => console.log('MongoDB se connection ban gaya!'))
.catch(err => {
  console.error('MongoDB se connection nahi ban paya:', err);
  process.exit(1); // Agar connection fail ho jaye to server band kar do
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Form data ko parse karne ke liye
app.use(methodOverride('_method'));                 // PUT/DELETE requests enable karne ke liye
app.use(express.static(path.join(__dirname, 'public'))); // Static files (CSS, images) serve karne ke liye

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes (URLs ko handle karna)
// Home page - seedha books list par redirect kar do
app.get('/', (req, res) => {
  res.redirect('/books'); // Root URL ko /books par redirect karna
});

// INDEX - Saari books ko display karna
app.get('/books', async (req, res) => {
  try {
    // Saari books ko date ke hisaab se latest first dikhana
    const books = await Book.find().sort({ createdAt: -1 });
    res.render('books/index', { books }); // books/index template mein data bhej do
  } catch (err) {
    console.error('Books fetch karne mein error:', err);
    res.status(500).send('Server mein kuch problem hai, thodi der baad try karein');
  }
});

// NEW - Show form to create new book
app.get('/books/new', (req, res) => {
  res.render('books/new');
});

// CREATE - Nayi book ko database mein add karna
app.post('/books', async (req, res) => {
  try {
    // Form se data lekar new book object banana
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      yearPublished: parseInt(req.body.yearPublished), // String se number mein convert karna
      imageUrl: req.body.imageUrl || undefined // Agar image URL nahi hai to undefined
    });
    
    await newBook.save(); // Database mein save karna
    res.redirect('/books'); // Save hone ke baad books list par vapas jana
  } catch (err) {
    console.error('Book create karne mein error:', err);
    res.status(400).send('Book add nahi ho payi, please dubara try karein');
  }
});

// SHOW - Show info about one specific book
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.render('books/show', { book });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// EDIT - Show edit form for one book
app.get('/books/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.render('books/edit', { book });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// UPDATE - Existing book ki details update karna
app.put('/books/:id', async (req, res) => {
  try {
    // Book ko dhundho aur update karo
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id, 
      {
        title: req.body.title,
        author: req.body.author,
        yearPublished: parseInt(req.body.yearPublished),
        imageUrl: req.body.imageUrl
      }, 
      { new: true } // Updated document return karna
    );
    
    if (!updatedBook) {
      return res.status(404).send('Book nahi mili');
    }
    
    res.redirect('/books'); // Update ke baad books list par vapas jana
  } catch (err) {
    console.error('Book update karne mein error:', err);
    res.status(500).send('Update nahi ho paya, please dubara try karein');
  }
});

// DELETE - Book ko database se delete karna
app.delete('/books/:id', async (req, res) => {
  try {
    // Book ko dhundho aur delete karo
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    
    if (!deletedBook) {
      return res.status(404).send('Book nahi mili');
    }
    
    res.redirect('/books'); // Delete ke baad books list par vapas jana
  } catch (err) {
    console.error('Book delete karne mein error:', err);
    res.status(500).send('Delete nahi ho paya, please dubara try karein');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});