var gulp     = require('gulp');
var _        = require('underscore');
var Elixir   = require('laravel-elixir');
var sprity	 = require('sprity');
var gulpif   = require('gulp-if');

Elixir.extend('sprity', function(options) {

		options = _.extend({
			src: config.assetsPath + '/sprites/**/*.{png,jpg,jpeg}',
			name: 'sprites',
			style: 'Sprites.styl',
			cssPath: '../img/',
			processor: 'kffein-sprity-stylus',
			engine: 'gm',
			format: 'png',
			'gm-use-imagemagick': true,
			dimension: [{ ratio: 1, dpi: 72
				}, {
					ratio: 2, dpi: 192
				}],
			outputMixin: config.assetsPath + '/stylus/mixins',
			outputSprites: config.publicPath + '/img'
		}, options);

    new Elixir.Task('sprity', function () {

			return sprity.src(options)
			.pipe(gulpif('*.png', 
				gulp.dest(options.outputSprites), 
				gulp.dest(options.outputMixin)
			))
			.pipe(new Elixir.Notification('Sprity Complete!'))

    })
    .watch(options.src)
});


