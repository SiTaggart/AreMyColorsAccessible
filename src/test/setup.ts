import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import { createSerializer } from "@emotion/jest";

expect.addSnapshotSerializer(createSerializer());

afterEach(() => {
  cleanup();
});
