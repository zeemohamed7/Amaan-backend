const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('./lib/passportConfig')

const journalRoute = require('./routes/journal')
const moodRoute = require('./routes/mood')
const authRoute = require('./routes/auth')
const bookingRoute = require('./routes/bookappointment')
const specialistRoute = require('./routes/Specialist')
const supportGroupRoute = require('./routes/supportgroup')

const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.static('public'))

app.use(bodyParser.json())

app.use(express.urlencoded({
    extended: true
}))

app.use(session({
    secret: 'SUPERSECRET',
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 86400000}
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next()
})


app.use('/', journalRoute)
app.use('/', moodRoute)

app.use('/', authRoute)
app.use('/', bookingRoute)
app.use('/', specialistRoute)
app.use('/', supportGroupRoute)

app.listen(PORT, () => {
    console.log(`The Mental Health app is listening on ${PORT}`)
})

mongoose.connect('mongodb+srv://deadmelissajames:AZ3K6OEWsqD3hJ1g@sei4cluster.uwzeppu.mongodb.net/SF',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then(() => {
console.log('Mongoose Is Connected to MongoDB')
}).catch((err) => {
console.log('An error occurred', err)
})