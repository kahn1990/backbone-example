var more = Backbone.View.extend({

	events: {
	},

	initialize: function() {
		_.bindAll(this, 'render');
	},

	render: function() {
		/*app.router.view.home.remove();*/
		$('#header').after(Templates.more);
	},
});