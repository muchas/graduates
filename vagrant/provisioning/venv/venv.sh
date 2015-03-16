#!/usr/bin/env bash

source "/vagrant/vagrant_vars.sh";

MODULE_PATH="$PROVISIONING_PATH/venv"

GRADUATES_PATH="/srv/graduates"
VENV_NAME="venv"

apt-get -y install python-pip python-dev build-essential;
apt-get -y install git;
apt-get -y install nodejs npm;

pip install virtualenv;

virtualenv "$GRADUATES_PATH"/"$VENV_NAME" --always-copy;
source "$GRADUATES_PATH"/"$VENV_NAME"/bin/activate;

# Downloadable packages.
pip install -r "$GRADUATES_PATH"/requirements.txt;

npm install -g grunt-cli;

deactivate;
