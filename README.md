# uuid-kit

Generate UUID values in both JavaScript and Python with support for UUID v4 and v7, multiple output formats, prefixes, suffixes, and flexible output shapes.

---

## Packages

This repository contains two versions of the same utility:

- JavaScript package for npm in `./js`
- Python package for PyPI in `./py`

---

## JavaScript / npm

### Install

```bash
npm install uuid-kit
```

### Usage

```js
import { generateUUID } from "uuid-kit";

const result = generateUUID({
  count: 3,
  version: "v7",
  format: "standard",
  output_as: "array"
});

console.log(result);
```

### Package Location

```text
./js
```

---

## Python / PyPI

### Install

```bash
pip install uuid-kit
```

### Usage

```python
from uuid_kit import generate_uuid

result = generate_uuid(
    count=3,
    version="v7",
    format="standard",
    output_as="array"
)

print(result)
```

### Package Location

```text
./py
```

---

## Example Output

### `output_as: "array"`

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

### `output_as: "object"`

```json
{
  "version": "v7",
  "format": "standard",
  "output_as": "object",
  "count": 2,
  "items": [
    {
      "uuid": "018f0f4a-7c5c-7f55-b5b0-7c37f0e9f3aa",
      "raw": "018f0f4a-7c5c-7f55-b5b0-7c37f0e9f3aa",
      "index": 1,
      "timestamp": {
        "unix": 1717000000,
        "iso": "2024-05-29T12:53:20.000Z"
      }
    },
    {
      "uuid": "018f0f4a-7c5d-77b2-9a35-6f1dc0d63e11",
      "raw": "018f0f4a-7c5d-77b2-9a35-6f1dc0d63e11",
      "index": 2,
      "timestamp": {
        "unix": 1717000001,
        "iso": "2024-05-29T12:53:21.000Z"
      }
    }
  ]
}
```

### `output_as: "string"`

```json
{
  "version": "v4",
  "format": "compact",
  "output_as": "string",
  "count": 2,
  "items": "uuid1,uuid2"
}
```

---

## Options

| Field | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| count | number / int | No | 1 | Number of UUIDs to generate |
| version | string | No | v7 | UUID version: `v4` or `v7` |
| format | string | No | standard | Output format: `standard`, `compact`, `uppercase`, `uppercase-compact` |
| prefix | string | No | "" | Text to prepend to each UUID |
| suffix | string | No | "" | Text to append to each UUID |
| output_as | string | No | array | Output shape: `array`, `object`, or `string` |

---

## Supported Versions

- `v4` = random
- `v7` = modern time-based

---

## Supported Formats

- `standard`
- `compact`
- `uppercase`
- `uppercase-compact`

---

## Supported Output Shapes

- `array`
- `object`
- `string`

---

## Behavior

- Invalid or missing `count` defaults to `1`
- Maximum `count` is `100`
- Invalid or missing `version` defaults to `v7`
- Invalid or missing `format` defaults to `standard`
- Invalid or missing `output_as` defaults to `array`
- `output_as: "object"` returns structured item objects
- v7 object items include timestamp metadata
- v4 object items do not include timestamp metadata

---

## Repository Structure

```text
uuid-kit/
  README.md
  LICENSE
  .gitignore

  js/
    index.js
    LICENSE
    package.json
    README.md

  py/
    LICENSE
    README.md
    pyproject.toml
    uuid_kit/
      __init__.py
      core.py
```

---

## Notes

- `js/README.md` is the npm-focused package README
- `py/README.md` is the PyPI-focused package README
- This root `README.md` is the repo overview
- Python uses `uuid_kit` as the import path
- Python package distribution name is `uuid-kit`

---

## License

MIT