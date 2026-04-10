// /index.js

import { v4 as uuidv4, v7 as uuidv7 } from "uuid";

/**
 * Allowed UUID output formats
 */
export const ALLOWED_FORMATS = Object.freeze([
  "standard",
  "compact",
  "uppercase",
  "uppercase-compact"
]);

/**
 * Allowed UUID versions
 */
export const ALLOWED_VERSIONS = Object.freeze([
  "v4",
  "v7"
]);

/**
 * Allowed output shapes
 *
 * array:
 * - returns items as an array of UUID strings
 *
 * object:
 * - returns items as an array of objects
 * - each object includes uuid, raw, index
 * - v7 also includes timestamp
 *
 * string:
 * - returns items as a single comma-delimited string
 */
export const ALLOWED_OUTPUT_AS = Object.freeze([
  "array",
  "object",
  "string"
]);

/**
 * Return formatter function based on requested UUID format
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
 * Version configuration
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
  outputAs = "array"
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
  // VALIDATE UUID FORMAT
  // ===============================
  const normalizedFormat = String(format).toLowerCase();
  const finalFormat = ALLOWED_FORMATS.includes(normalizedFormat)
    ? normalizedFormat
    : "standard";

  // ===============================
  // VALIDATE OUTPUT SHAPE
  // ===============================
  const normalizedOutputAs = String(outputAs).toLowerCase();
  const finalOutputAs = ALLOWED_OUTPUT_AS.includes(normalizedOutputAs)
    ? normalizedOutputAs
    : "array";

  // Precompute formatter
  const formatter = getFormatter(finalFormat);

  // ===============================
  // GENERATE
  // ===============================
  const values = [];
  const objects = [];

  for (let i = 0; i < safeCount; i++) {
    const raw = generator();

    // Extract timestamp before formatting mutations
    const timestamp =
      features?.hasTimestamp && features.extractTimestamp
        ? features.extractTimestamp(raw)
        : undefined;

    let value = formatter(raw);

    // Apply prefix / suffix
    if (prefix) value = prefix + value;
    if (suffix) value = value + suffix;

    values.push(value);

    const obj = {
      uuid: value,
      raw,
      index: i
    };

    if (timestamp) {
      obj.timestamp = timestamp;
    }

    objects.push(obj);
  }

  // ===============================
  // SHAPE OUTPUT
  // ===============================
  let items;

  if (finalOutputAs === "object") {
    items = objects;
  } else if (finalOutputAs === "string") {
    items = values.join(",");
  } else {
    items = values;
  }

  return {
    version: finalVersion,
    format: finalFormat,
    output_as: finalOutputAs,
    count: safeCount,
    items
  };
}

export default generateUUID;