from rest_framework_simplejwt.tokens import RefreshToken

#generates a pair of JSON web token(jwts)for a given user
def get_token(user):
    refresh=RefreshToken.for_user(user)
    #This line adds the user's ID to the payload of the refresh token. This could be useful for identifying the user when the token is used to make API requests.
    refresh['id']=user.id

    return{
        #This line converts the refresh token object to a string so it can be sent in an HTTP response.
        'refresh':str(refresh),
        #gets the access token associated with the refresh token
        'access':str(refresh.access_token),
    }


#one for accessing protected resources (the access token) and one for getting a new access token when the old one expires (the refresh token)
