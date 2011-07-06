/**
 * ARLearn Platform
 * Copyright (c) 2009-2011 by Open Universiteit. All Rights Reserved.
 * Licensed under the terms of ... (todo)
 * Please see the LICENSE included with this distribution for details.
 **/

//All app functionality is namespaced here
var ar = {};
(function() {
	//define application state variables in this namespace
	ar.app = {}

	ar.app.createTaskChain = function(task0, args0) {

		var currentTask = function(args) {
			Ti.API.info('last task was executed');
		};
		var currentArgs = {};
		
		if (task0) currentTask = task0;
		if (args0) currentArgs = args0;

		// This routine assumes that tasks will call args.success on asynchronous completion
		var addTask = function(task, args) {
			var copyCurrentTask = currentTask;
			var copyCurrentArgs = currentArgs;
			if (!args.success) {
				args.success = function() {
					copyCurrentTask(copyCurrentArgs)
				}
			} else {
				var oldSuccess = args.success;
				args.success = function(newArgs) {
					oldSuccess(newArgs);
					copyCurrentTask(copyCurrentArgs)
				}
			}
			currentTask = task;
			currentArgs = args;
		}
		var start = function() {
			currentTask(currentArgs);
		}
		return {
			addTask: addTask,
			start : start
		}
	}
})();
Ti.include(
'/arlearn/enhanceJavascriptClasses.js',
'/arlearn/db/db.js',
'/arlearn/google/google.js',
'/arlearn/model/model.js',
'/arlearn/ui/ui.js'
);