import hashlib
from django.conf import settings

SALT = settings.SECRET_KEY


def hashEncryption(data):  # Pass a string to encrypt

    obj = hashlib.md5(SALT.encode('utf-8'))
    obj.update(data.encode('utf-8'))
    hash_pwd = obj.hexdigest()

    return hash_pwd

