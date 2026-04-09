# uuid-kit

Generate UUID values (v4, v7) with flexible formatting and structured output options in both JavaScript and Python.

---

## Packages

This repo contains two versions of the same utility:

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
  version: "v7"
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
    version="v7"
)

print(result)
```

### Package Location

```text
./py
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
| count | number / int | No | 1 | Number of UUIDs to generate (min 1, max 100) |
| version | string | No | v7 | UUID version: v4 or v7 |
| format | string | No | standard | Output format: standard, compact, uppercase, uppercase-compact |
| prefix | string | No | "" | Text to prepend to each UUID |
| suffix | string | No | "" | Text to append to each UUID |
| asObjects | boolean / bool | No | false | Return structured objects instead of strings |

---

## Supported Versions

- v4 = random
- v7 = modern time-based

---

## Supported Formats

- standard
- compact
- uppercase
- uppercase-compact

---

## Behavior

- Invalid or missing `count` defaults to `1`
- Maximum `count` is `100`
- Invalid or missing `version` defaults to `v7`
- Invalid or missing `format` defaults to `standard`

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