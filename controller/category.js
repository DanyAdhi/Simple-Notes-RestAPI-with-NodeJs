'use strict'

const response 	= require('../response');
const connection= require('../connect');


exports.getCategories = function(req, res){
	connection.query(
		`Select *  From category`,
		function(error, rows){
			if(error){
				console.log(error);
			}else{
				return res.send({
					error:false,
					data:rows,
				})
			}
		}
	)
}



exports.createCategory 	= function(req, res){

	const category		= req.body.category;
	const icon		= req.body.icon;

	if(!category){
		res.status(400).send('Category is require');
	}else{
		connection.query(
			`Insert into category set category=?, icon=?`,
			[category, icon],
			function(error, rows){
				if(error){
					console.log(error);
				}else{
					connection.query(
						`SELECT * FROM category ORDER BY id DESC limit 1`, function(error, rows){
							if(error){
								console.log(error);
							}else{
								return res.send({
									data: rows,
									message: "Data has been saved"
								})
							}
						}
						
					)
				}
			}
		)
	}
}



exports.updateCategory 	= function(req, res){

	const category	= req.body.category;
	const id 				= req.params.id;


	connection.query(
		`select * from category where id=?`,[id],
		function(error, rows){
			if(error){
				console.log(error);
			}else{
				if(rows != ""){
					if(!category){
						res.status(400).send({message:'Category is require'});
					}else{
						connection.query(
							`Update category set category=? where id=? `,
							[category, id],
							function(error, rowss){
								if(error){
									console.log(error);
								}else{
									return res.send({
										message: 'Data has been change'
									})
								}
							}
						)
					}
				}else{
					res.status(400).send({message:'Id not valid.'})
				}
			}
		}
	)
}



exports.deleteCategory = function(req, res){

	const id = req.params.id;

	connection.query(
		`Delete from category where id=?`,
		[id],
		function(error, rows){
			if(error){
				console.log(error);
			}else{
				connection.query(
					`UPDATE note set category=0 where category='${id}'`,
					function(error, rowss){
						if(error){
							console.log(error);
						}else{
							if(rows.affectedRows != ""){
								return res.send({
									data 	: id,
									message : 'Data has been delete'
								})
							}else{
								return res.status(400).send({message:"Id not valid."})
							}
						}
					}
				)
			}
		}
	)
}




exports.categoryById = function(req, res){

	const id = req.params.id;

	connection.query(
		`Select *  From category where id=?`,
		[id],
		function(error, rows){
			if(error){
				console.log(error);
			}else{
				if(rows != ""){
					return res.send({
						data:rows,
					})	
				}else{
					return res.send({
						message:"Data not found."
					})
				}
			}
		}
	)
}