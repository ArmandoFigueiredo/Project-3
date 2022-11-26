import express from "express";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { BookModel } from "../model/book.model.js";

const bookRouter = express.Router();

bookRouter.post("/book", isAdmin, async (req, res) => {
  try {
    const { title, author, synopsis, releaseYear, genre, coverImage } = req.body;

    if (
      !title || !author || !releaseYear
      
    ) {
      return res.status(400).json({
        msg: "Preencha corretamente os campos obrigatórios.",
      });
    }
   

    const createdBook = await BookModel.create({
      ...req.body,
    });

    return res.status(201).json(createdBook);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

bookRouter.get("/book", isAuth, async (req, res) => {
    try {
       
      const bookList = await BookModel.find();
  
      return res.status(200).json(bookList);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

  bookRouter.get("/book/:id", isAuth, async (req, res) => {
    try {
      const _id = req.params.id 
      const book = await BookModel.findById(_id);
    if (!book) {return res.status(404).json({
        msg:"Livro não encontrado."
    })}
      return res.status(200).json(book);
    } catch (err) {
      console.log(err);
      return res.status(404).json({msg:'Livro não encontrado!'});
    }
  });

  bookRouter.patch("/book/:id", isAdmin, async (req, res) => {
    try {
      const _id = req.params.id 
      const book = await BookModel.findById(_id);
    if (!book) {return res.status(404).json({
        msg:"Livro não encontrado."
    })}

    const updatedBook = await BookModel.updateOne({_id}, {...req.body})
      return res.status(204).json(updatedBook);
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  });

  bookRouter.delete("/book/:id", isAdmin, async (req, res) => {
    try {
      const _id = req.params.id 
      const book = await BookModel.findById(_id);
    if (!book) {return res.status(404).json({
        msg:"Livro não encontrado."
    })}

    await BookModel.deleteOne({_id})
      return res.status(204).json({});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });


export { bookRouter };