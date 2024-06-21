const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// EJS setup
app.set('view engine', 'ejs');

// In-memory data storage for posts
let posts = [];

// Routes
// Home route
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// New post form route
app.get('/new', (req, res) => {
    res.render('post');
});

// Create new post route
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: posts.length, title, content });
    res.redirect('/');
});

// Edit post form route
app.get('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit', { post });
});

// Update post route
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = posts.find(p => p.id == id);
    post.title = title;
    post.content = content;
    res.redirect('/');
});

// Delete post route
app.delete('/posts/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
