'use strict'
const connection= require('../connect');


exports.getNotes = function(req, res){

	const title 		= req.query.search || '';
	const sort 			= req.query.sort || 'DESC';
	const page 			= parseInt(req.query.page || 1);
	const limit 		= parseInt(req.query.limit || 10);
	const offset 		= ((page - 1)*limit ) || 0;

	const query 		=  `SELECT note.idNote, note.title, note.note, note.time,note.category AS idCategory, category.category  FROM note 
	LEFT JOIN category ON note.category=category.id
	WHERE note.title LIKE '%${title}%'
	ORDER BY note.time ${sort} 
	LIMIT ${limit} OFFSET ${offset}`;
	
	connection.query(
		`SELECT count(*) as total from note where title  LIKE '%${title}%' `, 
		function(error, rows){
			if(error){
				console.log(error);
			}else{
				const total 		= rows[0].total;
				const totalPage 	= Math.ceil(total/limit);
				
				connection.query(
					query,
					function(err, rows){
						if(err){
							console.log(err);
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
			async function(error, rows){
				if(error){
					console.log(error);
				}else{
					let getData = await getById(rows.insertId) //ambil id terakhir
					return res.status(200).send({
						data: getData,
						message: "Data has been saved"
					})
				}
			}
		)
	}
}


exports.updateNote = async(req, res)=>{

	const title 		= req.body.title;
	const note 			= req.body.note;
	const category		= req.body.category;
	const id 			= req.params.id;

	connection.query(
		`select * from note where idNote=?`,
		[id],
		async function(error, rows){
			if(error){
				console.log(error);
			}else{
				if(rows != ""){
					if(!title){
						res.status(400).send ({ message : 'Title is require' });
					}else if( !note ){
						res.status(400).send ({ message : 'Note is require' });
					}else if( !category ){
						res.status(400).send ({ message : 'Category is require' });
					}else{
						let updateData = await update(title, note, category, id)
						let getData = await getById(updateData)

						res.status(200).send({
							data:getData,
							message: 'Data has been updated'
						})
					}
				}else{
					res.status(400).send ({ message : 'Id not valid.' })
				}
			}
		}
	)
}


exports.deleteNote = function(req, res){

	const id = req.params.id;

	connection.query(
		`Delete from note where idNote=?`,
		[id],
		function(error, rows){
			if(error){
				console.log(error);
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


exports.noteById = async function(req, res) {
	
	const id = req.query.idNote;

	let getData = await getById(id)
	console.log(getData)
}



exports.searchByTitle = function(req, res){
	
	const title = req.query.search;
	
	connection.query(
		`Select note.title, note.note, note.time, category.category  From note left join category on note.category=category.id WHERE note.title LIKE ?`,
		[title],
		function(error, rows){
			if(error){
				console.log(error);
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
		function(error, rows) {
			if(error) {
				console.log(error);
			} else {

				const total 		= rows[0].total;
				const totalPage		= Math.ceil(total/100);
				connection.query(
					`SELECT note.idNote, note.title, note.note, note.time, note.category as idCategory, category.category  FROM note LEFT JOIN category ON note.category=category.id WHERE note.category='${idCategory}' LIMIT 100`,
					function(error, rows){
							if (rows != "") {
								return res.send ({
									data 		: rows,
									totalPage	: totalPage
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


function getById(id){
	return new Promise(resolve=>{
		connection.query(
			`Select note.idNote, note.title, note.note, note.time, note.category as idCategory, category.category  From note 
			left join category on note.category=category.id 
			where note.idNote=?`,
			[id],
			function(err, rows){
				if(err){
					res.send(console.log(err))
				}else{
					resolve(rows)
				}
			}
		)
	})
}


function update(title, note, category, id){
	console.log(id)
	return new Promise(resolve=>{
		connection.query(
			`Update note set title=?, note=?, category=? where idNote=?`, //query update
			[title, note, category, id],
			function(error){
				if(error){
					console.log(error)
				}else{
					resolve(id)
				}
			}
		)
	})
}

