const express = require('express');
const _ = require('underscore');

const Category = require('../models/category');
const { checkToken } = require('../middlewares/authentication');

const app = express();

app.get('/category', checkToken, (req, res) => {
    Category.find({empleado:req.user._id})
	.skip()
	.limit()
	.exec( (err, categories) => {
		if(err){
			return res.status(400).json({
				ok:false,
				err
			});
		}
		Category.countDocuments({'status':true}, (err, counting) =>{
			res.json({
				ok:true,
				total: counting,
				categories,
				user: req.user	
			}) 
		})
	})
});

app.get('/category/:id', checkToken, (req, res) => {
    let id = req.params.id;
    Category.findById(id, (err, categoryDB) => {
		if(err){
			return res.status(400).json({
				ok:false,
				err
			});
		}
		Category.countDocuments({'status':true}, (err, counting) =>{
			res.json({
				ok:true,
				total: counting,
				categoryDB	
			}) 
		})
	})
});

app.post('/category', checkToken, (req, res) => {
    let body = req.body;
    let category = new Category({
        name: body.name,
        description: body.description,
        user: req.user._id
    });

    category.save( (err,categoryDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!categoryDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        return res.json({
            ok:true,
            category: categoryDB
        })
    })
});

app.put('/category/:id', checkToken, (req, res) => {
    let id = req.params.id;
    /*let body = {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status
    };*/

    //let body = _.pick(req.body, ['name','description','status']);
    
    //desctructurar
    let {name,description,status }  = req.body;
    let body = {name,description,status};

    Category.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, categoryDB) => {
		if(err){
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.status(201).json({
			ok:true,
            message: "Categoria actualizada satisfactoriamente",
            body,
			updatedCategory: {
				name: categoryDB.name,
                description: categoryDB.description,
                status: categoryDB.status,
				request: {
					type: 'GET',
					url: "http://localhost:3000/category/" + categoryDB._id
				}
			}
		});
	})


});

app.delete('/category/:id', checkToken, (req, res) => {

});


module.exports = app;