app.factory('books', ['$http', function($http) {
  return {
  			get : function() {
  				return $http.get('/api/books');
  			},
  			create : function(bookData) {
  				return $http.post('/api/books', bookData);
  			},
  			delete : function(id) {
  				return $http.delete('/api/books/' + id);
  			},
  			update : function(id,bookData) {
              		return $http.post('/api/books/' + id, bookData);
              	},
  		}
}]);