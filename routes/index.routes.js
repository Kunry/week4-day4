/**
 * Se escribirán todas las diferentes rutas.
 */

const router = require('express').Router();
const BookModel = require('../models/book.model');
const UserModel = require('../models/user.model');
/**
 * Es lo mismo
 */

// const express = require('express');

// const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/books', (req, res, next) => {
  console.log('USER -> ', req.user);
  console.log(req.query);
  const query = {};
  if (req.query.author) { // Daniel
    query.author = req.query.author;
  }
  // {} si req.query.author === undefined;
  // { author: 'Daniel' }
  BookModel.find(query)
    .select('title _id')
    .then((books) => {
      // const obj = { books: books };
      // res.render('books', obj);
      // res.render('books', { books: books })
      res.render('books', { books });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/:id', (req, res, next) => {
  console.log(req.params.id);
  BookModel.findById(req.params.id)
    .then((book) => {
      console.log(book);
      res.render('book', book);
    })
    .catch((err) => {
      console.error(err)
      res.render('error');
    });
});


router.post('/login', (req, res) => {
  const newUser = new UserModel({
    username: req.body.email,
    password: req.body.password
  });

  newUser.save()
  .then(() => {
    res.redirect('/api/books');
  }).catch((err) => {
    console.log(err);
  });
});


module.exports = router;
