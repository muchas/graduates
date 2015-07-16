from __future__ import with_statement
from fabric.api import *
from fabric.contrib.console import confirm

env.user = "root"
env.hosts = ['188.226.230.41']
env.remote_path = '/var/www/graduates/'


def test_locally():
    with settings(warn_only=True):
        result = local('./manage.py test')
    if result.failed and not confirm("Local tests failed. Continue anyway?"):
        abort("Aborting at user request.")


def test_remotely():
    with settings(warn_only=True):
        with cd(env.remote_path):
            result = run('./venv/bin/python ./manage.py test')
    if result.failed and not confirm("Remote tests failed. Continue anyway?"):
        abort("Aborting at user request.")


def git_push():
    local("git push origin develop")
    local("git push live develop")


def git_pull():
    with cd(env.remote_path):
        run("git pull")


def git_checkout(branch='develop'):
    with cd(env.remote_path):
        run("git checkout {0}".format(branch))


def service_restart(service):
    run("sudo service {0} restart".format(service))


def upgrade_requirements(filename="requirements.txt"):
    with cd(env.remote_path):
        with settings(warn_only=True):
            if run("test -f {0}".format(filename)).failed:
                abort("Project requirements file not found.")
            else:
                run("./venv/bin/pip install -r {0} --upgrade".format(filename))


def install_requirements(filename="requirements.txt"):
    with cd(env.remote_path):
        with settings(warn_only=True):
            if run("test -f {0}".format(filename)).failed:
                abort("Project requirements file not found.")
            else:
                run("./venv/bin/pip install -r {0}".format(filename))


def migrate_database():
    with cd(env.remote_path):
        run("./venv/bin/python ./manage.py migrate --noinput")


def rebuild_index():
    with cd(env.remote_path):
        with settings(warn_only=True):
            if run("./venv/bin/python ./manage.py rebuild_index --noinput").failed and\
               not confirm("Elasticsearch index rebuild failed. Continue anyway?"):
                abort("Aborting at user request.")


def process_static():
    with cd(env.remote_path):
        run("./venv/bin/python ./manage.py js_urls")
        run("grunt")
        run("./venv/bin/python ./manage.py collectstatic --noinput")


def restart():
    """
    Restarts uwsgi instance - function assumes that uwsgi works in emperor mode
    """
    with cd(env.remote_path):
        run("touch graduates_uwsgi.ini")


def deploy():
    test_locally()
    git_push()
    git_checkout()
    git_pull()
    install_requirements()
    migrate_database()
    service_restart('elasticsearch')
    process_static()
    rebuild_index()
    test_remotely()
    restart()