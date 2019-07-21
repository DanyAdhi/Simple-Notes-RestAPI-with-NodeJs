'use strict'

const response 	= require('../response');
const connection= require('../connect');


exports.getNotes = function(req, res){

	const title 		= req.query.search || '';
	const sort 			= req.query.sort || 'DESC';
	const page 			= parseInt(req.query.page || 1);
	const limit 		= parseInt(req.query.limit || 10);
	const offset 		= ((page - 1)*limit ) || 0;
	const idCategory	= req.query.category || ''

	const query 		=  `SELECT note.idNote, note.title, note.note, note.time, note.category as idCategory, category.category  FROM note LEFT JOIN category ON note.category=category.id WHERE note.title LIKE '%${title}%'  ORDER BY note.time ${sort} LIMIT ${limit} OFFSET ${offset}`;
	
	connection.query(
		`SELECT count(*) as total from note where title  LIKE '%${title}%' `,function(error, rows){
			if(error){
				throw error;
			}else{

				const total 		= rows[0].total;
				const totalPage 	= Math.ceil(total/limit);
				
				connection.query(
					query,
					function(error, rows, field){
						if(error){
							throw error;
						}else{
							if(rows!=''){
								return res.send({
									data  		: rows,
									total 		: total,
									page  		: page,
									totalPage 	: totalPage,
									limit 		: limit,
								})
							}else{
								return res.send({
									message:'Data not found',
								})
							}
						}
					}
				)
			}

		}
	)
}



exports.createNote = function(req, res){

	const title 	= req.body.title;
	const note 		= req.body.note;
	const category	= req.body.category;

	if(!title){
		res.status(400).send('Title is require');
	}else if(!note){
		res.status(400).send('Note is require');
	}else if(!category){
		res.status(400).send('Category is require');
	}else{
		connection.query(
			`Insert into note set title=?, note=?, category=?`,
			[title, note, category],
			function(error, rows, field){
				if(error){
					throw error;
				}else{
					connection.query(
						`SELECT note.idNote, note.title, note.note, note.time, note.category as idCategory, category.category  FROM note LEFT JOIN category ON note.category=category.id ORDER BY note.time DESC LIMIT 1`, function(error, rows, field){
							if(error){
								console.log(error);
							}else{
								return res.send({
									data 	: rows,
									message : "Data has been saved"
								})
							}
						}
					)
				}
			}
		)
	}
}



exports.updateNote = function(req, res, next){

	const title 		= req.body.title;
	const note 			= req.body.note;
	const category		= req.body.category;
	const id 			= req.params.id;

	connection.query(
		`select * from note where idNote=?`,[id],
		function(error, rows, field){
			if(error){
				throw error;
			}else{
				if(rows != ""){
					if(!title){
						res.status(400).send ({ message : 'Title is require' });
					}else if( !note ){
						res.status(400).send ({ message : 'Note is require' });
					}else if( !category ){
						res.status(400).send ({ message : 'Category is require' });
					}else{
						connection.query(
							`Update note set title=?, note=?, category=? where idNote=?`,
							[title, note, category, id],
							function(error, rows, field){
								if(error){
									throw error;
								}else{
									connection.query(
										`SELECT note.idNote, note.title, note.note, note.time, note.category as idCategory, category.category  FROM note LEFT JOIN category ON note.category=category.id ORDER BY note.time DESC LIMIT 1`,
										function(error, rows, field){
											if(error){
												console.log(error);
											}else{
												return res.send({
													data 	: rows,
													message : 'Data has been updated'
												})

											}
										}
									)
								}
							}
						)
					}
				}else{
					res.status(400).send ({ message : 'Id not valid.' })
				}
			}
		}
	)
}



exports.deleteNote = function(req, res, next){

	const id = req.params.id;

	connection.query(
		`Delete from note where idNote=?`,
		[id],
		function(error, rows, field){
			if(error){
				throw error;
			}else{
				if(rows.affectedRows != ""){
					return res.send({
						message :'Data has been delete',
						data 	: id
					})
				}else{
					return res.status(400).send ({ 
						message : "Id not valid.",
					})
				}
			}
		}
	)
}



exports.noteById = function(req, res) {
	
	const id = req.params.id;

	connection.query(
		`Select note.title, note.note, note.time, category.category  From note left join category on note.category=category.id where note.idNote=?`,
		[id],
		function(error, rows, field) {
			if(error) {
				throw error;
			} else {
				if (rows != "") {
					return res.send ({
						data : rows,
					})	
				} else {
					return res.send ({
						message : "Data not found. cuk"
					})
				}
			}
		}
	)
}



exports.searchByTitle = function(req, res, next){
	
	const title = req.query.search;
	
	connection.query(
		`Select note.title, note.note, note.time, category.category  From note left join category on note.category=category.id WHERE note.title LIKE ?`,
		[title],
		function(error, rows, field){
			if(error){
				throw error;
			}else{
				if(rows != ""){
					return res.send({
						data : rows,
					})	
				}else{
					return res.send({
						message : "Data not found."
					})
				}
			}
		}
	)
}

exports.noteByCategory = function(req, res) {

	const idCategory	= req.params.idCategory || '';

	connection.query(
		`SELECT count(*) as total from note where category='${idCategory}'`,
		function(error, rows, field) {
			if(error) {
				throw error;
			} else {

				const total 		= rows[0].total;
				const totalPage		= Math.ceil(total/100);
				connection.query(
					`SELECT note.idNote, note.title, note.note, note.time, note.category as idCategory, category.category  FROM note LEFT JOIN category ON note.category=category.id WHERE note.category='${idCategory}' LIMIT 100`,
					function(error, rowss, field){
							if (rows != "") {
								return res.send ({
									data 		: rowss,
									totalPage	: 1
								})	
							} else {
								return res.send ({
									message : "Data not found"
								})
							}
						}
					)
			}
		}
	)
}
