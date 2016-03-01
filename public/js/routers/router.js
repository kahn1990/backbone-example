var router = Backbone.Router.extend({

	routes: {
		"/": "home"
		/*,"more": "more"*/
	},

	views: {},

	initialize: function() {/*alert('this is /js/routers/router.js');*/
		_.bindAll(this, 'home','setBody');

		//Create all the views, but don't render them on screen until needed
		this.views.home = new home({
			el: $('body')
		});
		/*this.views.more = new more();*/
		/*this.views.wuzei = new wuzei();*/
		//The "home view" is the layout, containing the header and footer, for the home
		//The body area is rendered by other views
		this.view = this.views.home;
		this.view.render();
		this.view.appContent();

	},

	home: function() {
        this.setBody(this.views.home, true);
		this.views.home.appContent();
        $('.content').css({'margin-top':'100px'})
	},
	// more: function() {

	// 	this.setBody(this.views.more, true);
	// this.views.more.render();
 //      		/*this.view.body.fetch();alert('this is /js/routers/router.js?more()');*/
	// },
	setBody: function(view, auth) {
		if (auth == true) {
			this.navigate("", true);
			return;
		}
		if (typeof this.view.body != 'undefined'){
			this.view.body.unrender();
		}
		this.view.body = view;
	}

});