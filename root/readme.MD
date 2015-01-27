# {%= title = %}
{%= description %}

### A Philosophical Statement On Dependency Management & Version Control ###
The philosophy of the structure for this project is that only code that is unique to this project should ever be committed to its Git repo. All other code should be tracked elsewhere and tracked as dependency using a proper dependency manager.

For this reason, only the site's configuration, and its main theme are under version control. Everything else, including WordPress is brought in using a dependency manager. If changes are made to those packages, they can be committed by cding into those directories, committing and pushing back to origin. This does happen to me a lot as I am the author of the

In order to facilitate having a theme not under version control, a second theme directory is registered via a mu-plugin, that themes specifically designed for this site can live in. This second theme directory is located in `public_html/{%= site_slug %}-content/` with a theme called `{%= site_slug %}-theme` preloaded with basic template files, a functions.php and everything you need to do SASS an JS development with Grunt.
 
 Keep in mind that this breaks using @import directives in child themeing, which is a bad practice anyway. See: http://kovshenin.com/2014/child-themes-import/

Speaking of mu-plugins, that directory is not gitinored.

This site's content directory, is named for the project and is not wp-content, that makes it easier to search for on your computer, as you probably already have 2700 wp-contents. WordPress is installed in a directory called "wp". That keeps the things that defines your site--plugins, themes, mu-plugins, uploads, etc.--separated from WordPress itself.

The content directory is `public_html/{%= site_slug %}-content/`
### Structure

    
### Going Live, wp-config and You
Salts, and DB details should be set in dev-config.php and prod-config.php. If production-config.php exists that will be used. So don't have that in your local dev environment, but manually place it in your live environment. production-config.php is gitignored, and since that's the only thing with sensitive details, the rest of the repo that this project creates should be safe to post publicly.
