# uuid-kit

Generate UUID values (v4, v7) with flexible formatting and structured output options.

---

## Install

```bash
pip install uuid-kit
```

---

## Usage

```python
from uuid_kit import generate_uuid

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
  "version": "v7",
  "format": "standard",
  "count": 3,
  "items": [
    "uuid-1",
    "uuid-2",
    "uuid-3"
  ]
}
```

---

## Options

| Field | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| count | int | No | 1 | Number of UUIDs to generate (min 1, max 100) |
| version | string | No | v7 | UUID version: v4 or v7 |
| format | string | No | standard | Output format: standard, compact, uppercase, uppercase-compact |
| prefix | string | No | "" | Text to prepend to each UUID |
| suffix | string | No | "" | Text to append to each UUID |
| asObjects | bool | No | False | Return structured objects instead of strings |

---

## Formats

| Format | Example |
|------|------|
| standard | `123e4567-e89b-12d3-a456-426614174000` |
| compact | `123e4567e89b12d3a456426614174000` |
| uppercase | `123E4567-E89B-12D3-A456-426614174000` |
| uppercase-compact | `123E4567E89B12D3A456426614174000` |

---

## Examples

### Default (v7)

```python
generate_uuid(count=2)
```

### v4

```python
generate_uuid(count=2, version="v4")
```

### Compact format

```python
generate_uuid(count=2, format="compact")
```

### Uppercase compact with prefix and suffix

```python
generate_uuid(
    count=2,
    format="uppercase-compact",
    prefix="id_",
    suffix="_end"
)
```

### Return objects

```python
generate_uuid(count=2, asObjects=True)
```

Example output:

```json
{
  "version": "v7",
  "format": "standard",
  "count": 2,
  "items": [
    {
      "uuid": "123e4567-e89b-12d3-a456-426614174000",
      "raw": "123e4567-e89b-12d3-a456-426614174000",
      "index": 0,
      "timestamp": {
        "iso": "2026-04-09T18:00:00Z",
        "unix": 1775757600000
      }
    },
    {
      "uuid": "123e4567-e89b-12d3-a456-426614174001",
      "raw": "123e4567-e89b-12d3-a456-426614174001",
      "index": 1,
      "timestamp": {
        "iso": "2026-04-09T18:00:00Z",
        "unix": 1775757600001
      }
    }
  ]
}
```

---

## Supported Versions

- v4 = random
- v7 = modern time-based

---

## Exports

```python
from uuid_kit import generate_uuid
from uuid_kit import ALLOWED_FORMATS, ALLOWED_VERSIONS
```

---

## Environment Notes

Some hosted Python runtimes require you to explicitly add packages before use. In those environments, add:

```bash
uuid-kit
uuid6
```

---

## Behavior

- Invalid or missing `count` defaults to 1
- `count` is capped at 100
- Invalid or missing `version` defaults to `v7`
- Invalid or missing `format` defaults to `standard`

---

## Notes

- Python standard library does not yet include native UUID v7 support
- To enable true v7 UUIDs, install:

```bash
pip install uuid6
```

- If `uuid6` is not installed, `version="v7"` falls back internally and will not produce a true v7 UUID

---

## License

MIT