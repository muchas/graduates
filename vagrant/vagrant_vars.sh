#!/usr/bin/env bash

DUMPFILE="graduates.sql.xz"; # place your dump file name here, it should be placed in 'graduates-devops/vagrant/'
DB_DUMP_COMPRESSION="xz"; # leave blank for none

VAGRANT_PATH="/vagrant";
REPO_PATH=$VAGRANT_PATH"/graduates";
PROVISIONING_PATH=$VAGRANT_PATH"/provisioning";
DUMPFILE_PATH=$VAGRANT_PATH"/vagrant/"$DUMPFILE;

export LOCAL_DB_NAME="graduates";
export LOCAL_DB_USER="root";
export LOCAL_DB_PASS="koq120p";