<?php
/**
 * Setup everything common to all environments
*/

/**
 * Content dir/url
 */
define( 'CONTENT_DIR', '/cwp-content' );
define( 'WP_CONTENT_DIR', WP_WEBROOT_DIR . CONTENT_DIR );
define( 'WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/public_html' . CONTENT_DIR );

/**
 * DB info
 */
$table_prefix = 'wp_';
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');
if ( ! defined( 'DB_HOST' ) ) {
	define( 'DB_HOST', 'localhost' );
}

/**
 * DEBUG
 */
if ( ! defined( 'WP_LOCAL_DEV' ) ) {
	define( 'WP_LOCAL_DEV', false );
}
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
if ( ! WP_LOCAL_DEV ) {
	define( 'WP_DEBUG_DISPLAY', false );
}


/**
 * Other
 */
//no auto-upadates
define( 'AUTOMATIC_UPDATER_DISABLED', true );

//no file edits in admin
define( 'DISALLOW_FILE_EDIT', true );

//no uploading themes or plugins in admin
define( 'DISALLOW_FILE_MODS', true);

//memory
define( 'WP_MEMORY_LIMIT', '512M' );

//load memcached for object caching if possible
if ( file_exists( dirname( __FILE__ ) . '/memcached.php' ) ) {
	$memcached_servers = include( dirname( __FILE__ ) . '/memcached.php' );
}

/**
 * SET ABSPATH
 */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', WP_WEBROOT_DIR . '/wp/' );
}
