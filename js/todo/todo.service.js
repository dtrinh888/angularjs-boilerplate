// Todo Service

toDo.service('toDoService', [function(){
	// Constructor function for toDoService (ES5 syntax, ES6 introduces 'Class')

	var Todo = function(){
		// Initialize tasks, this is the array of tasks
		this.tasks = [];

		// Initialize allSelected to be a flag if all of the tasks are selected
		this.allSelected = false;

		// Initialize numSelected to indicate the number of selected tasks
		this.numSelected = 0;
	};

	/**
	 * A method to generate a unique ID. This is borrowed from Stack Overflow:
	 * http://stackoverflow.com/a/105074
	 * 
	 * Using this instead of an incrementing number
	 */
	 Todo.prototype.generateId = function(){
	 	function s4(){
	 		return Math.floor((1 + Math.random()) * 0x10000)
	 			.toString(16)
	 			.substring(1);	
	 	}
	 	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	 		s4() + '-' + s4() + s4() + s4();
	 };

	 /**
	  * Method to add a new task to the list. If the text passed in to the method
	  * is an object, it's assumed that it's already a task (perhaps one removed
	  * from one list and added to the current list). If it's text, it creates a 
	  * new task and adds it to the list	
	  *
	  * @params string|object text Either text of a new task or an existing task
	  */
	  Todo.prototype.add = function(task){
	  	// check if the task is an object
	  	if(typeof task === 'object'){
	  		// If it's an object, assume it's a task and just push it into the array
	  		this.tasks.push(task);
	  	} else {
	  		// Create a new task object and push it into the array
	  		this.tasks.push({
	  			id: this.generateId(),
	  			text: task,
	  			selected: false
	  		});
	  	}
	  };

	  /**
	   * Method to remove a task from the list
	   *
	   * @params object task the task to remove 
	   */
	   Todo.prototype.remove = function(task){
		   	// Only removing one task, so just need to loop through from 
		   	// 0 to the length of the array
		   	for(var i = 0, l = this.tasks.length; i < l; i++){
		   		// Check if the current task ID in the loop matches the 
		   		// provided task ID
		   		if(this.tasks[i].id === task.id){
		   			//remove the task from the array
		   			this.tasks.splice(i, 1);

		   			// Return the removed task to stop the execution of this method
		   			return task;
		   		}
		   	}
		};

		/**
		 * Method to toggle all of the tasks in the list on or off
		 */
		Todo.prototype.masterToggle  = function(){
			// Inside the 'forEach' will be a separate context and 'this'
		   	// would refer to the current iteration in the loop, not the
		   	// Todo class. So we need to assign the current context to a 
		   	// new variable so it can be accessed inside the 'forEach'
		   	var that = this;

		   	// Reset the number of selected tasks
		   	that.numSelected = 0;

		   	// Loop through the tasks
		   	that.tasks.forEach(function(task){
		   		// Set the task to either be selected or not selected
		   		task.selected = that.allSelected;

		   		// Increment the number of selected tasks
		   		that.numSelected++;
		   	});
		};

		/**
		 * Method used to check what tasks are selected and set the overall 
		 * flag if all tasks are selected
		 */
		 Todo.prototype.toggleTask = function(){
		 	// See previous comment about the context of 'this'
		 	var that = this;

		 	// Reset the number of selected tasks
		 	that.numSelected = 0;

		 	// Loop through the tasks
		 	that.tasks.forEach(function(task){
		 		// Check if the task is selected
		 		if(task.selected){
		 			// If selected, increment counter
		 			that.numSelected++;
		 		}
		 	});

		 	if(!that.tasks.length){
		 		// If there are no tasks, then the master box should be unchecked
		 		that.allSelected = false;
		 	} else if(that.numSelected === that.tasks.length){
		 		// If the number of selected matches the length, then all the tasks are
		 		// selected. Set the 'allSelected' flag to true to "check" the master box
		 		that.allSelected = true;
		 	} else {
		 		// If we got here, then some or none of the tasks are selected. We'll want
		 		// the master box to be unchecked so set the 'allSelected' flag to false
		 		that.allSelected = false;
		 	}
		 };

		 /**
		  * Method to remove the selected tasks	
		  */
		  Todo.prototype.removeSelected = function(){
		  	// Loop through the tasks in reverse order. If you loop through from the 
		  	// start of the array to the end of the array and you remove items as you
		  	// go, then it will end up "skipping" tasks. JavaScript arrays are reindexed
		  	// whenever it's contents changes (added/removed). For example if you have 
		  	// an array that looks like this:
		  	// [
		  	//	0: 'one',
		  	//	1: 'two',
		  	//	2: 'three'
		  	// ]
		  	// If you remove 'two' which is at index '1', the new array will be:
		  	// [
		  	//	0: 'one',
		  	//	1: 'three'
		  	// ]
		  	// Notice how the index '2' no longer exists, so if you were looping from
		  	// 0, 1 to 2 - when the loop got to index 2 it doesn't exist and wouldn't
		  	// be processed.
		  	for(var i = this.tasks.length - 1; i >= 0; i--) {
		  		// Check if the task is selected
		  		if(this.tasks[i].selected){
		  			// If it is, remove it
		  			this.remove(this.tasks[i]);
		  		}
		  	}
		};

		// Return the function
		return Todo;
}]);