# Sports API

## API documentation

### Error format

```JSON
{
  "errors": [
    {
      "message": "<ERROR_MESSAGE>",
      "locations": [...],
      "path": [
        "<QUERY | MUTATION>"
      ],
      "extensions": {
        "code": "<HTTP_STATUS_CODE | HTTP_STATUS_MESSAGE>"
      }
    }
  ]
}
```

### Queries and mutations

- [Auth](./auth.md)
- [Games](./games.md)
- [Categories](./categories.md)
- [Rounds](./rounds.md)
- [Statuses](./statuses.md)
- [Tournaments](./tournaments.md)
