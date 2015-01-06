<?php
define( 'WP_ROOT_DIR',  dirname( dirname( __FILE__ ) ) );
define(  'WP_WEBROOT_DIR',  WP_ROOT_DIR . '/public_html' );
//define locations for configs
$local_config = WP_ROOT_DIR . '/dev-config.php';
$prod_config = WP_ROOT_DIR . '/production-config.php';
//correct if production-config is in root, not above root
if ( ! file_exists( $prod_config ) ) {
	$prod_config = WP_ROOT_DIR . '/production-config.php';
}
//attempt to load production-config
if ( file_exists( $prod_config ) ) {
	define( 'WP_LOCAL_DEV', false );
	include( $prod_config );
}
elseif ( file_exists( $local_config ) ) {
	define( 'WP_LOCAL_DEV', true );
	include( $local_config  );
}
else {
	//@TODO include a static HTML fallback file before dying
	die( 'No config found:( Much saddness, very failure.' );
}
require_once( dirname( __FILE__ ). '/application.php' );
require_once( ABSPATH . 'wp-settings.php');
