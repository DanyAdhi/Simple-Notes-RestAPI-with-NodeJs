'use strict'

module.exports = function(app){
	const note 		= require('./controller/note');
	const category 	= require('./controller/category');

 
	//=============NOTE================//
	// GET
	app.get('/notes', note.getNotes);
	app.get('/notes/:idCategory', note.noteByCategory);
	// POST
	app.post('/notes', note.createNote);
	// PATCH
	app.patch('/notes/:id', note.updateNote);
	// DELETE
	app.delete('/notes/:id', note.deleteNote);



	//=============CATEGORY================//
	// GET
	app.get('/category', category.getCategories);
	app.get('/category/:id', category.categoryById);
	// POST
	app.post('/category', category.createCategory);
	// PATCH
	app.patch('/category/:id', category.updateCategory);
	// DELETE
	app.delete('/category/:id', category.deleteCategory);

}