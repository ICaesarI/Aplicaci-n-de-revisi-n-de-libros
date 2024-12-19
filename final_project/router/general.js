const express = require('express');
let books = require('./booksdb.js');
const public_users = express.Router();

// Tarea 3: Listar todos los libros
public_users.get('/books', (req, res) => {
    res.status(200).json(books);
});

// Tarea 4: Obtener detalles de un libro por ISBN
public_users.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

// Tarea 5: Obtener detalles de libros por autor
public_users.get('/books/author/:author', (req, res) => {
    const author = req.params.author;
    const filteredBooks = Object.values(books).filter(book => book.author === author);
    if (filteredBooks.length > 0) {
        res.status(200).json(filteredBooks);
    } else {
        res.status(404).send("No books found for this author");
    }
});

// Tarea 6: Obtener detalles de libros por título
public_users.get('/books/title/:title', (req, res) => {
    const title = req.params.title;
    const filteredBooks = Object.values(books).filter(book => book.title === title);
    if (filteredBooks.length > 0) {
        res.status(200).json(filteredBooks);
    } else {
        res.status(404).send("No books found for this title");
    }
});

// Tareas 10-13: Implementar con Promesas
public_users.get('/books', (req, res) => {
    new Promise((resolve) => resolve(books))
        .then(bookList => res.status(200).json(bookList))
        .catch(() => res.status(500).send("Error fetching books"));
});

public_users.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    new Promise((resolve, reject) => {
        const book = books[isbn];
        book ? resolve(book) : reject();
    })
        .then(book => res.status(200).json(book))
        .catch(() => res.status(404).send("Book not found"));
});

public_users.get('/books/author/:author', (req, res) => {
    const author = req.params.author;
    new Promise((resolve, reject) => {
        const filteredBooks = Object.values(books).filter(book => book.author === author);
        filteredBooks.length > 0 ? resolve(filteredBooks) : reject();
    })
        .then(filteredBooks => res.status(200).json(filteredBooks))
        .catch(() => res.status(404).send("No books found for this author"));
});

public_users.get('/books/title/:title', (req, res) => {
    const title = req.params.title;
    new Promise((resolve, reject) => {
        const filteredBooks = Object.values(books).filter(book => book.title === title);
        filteredBooks.length > 0 ? resolve(filteredBooks) : reject();
    })
        .then(filteredBooks => res.status(200).json(filteredBooks))
        .catch(() => res.status(404).send("No books found for this title"));
});

module.exports.general = public_users;
