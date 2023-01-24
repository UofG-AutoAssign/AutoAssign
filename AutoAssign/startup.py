import subprocess
import sys
import webbrowser
from time import sleep


def startup():
    back_command = [sys.executable, 'manage.py', 'runserver']
    front_command = ['npm', 'run', 'dev']

    backend = subprocess.Popen(back_command, stdout=subprocess.PIPE)
    frontend = subprocess.Popen(front_command, cwd='../client/', stdout=subprocess.PIPE)
    sleep(1)

    webbrowser.open('http://localhost:5173')
    backend.communicate()
    frontend.communicate()


if __name__ == '__main__':
    startup()

