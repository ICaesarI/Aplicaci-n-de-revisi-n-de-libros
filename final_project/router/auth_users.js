const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
const regd_users = express.Router();

// Validar usuario autenticado (puedes personalizar esta función según tu lógica)
function authenticatedUser(username, password) {
    return username === "user" && password === "password";
}

// Tarea 7: Inicio de sesión
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }
    if (!authenticatedUser(username, password)) {
        return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
});

// Tarea 8: Agregar o modificar una reseña
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const { review } = req.body;

    if (!books[isbn]) {
        return res.status(404).send("Book not found");
    }

    const username = req.user.username;
    books[isbn].reviews[username] = review;
    res.status(200).send("Review added or updated successfully");
});

// Tarea 9: Eliminar una reseña
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user.username;

    if (books[isbn]?.reviews[username]) {
        delete books[isbn].reviews[username];
        res.status(200).send("Review deleted successfully");
    } else {
        res.status(404).send("Review not found for this user");
    }
});

module.exports.authenticated = regd_users;
