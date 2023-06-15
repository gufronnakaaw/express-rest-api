# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "firstname": "anony",
  "lastname": "mous",
  "email": "anonymous@mail.com",
  "phone": "01231234"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "id": "unique id",
    "firstname": "anony",
    "lastname": "mous",
    "email": "anonymous@mail.com",
    "phone": "01231234"
  },
  "errors": null
}
```

Response Body Error :

```json
{
  "success": false,
  "data": null,
  "errors": "Email is invalid"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "firstname": "anony",
  "lastname": "mous",
  "email": "anonymous@mail.com",
  "phone": "01231234"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "id": "unique id",
    "firstname": "anony",
    "lastname": "mous",
    "email": "anonymous@mail.com",
    "phone": "01231234"
  },
  "errors": null
}
```

Response Body Error :

```json
{
  "success": false,
  "data": null,
  "errors": "Email is invalid"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "success": true,
  "data": {
    "id": "unique id",
    "firstname": "anony",
    "lastname": "mous",
    "email": "anonymous@mail.com",
    "phone": "01231234"
  },
  "errors": null
}
```

Response Body Error :

```json
{
  "success": false,
  "data": null,
  "errors": "Contact not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query Params :

- name : Search by firstname or lastname (optional)
- email : Search by email (optional)
- phone : Search by phone (optional)
- page : Number of page (default 1)
- size : Size per page (default 10)

Response Body Success :

```json
{
  "success": true,
  "data": [
    {
      "id": "unique id",
      "firstname": "anony1",
      "lastname": "mous1",
      "email": "anonymous1@mail.com",
      "phone": "01231234"
    },
    {
      "id": "unique id",
      "firstname": "anony 2",
      "lastname": "mous 2",
      "email": "anonymous2@mail.com",
      "phone": "01231234"
    }
  ],
  "page": 1,
  "total_page": 3,
  "total_item": 30,
  "errors": null
}
```

Response Body Error :

```json
{
  "success": false,
  "data": null,
  "errors": "Contact not found"
}
```

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

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
  "errors": "Contact not found"
}
```
