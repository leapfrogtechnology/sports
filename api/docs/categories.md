# Categories

## List all

### Request

```gql
query {
  categories {
    id
    name
  }
}
```

### Response

```JSON
{
  "data": {
    "categories": [
      {
        "id": 3,
        "name": "Mens Singles"
      },
      {
        "id": 4,
        "name": "Womens Singles"
      },
      {
        "id": 2,
        "name": "Mixed Doubles"
      }
    ]
  }
}
```

## Create

### Request

```gql
mutation {
  createCategory (name: String!) {
    id,
    name
  }
}
```

### Response

```JSON
{
  "data": {
    "createCategory": {
        "id": 5,
        "name": "Mixed Singles"
      }
  }
}
```

## Edit

### Request

```gql
mutation {
  editCategory (id: Int!, name: String!) {
    id,
    name
  }
}
```

### Response

```JSON
{
  "data": {
    "editGame": {
      "id": 5,
      "name": "Mixed Doubles"
    }
  }
}
```

## Delete

### Request

```gql
mutation {
  deleteCategory (id: Int!) {
    message
  }
}
```

### Response

```JSON
{
  "data": {
    "deleteGame": {
      "message": "Category successfully deleted"
    }
  }
}
```
