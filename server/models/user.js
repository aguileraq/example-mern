const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
	name:{
		type: String,
		required: [true, 'El nombre es obligatorio']
	},
	email:{
		type: String,
		unique: true,
    	lowercase: true,
		validate: {
			validator: function(v) {
			  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
			},
			message: '{VALUE} no es un email válido'
		},
		required: [true, 'El email es obligatorio']
	},
	password:{
		type: String,
		required: [true, 'La contraseña es obligatoria']
	},
	picture:{
		type: String,
		required: false
	},
	role:{
		type: String,
		default: 'USER_ROLE'
	},
	status:{
		type: Boolean,
		default: true,
		required: true
	},
	google:{
		type: Boolean,
		default: false
	}
},
	{
  		timestamps: true
	}
);

userSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('User', userSchema);