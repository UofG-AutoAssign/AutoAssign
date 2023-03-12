"""
Hashing user passwords
"""
import hashlib
from django.conf import settings

SALT = settings.SECRET_KEY


def hash_encryption(data):
    """
        This function accepts a string as input and returns its MD5 hash encryption.

        Args:
            data (str): The string to be hashed.

        Returns:
            str: The MD5 hash encryption of the input string.
    """
    obj = hashlib.md5(SALT.encode('utf-8'))
    obj.update(data.encode('utf-8'))
    hash_pwd = obj.hexdigest()

    return hash_pwd
