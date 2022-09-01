/**
 * Se configurará todos los modelos de la BD
 */

const { Schema, model } = require('mongoose');

const booksSchema = new Schema({
  title: { type:String, unique: true, required: true },
  author: { type: String },
  gener: [{ type: String }],
  today: { type: Date, default: new Date()}
}, {
  timestamps: true,
  versionKey: false
});

const BookModel = model('books', booksSchema);

module.exports = BookModel;
