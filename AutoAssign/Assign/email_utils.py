from django.core.mail import send_mail


def send_registration_email(email, register_url):
    subject = 'Welcome to AutoAssign!'
    message = f'''Dear user,

Thank you for registering with AutoAssign! We are delighted to have you as a member of our community.

Please click on the following link to complete the registration process: {register_url}

If you encounter any issues during the registration process, please don't hesitate to contact our customer support team.

Once again, thank you for joining us!

Best regards,
AutoAssign
'''
    from_email = 'wenda76629@vip.163.com'
    recipient_list = [email]

    send_mail(
        subject=subject,
        message=message,
        from_email=from_email,
        recipient_list=recipient_list,
        fail_silently=False
    )


def send_password_reset_email(email, reset_url):
    subject = 'Reset your AutoAssign password'
    message = f'''Dear user,

We received a request to reset your password for AutoAssign. If you did not request a password reset, please ignore this message.

Please click on the following link to reset your password: {reset_url}

If you encounter any issues during the password reset process, please don't hesitate to contact our customer support team.

Best regards,
AutoAssign
'''
    from_email = 'wenda76629@vip.163.com'
    recipient_list = [email]

    send_mail(
        subject=subject,
        message=message,
        from_email=from_email,
        recipient_list=recipient_list,
        fail_silently=False
    )
