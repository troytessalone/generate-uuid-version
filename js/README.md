# uuid-kit

Generate UUID values (v4, v7) with flexible formatting, prefixes, suffixes, and output shape options.

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
| count | number | No | 1 | Number of UUIDs to generate |
| version | string | No | v7 | UUID version: `v4` or `v7` |
| format | string | No | standard | Output format: `standard`, `compact`, `uppercase`, `uppercase-compact` |
| prefix | string | No | "" | String to prepend to each UUID |
| suffix | string | No | "" | String to append to each UUID |
| outputAs | string | No | array | Output shape: `array`, `object`, or `string` |

---

## Examples

### Default

```js
generateUUID({ count: 2 });
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

```js
generateUUID({
  count: 2,
  version: "v4"
});
```

### v7

```js
generateUUID({
  count: 2,
  version: "v7"
});
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

### Prefix + suffix

```js
generateUUID({
  count: 2,
  prefix: "pre_",
  suffix: "_end"
});
```

### Object output

```js
generateUUID({
  count: 2,
  outputAs: "object"
});
```

Output:

```json
{
  "version": "v7",
  "format": "standard",
  "output_as": "object",
  "count": 2,
  "items": [
    {
      "uuid": "uuid-1",
      "raw": "uuid-1",
      "index": 0,
      "timestamp": {
        "iso": "2026-04-09T18:12:34.567Z",
        "unix": 1712686354567
      }
    },
    {
      "uuid": "uuid-2",
      "raw": "uuid-2",
      "index": 1,
      "timestamp": {
        "iso": "2026-04-09T18:12:35.123Z",
        "unix": 1712686355123
      }
    }
  ]
}
```

### String output

```js
generateUUID({
  count: 3,
  outputAs: "string"
});
```

Output:

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

## Formats

- `standard` = default UUID format
- `compact` = removes hyphens
- `uppercase` = uppercase letters
- `uppercase-compact` = uppercase and no hyphens

---

## Output Shapes

### `outputAs: "array"`

Returns `items` as an array of formatted UUID strings.

### `outputAs: "object"`

Returns `items` as an array of objects.

Each object includes:

- `uuid` = final formatted value
- `raw` = original UUID before formatting
- `index` = zero-based position in the result set
- `timestamp` = only for v7, derived from the UUID

### `outputAs: "string"`

Returns `items` as a single comma-delimited string.

---

## Supported Versions

- `v4` = random
- `v7` = time-based, sortable, recommended

---

## Exposed Constants

```js
import {
  ALLOWED_FORMATS,
  ALLOWED_VERSIONS,
  ALLOWED_OUTPUT_AS
} from "uuid-kit";
```

---

## Behavior

- Invalid or missing `count` defaults to `1`
- Maximum `count` is `100`
- `count` is floored to a whole number
- Invalid or missing `version` defaults to `v7`
- Invalid or missing `format` defaults to `standard`
- Invalid or missing `outputAs` defaults to `array`

---

## Environment Notes

Some hosted JavaScript runtimes require you to explicitly add npm packages before use. In those environments, add:

- `uuid-kit`
- `uuid@10`

---

## License

MIT