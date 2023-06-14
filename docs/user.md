# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "anonymous",
  "password": "secret",
  "email": "anonymous@mail.com"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "username": "anonymous",
    "email": "anonymous@mail.com"
  },
  "errors": null
}
```

Response Body Error :

```json
{
  "success": false,
  "data": null,
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "anonymous",
  "password": "secret"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "token": "unique token"
  },
  "errors": null
}
```

Response Body Error :

```json
{
  "success": false,
  "data": null,
  "errors": "Wrong Password"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "username": "new username", // optional
  "password": "new password", // optional
  "email": "new email" // optional
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "username": "new username",
    "email": "new email"
  },
  "errors": null
}
```

Response Body Error :

```json
{
  "success": false,
  "data": null,
  "errors": "Email already registered"
}
```

## Get User API

Endpoint : GET /api/users

Headers :

- Authorization : token

Response Body Success :

```json
{
  "success": true,
  "data": {
    "username": "anonymous",
    "email": "anonymous@mail.com"
  },
  "errors": null
}
```

Response Body Error :

```json
{
  "success": false,
  "data": null,
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "success": true,
  "errors": null
}
```

Response Body Error :

```json
{
  "success": false,
  "errors": "Unauthorized"
}
```
