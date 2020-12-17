This auth package contains verification flow for Google Sign-In. Eventually, it should contain more providers as we grow.

- Google Sign-In with backend auth:
  - Android: https://developers.google.com/identity/sign-in/android/backend-auth
  - iOS: https://developers.google.com/identity/sign-in/ios/backend-auth
  - Web: https://developers.google.com/identity/sign-in/web/backend-auth

# TODO

- Implement Cross-Account Protection
  - Google: https://developers.google.com/identity/protocols/risc
- Other providers (Facebook? Apple?)

# Google Sign-in

Here is how Google Sign-In works on high level (with backend auth):

1. User clicks the sign-in button in our application which opens OAuth dialog. After logging in, the iOS/Android app recieves payload including so called _"ID token"_ (JWT).
1. Application sends the ID token to the server (via GraphQL) where we verify its integrity (to make sure it's legit).
   - The token might be invalid in which case we reject it and nothing happens (client app shows an error), or:
   - The token is valid in which case we either login the user or register a new user and login (https://developers.google.com/identity/sign-in/ios/backend-auth#create-an-account-or-session).

> After you have verified the token, check if the user is already in your user database. If so, establish an authenticated session for the user. If the user isn't yet in your user database, create a new user record from the information in the ID token payload, and establish a session for the user. You can prompt the user for any additional profile information you require when you detect a newly created user in your app.
