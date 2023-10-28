import { fileURLToPath } from "url";
import * as path from "path";
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import {engine} from 'express-handlebars'
import connectDB from './config/db.js'
import { indexRouter } from './routes/index.js'
import { authRouter } from './routes/auth.js'
import { storyRouter } from './routes/stories.js'
import passport from "passport";
import configurePassport from "./config/passport.js";
import session from "express-session";
import MongoStore from 'connect-mongo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Passport Configuration
configurePassport(passport)


connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

import { formatDate } from "./helpers/hbs.js";

app.engine('.hbs', engine({helpers: {
    formatDate
}, defaultLayout:'main', extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI})
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/stories', storyRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))