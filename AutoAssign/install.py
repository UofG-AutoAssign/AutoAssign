import subprocess
import sys
import os


def install():
    pip_com = [sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt']
    back_make_com = [sys.executable, 'manage.py', 'makemigrations']
    back_mig_com = [sys.executable, 'manage.py', 'migrate']
    front_com = ['npm', 'install']
    file = os.path.dirname(os.path.realpath(__file__))

    subprocess.check_call(pip_com, cwd=file)
    subprocess.check_call(back_make_com, cwd=file)
    subprocess.check_call(back_mig_com, cwd=file)
    subprocess.check_call(front_com, cwd=os.path.abspath('../client'))


if __name__ == '__main__':
    install()
