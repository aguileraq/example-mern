const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
	name:{
		type: String,
		required: [true, 'La categoría es obligatoria']
    },
    description:{
        type: String,
        lowercase: true
    },
    slug:{
        type: String,
        lowercase: true,
        unique: true
    },
    status:{
		type: Boolean,
        default: true,
        required: true
	},
    user: { type: Schema.ObjectId, ref: "Users" },
},
	{
  		timestamps: true
	}
);

// middleware
categorySchema.pre('save', function(next) {
  this.slug = slugify(this.name);
  next();
});

categorySchema.plugin( uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('Category', categorySchema);

// function to slugify a name -- @chrisoncode
function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
}