# Employees

## Sync

### Request

```gql
mutation {
  syncEmployees {
    count {
      new
      updated
    }
  }
}
```

### Response

```JSON
{
  "data": {
    "syncEmployees": {
        "count": {
          "new": 10,
          "updated": 20
        }
      }
  }
}
```
