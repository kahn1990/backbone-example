(function() {
	var fs = require('fs')
	,parser = require('uglify-js').parser
	,uglifyer = require('uglify-js').uglify;

	exports.bundle = function () {

		var scripts = [
			/*'lib/jquery/jquery.min',
			'lib/json/json2',*/
			'lib/underscore/underscore-min',
			/*'lib/handlebars/handlebars.min',*/
			'lib/backbone/backbone-min',
			/*'lib/jquery/jquery.masonry.min',
			'lib/jquery/jquery.tagsinput.min',
			'lib/bootstrap/bootstrap-modal',
			'lib/jquery/jquery-ui.min',*/
			'js/views/home',
			'js/routers/router',
			'js/app'
		];

		var templates = ['header', 'footer', 'home', 'index', 'danger', 'safe'];

		var bundle = '';
		scripts.forEach(function(file) {
			bundle += "\n/**\n* " + file + ".js\n*/\n\n" + fs.readFileSync(__dirname + '/public/' + file + '.js') + "\n\n";
		});

		var ast = parser.parse(bundle);
		ast = uglifyer.ast_mangle(ast);
		ast = uglifyer.ast_squeeze(ast);
		bundle = uglifyer.gen_code(ast)

		fs.writeFileSync(__dirname + '/public/js/bundle.js', bundle, 'utf8');

		var bundle = "Templates = {};\n";
		templates.forEach(function(file) {
			var html = fs.readFileSync(__dirname + '/views/' + file + '.html', 'utf8');
			html = html.replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s+/gm, ' ').replace(/'/gm, "\\'");
			bundle += "Templates." + file + " = '" + html + "';\n";
		});

		fs.writeFileSync(__dirname + '/public/js/templates.js', bundle, 'utf8');

	}
}).call(this);
