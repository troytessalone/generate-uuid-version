# uuid-kit

Generate UUID values (v4, v7) with flexible formatting, prefixes, suffixes, and output shape options.

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
  "output_as": "array",
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
| count | int | No | 1 | Number of UUIDs to generate |
| version | string | No | v7 | UUID version: `v4` or `v7` |
| format | string | No | standard | Output format: `standard`, `compact`, `uppercase`, `uppercase-compact` |
| prefix | string | No | "" | Text to prepend to each UUID |
| suffix | string | No | "" | Text to append to each UUID |
| outputAs | string | No | array | Output shape: `array`, `object`, or `string` |

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

### Default

```python
generate_uuid(count=2)
```

Output:

```json
{
  "version": "v7",
  "format": "standard",
  "output_as": "array",
  "count": 2,
  "items": [
    "uuid-1",
    "uuid-2"
  ]
}
```

### v4

```python
generate_uuid(count=2, version="v4")
```

### v7

```python
generate_uuid(count=2, version="v7")
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

### Object output

```python
generate_uuid(count=2, outputAs="object")
```

Example output:

```json
{
  "version": "v7",
  "format": "standard",
  "output_as": "object",
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

### String output

```python
generate_uuid(count=3, outputAs="string")
```

Example output:

```json
{
  "version": "v7",
  "format": "standard",
  "output_as": "string",
  "count": 3,
  "items": "uuid-1,uuid-2,uuid-3"
}
```

---

## Output Shapes

### `outputAs="array"`

Returns `items` as a list of formatted UUID strings.

### `outputAs="object"`

Returns `items` as a list of objects.

Each object includes:

- `uuid` = final formatted value
- `raw` = original UUID before formatting
- `index` = zero-based position in the result set
- `timestamp` = only for v7, derived from the UUID

### `outputAs="string"`

Returns `items` as a single comma-delimited string.

---

## Supported Versions

- `v4` = random
- `v7` = modern time-based

---

## Exports

```python
from uuid_kit import generate_uuid
from uuid_kit import ALLOWED_FORMATS, ALLOWED_VERSIONS, ALLOWED_OUTPUT_AS
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

- Invalid or missing `count` defaults to `1`
- `count` is capped at `100`
- Invalid or missing `version` defaults to `v7`
- Invalid or missing `format` defaults to `standard`
- Invalid or missing `outputAs` defaults to `array`

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