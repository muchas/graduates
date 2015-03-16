#!/usr/bin/env bash

source "/vagrant/vagrant_vars.sh";

GRADUATES_PATH="/srv/graduates"
VENV_NAME="venv"

source "$GRADUATES_PATH"/"$VENV_NAME"/bin/activate;

# Media directories
if [ ! -d "$GRADUATES_PATH"/media ]; then
    mkdir "$GRADUATES_PATH"/media "$GRADUATES_PATH"/media/pictures;
fi

"$GRADUATES_PATH"/manage.py js_urls;
"$GRADUATES_PATH"/manage.py makemigrations;
"$GRADUATES_PATH"/manage.py migrate;

ln -s /usr/bin/nodejs /usr/bin/node;

cd "$GRADUATES_PATH";
grunt;

deactivate;