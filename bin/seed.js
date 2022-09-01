require('dotenv/config');
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const BookModel = require('../models/book.model');

const MONGO_URI = process.env.MONGODB_URI;


const books = [
  {
    title: 'El señor de los anillos',
    author: 'No me apetece escrbir eso :D',
    gener: ['Aventura'],
  },
  {
    title: 'El libro de Pepe',
    author: 'Pepe',
    gener: ['Drama'],
  },
];

mongoose
  .connect(MONGO_URI)
  .then((connectMongoose) => {
    console.log('Connect DB: ', connectMongoose.connections[0].name);
    return BookModel.deleteMany();
  })
  .then(() => {
    
    return BookModel.insertMany(books);
  })
  .then((insertBooks) => {
    // const titleBooks = [];
    // insertBooks.forEach(({ title }) => {
    //   titleBooks.push(title);
    // });
    const titleBooks = insertBooks.map(({title}) => title); // [title1, title2];
    console.log(`Books -> ${titleBooks}`);
    return BookModel.find({}).select('title -_id');
  })
  .then((titleBooks) => {
    console.log(titleBooks);

  })
  .catch((err) => {
    console.error('Error:', err);

  })
  .finally(() => {
    mongoose.disconnect();
  })
