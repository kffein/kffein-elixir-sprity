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

    new Elixir.Task('sprity', function () {

			return sprity.src({
				src: config.images.src + '/**/*.{png,jpg,jpeg}',
				name: 'sprites',
				style: 'Sprites.styl',
				cssPath: '../img/',
				processor: 'kffein-sprity-stylus',
				engine: 'gm',
				format: 'png',
				'gm-use-imagemagick': true,
				'dimension': [{
					ratio: 1, dpi: 72
				}, {
					ratio: 2, dpi: 192
				}]
			})
			.pipe(gulpif('*.png', 
						gulp.dest(config.images.output), 
						gulp.dest(config.assetsPath + '/stylus/mixins')
			))
			.pipe(new Elixir.Notification('Sprity Complete!'))

    })
    .watch(config.images.src + '/**/*.{png,jpg,jpeg}')
});
