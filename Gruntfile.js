module.exports = function( grunt ) {
	'use strict';

	// Project configuration
	grunt.initConfig({
		copy: {
			components: {
				expand: true,
				flatten: true,
				cwd: 'public_html/' + props.site_slug + '-content/' + props.site_slug + '-themes/' + props.site_slug + '-theme/',
				src: ['*'],
				dest: '*'
			}
		}
	});


	grunt.registerTask( 'extracopy', ['init', 'copy' ] );


	grunt.util.linefeed = '\n';
};


	grunt.initConfig({
		copy: {
			main: {
				files: [
					// makes all src relative to cwd
					{expand: true,
						cwd: 'foo/',
						src: ['**'],
						dest: 'bar/'}

				]
			}
		}
	});
