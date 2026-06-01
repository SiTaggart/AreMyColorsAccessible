import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import { createSerializer } from "@emotion/jest";

expect.addSnapshotSerializer(
  createSerializer() as unknown as Parameters<typeof expect.addSnapshotSerializer>[0],
);

afterEach(() => {
  cleanup();
});
