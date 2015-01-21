/**
 * wp-vvv-start-with-grunt
 * https://github.com/Shelob9/wp-vvv-start-with-grunt
 *
 * Copyright (c) 2015 Josh Pollock
 * Licensed under the GPL version 2 or later.
 *
 * Much inspiration and copypasta from https://github.com/10up/grunt-wp-theme -- Copyright (c) 2013 Eric Mann, 10upp. Licensed under the MIT License
 */

'use strict';

// Basic template description
exports.description = 'Create a WordPress site.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after the question prompts.
exports.after = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template
exports.template = function( grunt, init, done ) {
    init.process( {}, [
        /** Prompts **/

        //site title
        init.prompt( 'title', 'site.com' ),

        //description
        init.prompt( 'description' ),

        //site slug
        {
            name: 'site_slug',
            message: 'A short abbreviation for the site. MUST match name of folder that project is being created in. (alpha and underscore characters only)',
            default: 'site'
        },


        //site live URL
        init.prompt( 'live_url', '' ),

        //php prefix for theme
        {
            name   : 'theme_prefix',
            message: 'PHP function prefix for the site theme (alpha and underscore characters only)',
            default: 'site_theme'
        },


        //author details
        init.prompt( 'author_url', 'http://JoshPress.net' ),
        init.prompt( 'author_name', 'Josh Pollock' ),
        init.prompt( 'author_email', 'Josh@JoshPress.net' ),

        //color palette
        init.prompt( 'primary_color' ),
        init.prompt( 'secondary_color' ),
        init.prompt( 'accent_color' ),
        init.prompt( 'background_color' )



    ], function( err, props ) {
        props.keywords = [];
        props.version = '0.1.0';
        props.devDependencies = {
            'grunt': '~0.4.5',
            'matchdep': '~0.1.2',
            'grunt-contrib-concat': '~0.5.0',
            'grunt-contrib-uglify': '~0.6.0',
            'grunt-contrib-cssmin': '~0.10.0',
            'grunt-contrib-jshint': '~0.10.0',
            'grunt-contrib-nodeunit': '~0.4.1',
            'grunt-contrib-watch': '~0.6.1'
        };

        /**Create More Vars Programattically*/

        // Sanitize names where we need to for PHP/JS
        props.name = props.title.replace( /\s+/g, '-' ).toLowerCase();

        // Development prefix (i.e. to prefix PHP function names, variables)
        props.prefix = props.theme_prefix.replace('/[^a-z_]/i', '').toLowerCase();

        // Development prefix in all caps (e.g. for constants)
        props.theme_prefix_caps = props.theme_prefix.toUpperCase();

        // An additional value, safe to use as a JavaScript identifier.
        props.js_safe_name = props.name.replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');

        // An additional value that won't conflict with NodeUnit unit tests.
        props.js_test_safe_name = props.js_safe_name === 'test' ? 'myTest' : props.js_safe_name;
        props.js_safe_name_caps = props.js_safe_name.toUpperCase();

        //make author_url and hompepage the same for now
        props.homepage = props.author_url;

        //create dev_url for use in VVV config
        props.dev_url = props.site_slug + '.dev';

        /**Copy and Process Files**/
        var files = init.filesToCopy( props );

        // Actually copy and process files
        init.copyAndProcess( files, props );

       //move and rename additional files
        var files = init.filesToCopy(props),
            newThemeDir = props.site_slug + '-content/' + props.site_slug + '-themes/' + props.site_slug + '-theme';
        var match = 'site-content/site-themes/site-theme';
        for (var file in files) {

            if (file.indexOf( match ) > -1) {

                var path = files[file],
                    newFile = file.replace( match, newThemeDir );

                files[newFile] = path;
                delete files[file];
            }

        }

        //do the copy and replace
        init.copyAndProcess(files, props);

        //log new file names. Looks cool, and lets us see mistakes.
        console.log( files );

        // Generate package.json file
        var newThemeDirFull = 'public_html/' + newThemeDir;
        init.writePackageJSON( newThemeDirFull + '/package.json', props );

        //delete site-content dir
        grunt.file.delete( 'public_html/site-content' );

        /** Be done */
        done();

    });
};
