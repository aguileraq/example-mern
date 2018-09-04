const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');
const { checkToken } = require('../middlewares/authentication');

const app = express();

app.get('/users', checkToken, (req, res) => {
	let from = req.query.from || 0;
	from = Number(from);

	let limit = req.query.limit || 5;
	limit = Number(limit);

  	User.find({})
	.skip(from)
	.limit(limit)
	.exec( (err, users) => {
		if(err){
			return res.status(400).json({
				ok:false,
				err
			});
		}
		User.countDocuments({'status':true}, (err, counting) =>{
			res.json({
				ok:true,
				total: counting,
				users	
			}) 
		})
	})
});

/*app.post("/user", (req, res, next) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),
		role: req.body.role
	});
	user
	  .save()
	  .then(result => {
		console.log(result);
		res.status(201).json({
		  message: "Usuario creado satisfactoriamente",
		  createdUser: {
			  name: result.name,
			  email: result.email,
			  request: {
				  type: 'GET',
				  url: "http://localhost:3000/users/" + result._id
			  }
		  }
		});
	  })
	.catch(err => {
		console.log(err);
		res.status(500).json({
		  error: err
		});
	});
});*/

app.post('/user', checkToken, (req, res) =>{
	let body = req.body;

	let user = new User({
		name: body.name,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),
		role: body.role
	});

	user.save( (err, userDB) => {
		if(err){
			return res.status(400).json({
				ok: false,
				err
			});
		}
		
		res.status(201).json({
			ok:true,
			message: "Usuario creado satisfactoriamente",
			createdUser: {
				name: userDB.name,
				email: userDB.email,
				status: userDB.status,
				request: {
					type: 'GET',
					url: "http://localhost:3000/users/" + userDB._id
				}
			}
		});
	})
});

app.put('/user/:id', checkToken, (req, res) => {
	let id = req.params.id;
	//let body = _.pick(req.body, ['name','status']);
	let {name,status }  = req.body;
    let body = {name,status};

	User.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, userDB) => {
		if(err){
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.status(201).json({
			ok:true,
			message: "Usuario actualizado satisfactoriamente",
			updatedUser: {
				name: userDB.name,
				email: userDB.email,
				status: userDB.status,
				request: {
					type: 'GET',
					url: "http://localhost:3000/users/" + userDB._id
				}
			}
		});
	})
});

app.delete('/user/:id', checkToken, (req, res) => {
	let id = req.params.id;
	let query = {status:false};

	User.findByIdAndUpdate(id, query, {new:true}, (err, userDB) => {
		if(err){
			return res.status(400).json({
				ok: false,
				err
			});
		}
		res.status(201).json({
			ok:true,
			message: "Usuario actualizado satisfactoriamente",
			updatedStatusUser: {
				name: userDB.name,
				email: userDB.email,
				status: userDB.status,
				request: {
					type: 'GET',
					url: "http://localhost:3000/users/" + userDB._id
				}
			}
		});
	})
});

module.exports = app;