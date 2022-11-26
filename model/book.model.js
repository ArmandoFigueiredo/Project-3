import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: { type: String, required: true, trim: true },
  author: {
    type: String,
    required: true,
    trim: true,
    },
  releaseYear: { type: Number, required: true },
  coverImage: { type: String, default: 'https://www.shortandtweet.com/images/short-and-tweet-default-book-cover.jpg' },
  synopsis: { type: String },
  genre: { type: String },
});

export const BookModel = model("Book", bookSchema);