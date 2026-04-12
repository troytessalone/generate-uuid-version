// /index.d.ts

export type UUIDVersion = "v4" | "v7";

export type UUIDFormat =
  | "standard"
  | "compact"
  | "uppercase"
  | "uppercase-compact";

export type UUIDOutputAs = "array" | "object" | "string";

export interface UUIDTimestamp {
  iso: string;
  unix: number;
}

export interface GenerateUUIDOptions {
  count?: number;
  version?: UUIDVersion;
  format?: UUIDFormat;
  prefix?: string;
  suffix?: string;
  outputAs?: UUIDOutputAs;
}

export interface UUIDObject {
  uuid: string;
  raw: string;
  index: number;
  /**
   * Only present when:
   * - version = "v7"
   * - outputAs = "object"
   */
  timestamp?: UUIDTimestamp;
}

export interface GenerateUUIDResultBase {
  version: UUIDVersion;
  format: UUIDFormat;
  output_as: UUIDOutputAs;
  count: number;
}

export interface GenerateUUIDResultArray extends GenerateUUIDResultBase {
  output_as: "array";
  items: string[];
}

export interface GenerateUUIDResultObjects extends GenerateUUIDResultBase {
  output_as: "object";
  items: UUIDObject[];
}

export interface GenerateUUIDResultString extends GenerateUUIDResultBase {
  output_as: "string";
  items: string;
}

export type GenerateUUIDResult =
  | GenerateUUIDResultArray
  | GenerateUUIDResultObjects
  | GenerateUUIDResultString;

/**
 * Overloads for precise return typing
 */
export declare function generateUUID(
  options?: GenerateUUIDOptions & { outputAs?: "array" }
): GenerateUUIDResultArray;

export declare function generateUUID(
  options: GenerateUUIDOptions & { outputAs: "object" }
): GenerateUUIDResultObjects;

export declare function generateUUID(
  options: GenerateUUIDOptions & { outputAs: "string" }
): GenerateUUIDResultString;

/**
 * Fallback signature (covers dynamic cases)
 */
export declare function generateUUID(
  options?: GenerateUUIDOptions
): GenerateUUIDResult;

export declare const ALLOWED_FORMATS: readonly [
  "standard",
  "compact",
  "uppercase",
  "uppercase-compact"
];

export declare const ALLOWED_VERSIONS: readonly [
  "v4",
  "v7"
];

export declare const ALLOWED_OUTPUT_AS: readonly [
  "array",
  "object",
  "string"
];

export default generateUUID;