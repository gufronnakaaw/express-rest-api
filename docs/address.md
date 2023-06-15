# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "street",
  "city": "city",
  "province": "province",
  "country": "country",
  "postal_code": "postal_code"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "id": "unique id",
    "street": "street",
    "city": "city",
    "province": "province",
    "country": "country",
    "postal_code": "postal_code"
  },
  "errors": null
}
```

Response Body Error :

```json
{
  "success": false,
  "data": null,
  "errors": "Province is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "street",
  "city": "city",
  "province": "province",
  "country": "country",
  "postal_code": "postal_code"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "id": "unique id",
    "street": "street",
    "city": "city",
    "province": "province",
    "country": "country",
    "postal_code": "postal_code"
  },
  "errors": null
}
```

Response Body Error :

```json
{
  "success": false,
  "data": null,
  "errors": "Province is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressesId
Headers :

- Authorization : token

Response Body Success :

```json
{
  "success": true,
  "data": {
    "id": "unique id",
    "street": "street",
    "city": "city",
    "province": "province",
    "country": "country",
    "postal_code": "postal_code"
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

## List Address API

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Response Body Success :

```json
{
  "success": true,
  "data": [
    {
      "id": "unique id",
      "street": "street 1",
      "city": "city 1",
      "province": "province 1",
      "country": "country 1",
      "postal_code": "postal_code 1"
    },
    {
      "id": "unique id",
      "street": "street 2",
      "city": "city 2",
      "province": "province 2",
      "country": "country 2",
      "postal_code": "postal_code 2"
    }
  ],
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

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressesId

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
