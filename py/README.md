# generate-uuid-version

Generate UUID values (v4, v7) with simple controls.

---

## Install

```bash
pip install generate-uuid-version
```

---

## Usage

```python
from generate_uuid_version import generate_uuid

result = generate_uuid(
    count=3,
    version="v7"
)

print(result)
```

---

## Output

```json
{
  "count": 3,
  "version": "v7",
  "items": {
    "first": "uuid-1",
    "last": "uuid-3"
  },
  "list": ["uuid-1", "uuid-2", "uuid-3"]
}
```

---

## Options

| Field | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| count | int | No | 1 | Number of UUIDs to generate (min 1, max 10) |
| version | string | No | v7 | UUID version: v4 or v7 |

---

## Examples

### Default (v7)

```python
generate_uuid(count=2)
```

### v4 (random)

```python
generate_uuid(count=2, version="v4")
```

### v7 (time-based, recommended)

```python
generate_uuid(count=2, version="v7")
```

---

## Supported Versions

- v4 = random
- v7 = modern time-based (recommended)

---

## Behavior

- Invalid or missing `count` defaults to 1
- Maximum `count` is 10
- Invalid or missing `version` defaults to v7

---

## Notes

- Python standard library does not yet include native UUID v7 support
- To enable true v7 UUIDs, install:

```bash
pip install uuid6
```

- If not installed, v7 falls back to v4 internally

---

## License

MIT