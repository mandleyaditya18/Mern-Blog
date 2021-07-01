const express = require('express');
const cors = require('cors');
const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const app = express();

require('./config/database');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};

passport.use(new JwtStrategy(opts, function(jwtPayload, cb) {
    // console.log('****************');
    // console.log(jwtPayload);
    return User.find({username: jwtPayload.username})
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
    }
));

app.post('/register', async (req, res) => {
    const { name, email, username, password } = req.body;
    const user = new User({name, email, username});
    const newUser = await User.register(user, password);
    res.send(newUser);
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user.toJSON(), 'secret', {expiresIn: '6h'});
            const expiresIn = 21600;
            return res.json({user, token, expiresIn});
        });
    }) (req, res);
});

app.get('/private', passport.authenticate('jwt', {session: false, failureRedirect: '/'}), (req, res) => {
    res.json({msg: 'You\'ve reached to the private route'});
})

app.get('/', (req, res) => {
    res.json({msg: 'This is the default route of express server'});
})

app.get('/home', (req, res) => {
    res.json({msg: 'This is the home route of express server'});
})

app.post('/register', (req, res) => {
    res.json({msg: 'Register successful'});
})

app.listen(5000, () => {
    console.log('Listening on port 5000');
})