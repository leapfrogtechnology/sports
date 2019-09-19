# Statuses

## List all

### Request

```gql
query {
  statuses {
    id,
    name
  }
}
```

### Response

```JSON
{
  "data": {
    "statuses": [
      {
        "id": 3,
        "name": "Played"
      },
      {
        "id": 4,
        "name": "Cancelled"
      }
    ]
  }
}
```

## Create

### Request

```gql
mutation {
  createStatus (name: String!) {
    id,
    name
  }
}
```

### Response

```JSON
{
  "data": {
    "createStatus": {
        "id": 5,
        "name": "Forfeited"
      }
  }
}
```

## Edit

### Request

```gql
mutation {
  editStatus (id: Int!, name: String!) {
    id,
    name
  }
}
```

### Response

```JSON
{
  "data": {
    "editStatus": {
      "id": 5,
      "name": "Upcoming"
    }
  }
}
```

## Delete

### Request

```gql
mutation {
  deleteStatus (id: Int!) {
    message
  }
}
```

### Response

```JSON
{
  "data": {
    "deleteStatus": {
      "message": "Status successfully deleted"
    }
  }
}
```
