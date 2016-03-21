

Tasks = new Mongo.Collection("tasks");

if (Meteor.isServer) {

  // This code only runs on the server

  // Only publish tasks that are public or belong to the current user

  Meteor.publish("tasks", function () {

    return Tasks.find({

      $or: [

      { private: {$ne: true} },

      { owner: this.userId }

      ]

    });

  });

}



if (Meteor.isClient) {

  // This code only runs on the client

  Meteor.subscribe("tasks");

  Template.body.helpers({

    hideCompleted: function () {
      var hideCompleted = Session.get("hideCompleted");

      // if hideCompleted == undifined then make it true for default hiding
      if ((hideCompleted != true) && (hideCompleted != false)) {
        hideCompleted = true;
        Session.set("hideCompleted",hideCompleted);
      }
      console.log(hideCompleted);
      return hideCompleted;
    },

    incompleteCount: function () {

      return Tasks.find({checked: {$ne: true}}).count();

    }

  });



  Template.body.events({

    "submit .new-task": function (event) {

      // Prevent default browser form submit

      event.preventDefault();



      // Get value from form element

      var text = event.target.text.value;

      // Insert a task into the collection

      Meteor.call("addTask", text);

      // Clear form

      event.target.text.value = "";

    },

    "change .hide-completed input": function (event) {

      Session.set("hideCompleted", event.target.checked);
      // console.log(event.target.type);

    }

  });

  Template.tasksShow.helpers({
    show: function() {
      return "tasksLayout";
    }
  });

  Template.getTasks.helpers({

    tasks: function () {

      if (Session.get("hideCompleted")) {
        // if hide-completed is checked then filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        //otherwise, return all tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
      }

    }
  });

  Template.task.helpers({

    isOwner: function () {

      return this.owner === Meteor.userId();

    }

  });

  Template.task.events({

    "click .toggle-checked": function () {

      // Set the checked property to the opposite of its current value

      Meteor.call("setChecked",this._id, ! this.checked);

    },

    "click .delete": function () {

      Meteor.call("deleteTask",this._id);

    },

    "click .toggle-private": function () {

      Meteor.call("setPrivate", this._id, ! this.private);

    }

  });

  Accounts.ui.config({

    passwordSignupFields: "USERNAME_ONLY"

  });

}

Meteor.methods({

  addTask: function (text) {

    // Make sure the user is logged in before inserting a task

    if (! Meteor.userId()) {

      throw new Meteor.Error("not-authorized");

    };

      // Insert a task into the collection if text not empty

      if (text != "") {
        Tasks.insert({

          text: text,

      createdAt: new Date(),            // current time

      owner: Meteor.userId(),           // _id of logged in user

      username: Meteor.user().username  // username of logged in user
    });

      };

    },

    deleteTask: function (taskId) {

      var task = Tasks.findOne(taskId);

      if (task.private && task.owner !== Meteor.userId()) {

      // If the task is private, make sure only the owner can delete it

      throw new Meteor.Error("not-authorized");

    }



    Tasks.remove(taskId);

  },

  setChecked: function (taskId, setChecked) {

    var task = Tasks.findOne(taskId);

    if (task.private && task.owner !== Meteor.userId()) {

      // If the task is private, make sure only the owner can check it off

      throw new Meteor.Error("not-authorized");

    }



    Tasks.update(taskId, { $set: { checked: setChecked} });

  },

  setPrivate: function (taskId, setToPrivate) {

    var task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private

    if (task.owner !== Meteor.userId()) {

      throw new Meteor.Error("not-authorized");

    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });

  }

});

FlowRouter.route('/lists', {
  name: 'Lists.show',
  action(params, queryParams) {
    alarm("Looking at a list?");
  }
});