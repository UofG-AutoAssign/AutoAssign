import subprocess
import sys
import webbrowser
import os

from time import sleep


def startup():
    back_command = [sys.executable, 'manage.py', 'runserver']
    front_command = ['npm', 'run', 'dev']
    file = os.path.dirname(os.path.realpath(__file__))

    backend = subprocess.Popen(back_command, stdout=subprocess.PIPE, cwd=file)
    frontend = subprocess.Popen(front_command, cwd=os.path.abspath('../client'), stdout=subprocess.PIPE)
    sleep(3)

    webbrowser.open('http://localhost:5173')
    backend.communicate()
    frontend.communicate()


if __name__ == '__main__':
    startup()
