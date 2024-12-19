// Importaciones necesarias
const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');

// Importación de rutas
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

// Configuración del servidor
const app = express();
app.use(express.json());

// Tarea 1: Configurar la sesión para clientes
app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

// Middleware de autenticación para rutas específicas
app.use("/customer/auth/*", function auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied");
    jwt.verify(token, "secret", (err, user) => {
        if (err) return res.status(403).send("Invalid Token");
        req.user = user;
        next();
    });
});

// Uso de rutas
app.use("/customer", customer_routes);
app.use("/", genl_routes);

// Inicialización del servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
