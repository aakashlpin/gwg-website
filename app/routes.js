module.exports = function ( match ) {
	match( '', 'home#index' );
	match( 'g', 'guru#index' );
	match( 'g/schedule', 'guru#schedule' );
};