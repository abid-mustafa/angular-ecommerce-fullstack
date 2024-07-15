const cors = require('cors');
const express = require('express');
require('express-async-errors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const productRoutes = require('./controllers/product.controller');
const userRoutes = require('./controllers/user.controller');
const categoryRoutes = require('./controllers/category.controller');
const orderRoutes = require('./controllers/order.controller');
const chatRoutes = require('./controllers/chat.controller');
const session = require('express-session');
const { getStore } = require('./services/store.service');
const store = getStore();
const { getConnectionPool } = require('./database');
const db = getConnectionPool();
const { createServer } = require('node:http');
const { Server } = require('socket.io');

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    resave: false,
    secret: 'some secret',
    cookie: { secure: false, maxAge: 10000000 },
    httpOnly: true,
    saveUninitialized: false,
    store
}));

// CORS configuration
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:8000', 'http://localhost:3010'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// app.use((req, res, next) => {
//     let inStore = false;

//     store.all((err, sessions) => {
//         inStore = req.sessionID in sessions;
//         if (req.path === '/api/users/login' || inStore) {
//             next();
//         } else {
//             res.status(401).send('Not authorised');
//         }
//     });
// });

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chats', chatRoutes);

// Create an HTTP server instance
const server = createServer(app);

// Initialize Socket.IO with the HTTP server
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoomAdmin', (chats) => {
        for (let index = 0; index < chats.length; index++) {
            const element = chats[index];
            socket.join(element.room);
            console.log('admin joined ', element.room);
        }
    });

    socket.on('joinRoomUser', (chat) => {
        socket.join(chat);
        console.log('user joined ', chat);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('send', (message) => {
        console.log(socket.rooms);
        console.log(message);
        socket.to(message.room).emit('receive', message);
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.log('Error caught in global error handler:', err);
    res.status(500).send('Something broke');
});

// Ensure DB connection is successful, then start the server
db.query("SELECT 1")
    .then(() => {
        console.log('Database connection successful');
        server.listen(3010, () => console.log('Server started at 3010'));
    })
    .catch(err => console.log('Database connection unsuccessful', err));
