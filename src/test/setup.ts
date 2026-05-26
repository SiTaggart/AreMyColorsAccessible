import { createSerializer } from '@emotion/jest';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

expect.addSnapshotSerializer(createSerializer());

afterEach(() => {
  cleanup();
});
