# uuid-kit

Generate UUID values (v4, v7) with flexible formatting and structured output options.

> Previously published as `generate-uuid-version`

---

## Install

```bash
npm install uuid-kit
```

---

## Usage

```js
import { generateUUID } from "uuid-kit";

const result = generateUUID({
  count: 3,
  version: "v7"
});

console.log(result);
```

---

## Output

```json
{
  "version": "v7",
  "count": 3,
  "format": "standard",
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
| count | number | No | 1 | Number of UUIDs to generate (min 1, max 100) |
| version | string | No | v7 | UUID version: v4 or v7 |
| format | string | No | standard | Output format: standard, compact, uppercase, uppercase-compact |
| prefix | string | No | "" | String to prepend to each UUID |
| suffix | string | No | "" | String to append to each UUID |
| asObjects | boolean | No | false | Return structured objects instead of strings |

---

## Examples

### Default (v7)

```js
generateUUID({ count: 2 });
```

### v4 (random)

```js
generateUUID({ count: 2, version: "v4" });
```

### v7 (time-based, recommended)

```js
generateUUID({ count: 2, version: "v7" });
```

### Compact format

```js
generateUUID({
  count: 2,
  format: "compact"
});
```

### Uppercase + prefix

```js
generateUUID({
  count: 2,
  format: "uppercase",
  prefix: "id_"
});
```

### Object mode (includes raw + timestamp for v7)

```js
generateUUID({
  count: 2,
  asObjects: true
});
```

Output:

```json
{
  "version": "v7",
  "count": 2,
  "format": "standard",
  "items": [
    {
      "uuid": "uuid-1",
      "raw": "uuid-1",
      "index": 0,
      "timestamp": {
        "iso": "2026-04-09T18:12:34.567Z",
        "unix": 1712686354567
      }
    }
  ]
}
```

---

## Formats

- standard → default UUID format
- compact → removes hyphens
- uppercase → uppercase letters
- uppercase-compact → uppercase + no hyphens

---

## Object Mode

When `asObjects: true`, each item includes:

- `uuid` → final formatted value
- `raw` → original UUID (before formatting)
- `index` → position in array
- `timestamp` → only for v7 (derived from UUID)

---

## Supported Versions

- v4 = random
- v7 = time-based (sortable, recommended)

---

## Exposed Constants

```js
import {
  ALLOWED_FORMATS,
  ALLOWED_VERSIONS
} from "uuid-kit";
```

---

## Behavior

- Invalid or missing `count` defaults to 1
- Maximum `count` is 100
- Invalid or missing `version` defaults to v7
- Invalid or missing `format` defaults to standard

---

## Environment Notes

Some hosted JavaScript runtimes require you to explicitly add npm packages before use. In those environments, add:

- uuid-kit
- uuid@10

---

## License

MIT