import platform
import subprocess
import sys
import webbrowser
import os

from time import sleep


def startup():
    django_run = [sys.executable, 'manage.py', 'runserver']
    windows = False

    if platform.system() == 'Windows':
        windows = True
        npm_run = ['npm.cmd', 'run', 'dev']
    else:
        npm_run = ['npm', 'run', 'dev']

    if windows:
        backend = subprocess.Popen(django_run, cwd=os.chdir('AutoAssign'))
    else:
        backend = subprocess.Popen(django_run, cwd=os.getcwd())
    frontend = subprocess.Popen(npm_run, cwd=os.chdir('../client'))
    sleep(3)

    webbrowser.open('http://localhost:5173')
    backend.communicate()
    frontend.communicate()


if __name__ == '__main__':
    startup()
