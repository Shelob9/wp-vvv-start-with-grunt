Josh's WordPress VVV Site Starter
================================

[Why I Love Composer For This Sort Of Thing](http://joshpress.net/blog/using-composer-increase-wordpress-development-powers/)

Note that opposed to the theme and plugin starter projects by 10up that this is based on, this project does not aim to be universal, and is highly-opinionated. It uses composer and structures the site the way *I want it*. It also has all of the Composer dependencies that *I want* pre-defined. You probably will want to fork this and adapt it to fit your needs.

### Installing This Template
* Install Node, NPM, and grunt-cli globally if not already installed.
    * https://github.com/joyent/node/wiki/installing-node.js-via-package-manager
* Install grunt-init globally if not already installed.
    * `npm install -g grunt-init`
* Clone this repo to `~/grunt-init`--only needs to be done once and then it will be available for project creation globally.
    * `git clone https://github.com/Shelob9/wp-vvv-start-with-grunt ~/.grunt-init`
    
### Setup Local Dev
NOTE: It is assumed that VVV is installed, as well as the Vagrant Host Updater plugin.

* In terminal, switch to your VVV's WWW folder. Presuming VVV is in ~/vagrant, you would do:
    * `cd ~/vagrant/www
* Make a new directory. IMPORTANT - You must use the same name when prompted for "site_slug". Make sure in all following steps to substitute for site_slug.
    * `mkdir site_slug`
* Switch to new directory
    * `cd site_slug`
* Run this repo's installer:
    * `grunt-init wp-vvv-start-with-grunt`
* Follow the prompts
* Run composer update, probably updating dependencies first.
    * `composer update`
    * @TODO automate this with `https://github.com/voceconnect/grunt-composer`
* Switch to the theme directory and install its node modules
    * `cd public_html\site_slug-themes\site_slug-theme`
    * `npm install`
    * @TODO automate this
* Re-provision & Re-start Vagrant
    * `vagrant halt`
    * `vagrant provision`
    * `vagrant up`
    
### About the structure of this project.
The philosophy of this project is that only code that is unique to this project should ever be committed to its Git repo. All other code should be tracked elsewhere and tracked as dependency using a proper dependency manager.

For this reason, only the site's configuration, and its main theme are under version control. Everything else, including WordPress is brought in using a dependency manager. If changes are made to those packages, they can be committed by cding into those directories, committing and pushing back to origin. This does happen to me a lot as I am the author of the

In order to facilitate having a theme not under version control, a second theme directory is registered via a mu-plugin, that themes specifically designed for this site can live in. Keep in mind that this breaks using @import directives in child theming, which is a bad practice anyway. See: http://kovshenin.com/2014/child-themes-import/

Speaking of mu-plugins, that directory is not gitinored.

This site's content directory, is named for the project and is not wp-content, that makes it easier to search for on your computer, as you probably already have 2700 wp-contents. WordPress is installed in a directory called "wp". That keeps the things that defines your site--plugins, themes, mu-plugins, uploads, etc.--separated from WordPress itself.

    
### Going Live, wp-config and You
Salts, and DB details should be set in dev-config.php and prod-config.php. If production-config.php exists that will be used. So don't have that in your local dev environment, but manually place it in your live environment. production-config.php is gitignored, and since that's the only thing with sensitive details, the rest of the repo that this project creates should be safe to post publicly.

@TODO post bash script to do that.

### License, Copyright etc.
Copyright (c) 2015 [Josh Pollock](http://JoshPress.net).

Licensed under the terms of the [GNU General Public License version 2](http://www.gnu.org/licenses/gpl-2.0.html) or later. Please share with your neighbor.

Much inspiration and copypasta from https://github.com/10up/grunt-wp-theme -- Copyright (c) 2013 Eric Mann, 10upp. Licensed under the MIT License.
