// /index.d.ts

export type UUIDVersion = "v4" | "v7";

export type UUIDFormat =
  | "standard"
  | "compact"
  | "uppercase"
  | "uppercase-compact";

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
  asObjects?: boolean;
}

export interface UUIDObject {
  uuid: string;
  raw: string;
  index: number;
  timestamp?: UUIDTimestamp;
}

export interface GenerateUUIDResultStrings {
  version: UUIDVersion;
  count: number;
  format: UUIDFormat;
  items: string[];
}

export interface GenerateUUIDResultObjects {
  version: UUIDVersion;
  count: number;
  format: UUIDFormat;
  items: UUIDObject[];
}

export declare function generateUUID(
  options?: GenerateUUIDOptions & { asObjects?: false }
): GenerateUUIDResultStrings;

export declare function generateUUID(
  options: GenerateUUIDOptions & { asObjects: true }
): GenerateUUIDResultObjects;

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

export default generateUUID;