"""
Hashing user passwords
"""
import hashlib
from django.conf import settings

# pylint: disable=too-few-public-methods
class Encryption:
    """
        This class provides methods for encrypting strings using MD5 hash algorithm.
    """

    SALT = settings.SECRET_KEY

    @classmethod
    def hash_encryption(cls, data):
        """
            This method accepts a string as input and returns its MD5 hash encryption.

            Args:
                data (str): The string to be hashed.

            Returns:
                str: The MD5 hash encryption of the input string.
        """
        obj = hashlib.md5(cls.SALT.encode('utf-8'))
        obj.update(data.encode('utf-8'))
        hash_pwd = obj.hexdigest()

        return hash_pwd
