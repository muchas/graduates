#!/usr/bin/env bash

source "/vagrant/vagrant/vagrant_vars.sh";

MODULE_PATH="$PROVISIONING_PATH/nginx"

apt-get -y install nginx
rm /etc/nginx/sites-enabled/default
cp "$MODULE_PATH"/graduates.conf /etc/nginx/sites-available
ln -s /etc/nginx/sites-available/graduates.conf /etc/nginx/sites-enabled/graduates.conf
service nginx restart