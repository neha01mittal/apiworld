'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    //.post(todoList.create_a_task);

    app.route('/register/:name/:phone')
    .post(todoList.register);


  app.route('/getWalletAmount/:name')
    .get(todoList.read_a_task)

  app.route('/transferMoney/:from/:to/:amount')
    .post(todoList.update_a_task)
};
