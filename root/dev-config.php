<?php
/**
 * WordPress configuration for development in VVV
 */

/**
 * Local DB config
 */
define( 'DB_NAME', 'site' );
define( 'DB_USER', 'wp' );
define( 'DB_PASSWORD', 'wp' );


/**
 * AUTH keys.
 */
define('AUTH_KEY', '12345' );
define('SECURE_AUTH_KEY', '12345' );
define('LOGGED_IN_KEY', '12345' );
define('NONCE_KEY', '12345' );
define('AUTH_SALT', '12345' );
define('SECURE_AUTH_SALT', '12345' );
define('LOGGED_IN_SALT', '12345' );
define('NONCE_SALT', '12345' );

/**
 * Track queries for profiling
 */
define( 'SAVEQUERIES', true );

/**
 * Pods debug-mode
 */
define( "PODS_DEVELOPER", true );
define( "PODS_GITHUB_UPDATE", true );
