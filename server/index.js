const cors = require('cors');
const express = require('express');
require('express-async-errors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const productRoutes = require('./controllers/product.controller');
const userRoutes = require('./controllers/user.controller');
const orderRoutes = require('./controllers/order.controller');
const session = require('express-session');
const { getStore } = require('./services/store.service');
const store = getStore();
const { getConnectionPool } =  require('./database');
const db = getConnectionPool();

// middleware
app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable this if you need to send cookies or other credentials with requests
}));

app.use(session({
    resave: false,
    secret: 'some secret',
    cookie: { secure: false, maxAge: 10000000 },
    httpOnly: true,
    saveUninitialized: false,
    store
}));

// converts incoming request body to JSON format, saves data in req.body so payload is available in it
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    let inStore = false;

    store.all((err, sessions) => {
        inStore = req.sessionID in sessions;
        if (req.path === '/api/users/login' || req.path === '/api/users/signup' || inStore) {
            next();
        }
        else {
            res.status(401).send('Not authorised');
        }
    });
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(express.json());

// global error handler, don't need to handle all the errors seperately
app.use((err, req, res, next) => {
    console.log('error caught in global error handler', err);
    res.status(500).send('Something broke');
});

// first make sure db connection is successful, the start express server
db.query("SELECT 1")
    .then(() => {
        console.log('Database connection successful')
        app.listen(3000,
            () => console.log('Server started at 3000')
        )
    })
    .catch(err => console.log('Database connection unsuccessful' + err));