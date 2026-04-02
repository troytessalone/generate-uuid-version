// /index.js

import { v4 as uuidv4, v7 as uuidv7 } from "uuid";

/**
 * Generate UUID values
 * @param {Object} options
 * @param {number} options.count - number of UUIDs (min 1, max 10)
 * @param {string} options.version - "v4" or "v7"
 * @returns {Object}
 */
export function generateUUID({
  count = 1,
  version = "v7"
} = {}) {
  // ===============================
  // VALIDATE COUNT
  // ===============================
  let safeCount = Number(count);
  if (isNaN(safeCount) || safeCount < 1) safeCount = 1;
  if (safeCount > 10) safeCount = 10;

  // ===============================
  // NORMALIZE VERSION
  // ===============================
  const normalizedVersion = String(version || "v7").toLowerCase();
  const finalVersion = normalizedVersion === "v4" ? "v4" : "v7";

  // ===============================
  // GENERATOR MAP
  // ===============================
  const generators = {
    v4: () => uuidv4(),
    v7: () => uuidv7()
  };

  const generator = generators[finalVersion];

  // ===============================
  // GENERATE
  // ===============================
  const list = [];

  for (let i = 0; i < safeCount; i++) {
    list.push(generator());
  }

  return {
    count: safeCount,
    version: finalVersion,
    items: {
      first: list[0] || null,
      last: list[list.length - 1] || null
    },
    list
  };
}