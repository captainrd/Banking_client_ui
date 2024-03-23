# from rest_framework_simplejwt.authentication import JWTAuthentication
# from django.conf import settings

# from rest_framework.authentication import CSRFCheck
# from rest_framework import exceptions


# def enforce_csrf(request):
#     check = CSRFCheck()
#     check.process_request(request)
#     reason = check.process_view(request, None, (), {})
#     if reason:
#         raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)


# class CustomAuthentication(JWTAuthentication):
#     def authenticate(self, request):
#         header = self.get_header(request)

#         if header is None:
#             raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE']) or None
#         else:
#             raw_token = self.get_raw_token(header)
#         if raw_token is None:
#             return None

#         validated_token = self.get_validated_token(raw_token)
#         enforce_csrf(request)
#         return self.get_user(validated_token), validated_token


from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from rest_framework.authentication import CSRFCheck
from rest_framework import exceptions

from django.utils.deprecation import MiddlewareMixin  # Import MiddlewareMixin

class CustomCSRFCheck(MiddlewareMixin):  # Modify the class to inherit MiddlewareMixin
    def __init__(self, get_response=None):  # Add get_response as an argument
        self.get_response = get_response

    def __call__(self, request):
        reason = CSRFCheck().process_view(request, None, (), {})
        if reason:
            raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)
        return self.get_response(request)  # Call get_response with the request

class CustomAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)

        if header is None:
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE']) or None
        else:
            raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        # enforce_csrf(request)  # This line is no longer needed
        return self.get_user(validated_token), validated_token
