var gulp     = require('gulp');
var _        = require('underscore');
var Elixir   = require('laravel-elixir');
var sprity	 = require('sprity');
var gulpif   = require('gulp-if');
var config   = Elixir.config;

Elixir.extend('sprity', function(options) {

    config.images = _.extend({
			src: config.assetsPath + '/sprites',
			output: config.assetsPath + '/img',
    }, config.images || {});

    var dimensions = [{
					ratio: 1, dpi: 72
				}, {
					ratio: 2, dpi: 192
				}]

    new Elixir.Task('sprity', function () {

			return sprity.src({
				src: config.images.src + '/**/*.{png,jpg,jpeg}',
				name: options.name || 'sprites',
				style: options.style || 'Sprites.styl',
				cssPath: options.cssPath || '../img/',
				processor: options.processor || 'kffein-sprity-stylus',
				engine: options.engine || 'gm',
				format: options.format || 'png',
				'gm-use-imagemagick': options['gm-use-imagemagick'] || true,
				dimension: options.dimensions || dimensions,
			})
			.pipe(gulpif('*.png', 
				gulp.dest(config.images.output), 
				gulp.dest(options.outputMixin || config.assetsPath + '/stylus/mixins')
			))
			.pipe(new Elixir.Notification('Sprity Complete!'))

    })
    .watch(config.images.src + '/**/*.{png,jpg,jpeg}')
});
