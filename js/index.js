// /index.js

import { v4 as uuidv4, v7 as uuidv7 } from "uuid";

/**
 * EXPORTED VALIDATION CONSTANTS
 */
export const ALLOWED_FORMATS = Object.freeze([
  "standard",
  "compact",
  "uppercase",
  "uppercase-compact"
]);

export const ALLOWED_VERSIONS = Object.freeze([
  "v4",
  "v7"
]);

/**
 * FORMATTERS
 */
function getFormatter(format) {
  switch (format) {
    case "compact":
      return (v) => v.replace(/-/g, "");
    case "uppercase":
      return (v) => v.toUpperCase();
    case "uppercase-compact":
      return (v) => v.replace(/-/g, "").toUpperCase();
    case "standard":
    default:
      return (v) => v;
  }
}

/**
 * Extract timestamp from UUID v7
 */
function extractTimestampV7(uuid) {
  const hex = uuid.replace(/-/g, "").slice(0, 12);
  const ms = parseInt(hex, 16);
  const date = new Date(ms);
  return {
    iso: date.toISOString(),
    unix: ms
  };
}

/**
 * VERSION CONFIG (extensible + frozen)
 */
const VERSION_CONFIG = Object.freeze({
  v4: {
    generator: uuidv4,
    features: {}
  },
  v7: {
    generator: uuidv7,
    features: {
      hasTimestamp: true,
      extractTimestamp: extractTimestampV7
    }
  }
});

/**
 * Generate UUID values
 */
export function generateUUID({
  count = 1,
  version = "v7",
  format = "standard",
  prefix = "",
  suffix = "",
  asObjects = false
} = {}) {
  // ===============================
  // VALIDATE COUNT
  // ===============================
  let safeCount = Number(count);
  if (Number.isNaN(safeCount) || safeCount < 0) safeCount = 1;
  if (safeCount > 100) safeCount = 100;
  safeCount = Math.floor(safeCount);

  // ===============================
  // VALIDATE VERSION
  // ===============================
  const normalizedVersion = String(version).toLowerCase();
  const finalVersion = ALLOWED_VERSIONS.includes(normalizedVersion)
    ? normalizedVersion
    : "v7";

  const { generator, features } = VERSION_CONFIG[finalVersion];

  // ===============================
  // VALIDATE FORMAT
  // ===============================
  const normalizedFormat = String(format).toLowerCase();
  const finalFormat = ALLOWED_FORMATS.includes(normalizedFormat)
    ? normalizedFormat
    : "standard";

  // Precompute formatter
  const formatter = getFormatter(finalFormat);

  // ===============================
  // GENERATE
  // ===============================
  const items = [];

  for (let i = 0; i < safeCount; i++) {
    const raw = generator();

    // extract timestamp BEFORE mutations
    const timestamp =
      features?.hasTimestamp && features.extractTimestamp
        ? features.extractTimestamp(raw)
        : undefined;

    // format
    let value = formatter(raw);

    // prefix / suffix
    if (prefix) value = prefix + value;
    if (suffix) value = value + suffix;

    if (asObjects) {
      const obj = {
        uuid: value,
        raw,
        index: i
      };

      if (timestamp) {
        obj.timestamp = timestamp;
      }

      items.push(obj);
    } else {
      items.push(value);
    }
  }

  return {
    version: finalVersion,
    count: safeCount,
    format: finalFormat,
    items
  };
}

export default generateUUID;