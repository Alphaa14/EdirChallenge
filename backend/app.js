const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/User');

const users = require('./routes/user'); 
// const projectsRouter = require('./routes/projects');

const uri = "mongodb+srv://Jorge:gGMqaGMs52Vb9Yn@cluster0.sokgh.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
// app.use('/api/projects', propjectsRouter);

app.get('/AllUsers', function(req, res) {
    User.find(function(err, users){
        if(err){
            return res.error(err);
        }
        console.log(users);
        res.json(users);
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});