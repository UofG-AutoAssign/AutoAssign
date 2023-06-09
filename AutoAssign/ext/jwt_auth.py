"""
    Geneate a Jwt token
"""
import datetime

import jwt
from jwt import exceptions


from django.conf import settings

JWT_SALT = settings.SECRET_KEY


def create_token(payload):
    """
        Generate a JWT token with the provided payload and a default expiration time of 1 day.

        Args:
            payload (dict): Payload to be included in the token.
            timeout (int): Optional parameter to
            -set the expiration time in minutes. Default is 20 minutes.

        Returns:
            str: Encoded JWT token.
    """
    headers = {
        'typ': 'jwt',
        'alg': 'HS256'
    }
    # pylint: disable=C0301
    payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(days=1)
    result = jwt.encode(payload=payload, key=JWT_SALT, algorithm="HS256", headers=headers).decode('utf-8')

    return result


def parse_payload(token):
    """
    Make and distribute the token for the token and get the payload
    :param token:
    :return:
    """
    result = {'status': False, 'data': None, 'error': None}
    try:
        verified_payload = jwt.decode(token, JWT_SALT, True)
        result['status'] = True
        result['data'] = verified_payload
    except exceptions.ExpiredSignatureError:
        result['error'] = 'Token has failed'
    except jwt.DecodeError:
        result['error'] = 'token authentication fails'
    except jwt.InvalidTokenError:
        result['error'] = 'Illegal tokens'
    return result
