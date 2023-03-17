import platform
import subprocess
import sys
import os


def install():
    pip_com = [sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt']
    django_make_com = [sys.executable, 'manage.py', 'makemigrations']
    django_mig_com = [sys.executable, 'manage.py', 'migrate']

    if platform.system() == 'Windows':
        npm_com = ['npm.cmd', 'install']
    else:
        npm_com = ['npm', 'install']

    subprocess.check_call(pip_com, cwd=os.getcwd())
    subprocess.check_call(django_make_com)
    subprocess.check_call(django_mig_com)
    subprocess.check_call(npm_com, cwd=os.chdir('../client'))


if __name__ == '__main__':
    install()
