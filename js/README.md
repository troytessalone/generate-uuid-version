# generate-uuid-version

Generate UUID values (v4, v7) with simple controls.

---

## Install

```bash
npm install generate-uuid-version
```

---

## Usage

```js
import { generateUUID } from "generate-uuid-version";

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
|------|------|----------|--------|------------|
| count | number | No | 1 | Number of UUIDs to generate (min 1, max 10) |
| version | string | No | v7 | UUID version: v4 or v7 |

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

---

## Supported Versions

- v4 → random  
- v7 → modern time-based (recommended)  

---

## Zapier Usage

If using in a Zapier Code step, add:

- generate-uuid-version  
- uuid@10  

---

## Behavior

- Invalid or missing `count` defaults to 1  
- Maximum `count` is 10  
- Invalid or missing `version` defaults to v7  

---

## License

MIT