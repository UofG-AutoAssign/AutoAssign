import subprocess
import sys


def install():
    pip_com = [sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt']
    back_make_com = [sys.executable, 'manage.py', 'makemigrations']
    back_mig_com = [sys.executable, 'manage.py', 'migrate']
    front_com = ['npm', 'install']

    subprocess.check_call(pip_com)
    subprocess.check_call(back_make_com)
    subprocess.check_call(back_mig_com)
    subprocess.check_call(front_com, cwd='../client/')


if __name__ == '__main__':
    install()
