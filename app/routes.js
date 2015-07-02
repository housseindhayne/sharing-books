var Todo = require('./models/todo');
var Book = require('./models/book');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

function getBooks(res){
	Book.find(function(err, books) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(books); // return all books in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all books
	app.get('/api/books', function(req, res) {

		// use mongoose to get all books in the database
		getBooks(res);
	});

	// create book and send back all books after creation
	app.post('/api/books', function(req, res) {

		// create a book, information comes from AJAX request from Angular
		Book.create({
			name : req.body.name,
			owner : req.body.owner,
			cover : req.body.cover,
			description: req.body.description
		}, function(err, book) {
			if (err)
				res.send(err);

			// get and return all the books after you create another
			getBooks(res);
		});

	});

	// update book and send back all books after creation
    	app.post('/api/books/:book_id', function(req, res) {
    	    Book.findById(req.params.book_id, function(err,book) {
              if (!book)
                return next(new Error('Could not load Book'));
              else {
                // do your updates here
                if(req.body.reservedBy =='')
                book.reservedBy = 'no one'
                else
                book.reservedBy = req.body.reservedBy

                book.save(function(err) {
                  if (err)
                    console.log('error')
                  else
                    console.log('success')
                });
              }});
            });


	// delete a book
	app.delete('/api/books/:book_id', function(req, res) {
		Book.remove({
			_id : req.params.todo_id
		}, function(err, book) {
			if (err)
				res.send(err);

			getBooks(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};