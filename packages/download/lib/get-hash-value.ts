import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";

export function getHashValue(value: string) {
  const hashValue = createHash("sha256").update(value).digest("hex");

  return hashValue;
}

export function getHashValueFromArrayBuffer(value: ArrayBuffer) {
  const hashValue = createHash("sha256").update(Buffer.from(value)).digest("hex");

  return hashValue.substring(0, 20);
}

