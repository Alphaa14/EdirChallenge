
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');

router.post('/register', function (req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        projects: req.user.projects,
    });
});
router.post('/addTest', passport.authenticate('jwt', { session: false }),(req,res) => {
    const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });
    const newTask = {description:'cenas Teste VAR', finished: true, finishedDate: Date.now() }; 
    const newProject = {name: 'Project1', taskList:[{description:'Tarefa 1', finished: true },{description:'Teste2', finished: false }, newTask]};
    // const newProject1 = {name: 'Project2', taskList:[{description:'Tarefa 2', finished: true },{description:'Teste3', finished: false }, newTask]};
    
    const newUser = new User({
        name: "Hellooooo",
        email: "Hello@Hello.pt",
        password: "Hello",
        avatar,
        projects:[newProject]
    });
    // newUser.projects.push(newProject)
    newUser.save()
    .then(user => {
        res.json(user)
    });
})
//Create Project
router.post('/',passport.authenticate('jwt', { session: false }), (req,res) => {
    User.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
    
    const newProject = new Project(req.body.project);
    newProject.user=user;

    newProject.save()
    .then(user => {
        res.json(user)
    });
})
})
//Create Task
router.post(':projectId/task',passport.authenticate('jwt', { session: false }), (req,res) => {
    User.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }

    const newTask = new Task(req.body.task);
    newTask.user=user;
    newTask.project=req.project;

    newTask.save()
    .then(user => {
        res.json(user)
    });
})
})
// delete project
router.delete(':projectId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if (!user) { return res.sendStatus(401); }
  
      if(req.project.user._id.toString() === req.payload.id.toString()){
        return req.project.remove().then(function(){
          return res.sendStatus(204);
        });
      } else {
        return res.sendStatus(403);
      }
    }).catch(next);
  });

  // delete task
router.delete(':projectId/task/:taskId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if (!user) { return res.sendStatus(401); }
  
      if(req.task.user._id.toString() === req.payload.id.toString()){
        return req.task.remove().then(function(){
          return res.sendStatus(204);
        });
      } else {
        return res.sendStatus(403);
      }
    }).catch(next);
  });

  // update Project
router.put('/:projectId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(req.project.user._id.toString() === req.payload.id.toString()){
        if(typeof req.body.project.name !== 'undefined'){
          req.project.name = req.body.project.name;
        }
  
        req.project.save().then(function(project){
          return res.json(user);
        }).catch(next);
      } else {
        return res.sendStatus(403);
      }
    });
  });
    // update Project
router.put('/:projectId/task/:taskId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
      if(req.task.user._id.toString() === req.payload.id.toString()){
        if(typeof req.body.task.description !== 'undefined'){
          req.task.description = req.body.task.description;
        }
        if(typeof req.body.task.finished !== 'undefined'){
            req.task.finished = req.body.task.finished;
        }
        if(typeof req.body.task.finishedDate !== 'undefined'){
            req.task.finishedDate = req.body.task.finishedDate;
        }
        req.task.save().then(function(project){
          return res.json(user);
        }).catch(next);
      } else {
        return res.sendStatus(403);
      }
    });
  });
  
module.exports = router;