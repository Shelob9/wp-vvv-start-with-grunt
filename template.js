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
        // Prompt for these values

        //site title
        init.prompt( 'title', 'site.com' ),

        //site slug
        {
            name: 'site_slug',
            message: 'A short abbreviation for the site. MUST match name of folder that project is being created in. (alpha and underscore characters only)',
            default: 'site'
        },


        //site dev URL
        init.prompt( 'dev_url', 'http://site.com' ),

        //site live URL
        init.prompt( 'live_url', 'http://site.com' ),

        //php prefix for theme
        {
            name   : 'theme_prefix',
            message: 'PHP function prefix for the site theme (alpha and underscore characters only)',
            default: 'site_theme'
        },

        //description
        init.prompt( 'description' ),

        //author details
        init.prompt( 'author_url', 'http://JoshPress.net' ),
        init.prompt( 'author_name', 'Josh Pollock' ),
        init.prompt( 'author_email', 'Josh@JoshPress.net' ),
        {
            name: 'css_type',
            message: 'CSS Preprocessor: Will you use "Sass", "LESS", or "none" for CSS with this project?',
            default: 'Sass'
        }
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

        // Files to copy and process
        var files = init.filesToCopy( props );

        switch( props.css_type.toLowerCase()[0] ) {
            case 'l':
                delete files[ 'public_html/site-themes/site-theme/assets/css/sass/' + props.js_safe_name + '.scss'];
                delete files[ 'public_html/site-themes/site-theme/assets/css/src/' + props.js_safe_name + '.css' ];

                props.devDependencies["grunt-contrib-less"] = "~0.11.2";
                props.css_type = 'less';
                break;
            case 'n':
            case undefined:
                delete files[ 'public_html/site-themes/site-theme/assets/css/less/' + props.js_safe_name + '.less'];
                delete files[ 'public_html/site-themes/site-theme/assets/css/sass/' + props.js_safe_name + '.scss'];

                props.css_type = 'none';
                break;
            // SASS is the default
            default:
                delete files[ 'public_html/site-themes/site-theme/assets/css/less/' + props.js_safe_name + '.less'];
                delete files[ 'public_html/site-themes/site-theme/assets/css/src/' + props.js_safe_name + '.css' ];

                props.devDependencies["grunt-contrib-sass"] = "~0.8.0";
                props.css_type = 'sass';
                break;
        }

        console.log( files );

        // Actually copy and process files
        init.copyAndProcess( files, props );

        // Generate package.json file
        init.writePackageJSON( 'package.json', props );

        // Done!
        done();
    });
};
