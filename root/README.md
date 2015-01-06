Josh's WordPress VVV Site Starter


### Setup Local Dev
cd into your VVV's www dir
git clone https://github.com/shelob9/wp-vvv-start.git site
Find and Replace "site" and change to whatever you want.
cd site
composer update
vagrant provision
vagrant halt
vagrant up

### Going Live, wp-config and you
Salts, and DB details should be set in dev-config.php and prod-config.php. If prod-config.php exists that will be used. So don't have that in your local dev environment, but manually place it in your live environment. prod-config.php is gitignored, and since that's the only thing with sensitive details, the rest of the repo should be safe to post publicly.

To deploy, git clone this then run composer update.

@todo post bash script to do that.

### License, Copyright etc.
Copyright 2014 [Josh Pollock](http://JoshPress.net).

Licensed under the terms of the [GNU General Public License version 2](http://www.gnu.org/licenses/gpl-2.0.html) or later. Please share with your neighbor.

