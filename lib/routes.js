FlowRouter.route( '/', {
	action: function() {
		//BlazeLayout.render('tasksShow', { show: "getTasks"});
		console.log("hi root");
	},
	name: 'root'
});

/*FlowRouter.route( '/terms', {
  action: function() {
    BlazeLayout.render( 'tasksShow', { show: 'getTasks' } ); 
  },
  name: 'termsOfService' // Optional route name.
});

var tasksGroup = FlowRouter.group({
  prefix: '/tasks'
});

// http://app.com/tasksGroup
tasksGroup.route( '/', {
  action: function() {
    console.log( "We're viewing a list of tasks." );
  }
});

// http://app.com/tasksGroup/:_id
tasksGroup.route( '/:_id', {
  action: function(a,b) {
    console.log( "We're viewing a single task." );
    console.log(a);
    console.log(b);
  }
});

// http://app.com/tasksGroup/:_id/edit
tasksGroup.route( '/:_id/:_id', {
  action: function(params, queryparams) {
    console.log( "We're editing a single task." );
    console.log(params);
    console.log(queryparams);
  }
});*/