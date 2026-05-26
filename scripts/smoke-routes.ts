import { spawn, type ChildProcess } from 'node:child_process';

const host = '127.0.0.1';
const port = 4173;
const baseUrl = `http://${host}:${port}`;

interface HtmlRoute {
  expectedStatus?: number;
  expectedText: string;
  expectedTitle?: string;
  path: string;
}

const htmlRoutes: Array<HtmlRoute> = [
  {
    expectedText: 'Are My Colours Accessible',
    expectedTitle: 'Are My Colours Accessible',
    path: '/',
  },
  {
    expectedText: 'Add the colours from your palette',
    expectedTitle: 'Palette checker - Are My Colours Accessible',
    path: '/palette',
  },
  { expectedText: 'Are My Colours Accessible API', path: '/api-page' },
  { expectedText: 'Are my Colours Accessible?', path: '/about' },
  { expectedStatus: 404, expectedText: 'Page not found', path: '/not-a-real-route' },
];

const startPreview = (): ChildProcess => {
  const server = spawn('bun', ['run', 'preview', '--', '--host', host, '--port', String(port)], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  server.stdout.on('data', (chunk: Buffer): void => {
    process.stdout.write(chunk);
  });

  server.stderr.on('data', (chunk: Buffer): void => {
    process.stderr.write(chunk);
  });

  return server;
};

const waitForServer = async (): Promise<void> => {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 20_000) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until preview is ready.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for ${baseUrl}`);
};

const assertHtmlRoute = async ({
  expectedStatus = 200,
  expectedText,
  expectedTitle,
  path,
}: HtmlRoute): Promise<void> => {
  const response = await fetch(`${baseUrl}${path}`);
  const html = await response.text();

  if (response.status !== expectedStatus) {
    throw new Error(`${path} returned ${response.status}; expected ${expectedStatus}`);
  }

  if (!html.includes(expectedText)) {
    throw new Error(`${path} did not include expected text: ${expectedText}`);
  }

  if (expectedTitle && !html.includes(`<title>${expectedTitle}</title>`)) {
    throw new Error(`${path} did not include expected title: ${expectedTitle}`);
  }
};

const assertAreTheyApi = async (): Promise<void> => {
  const preflight = await fetch(`${baseUrl}/api/are-they`, { method: 'OPTIONS' });
  if (preflight.status !== 204 || preflight.headers.get('access-control-allow-origin') !== '*') {
    throw new Error('/api/are-they CORS preflight contract failed');
  }

  const response = await fetch(`${baseUrl}/api/are-they`, {
    body: JSON.stringify({ colors: ['#fff', '#000'] }),
    method: 'POST',
  });
  const json = (await response.json()) as { contrast?: unknown; overall?: unknown };

  if (response.status !== 200 || json.overall !== 'Yup' || json.contrast !== '21: 1') {
    throw new Error(`/api/are-they returned unexpected payload: ${JSON.stringify(json)}`);
  }
};

const assertSlashCommandApi = async (): Promise<void> => {
  const response = await fetch(`${baseUrl}/api/slash-command`, {
    body: new URLSearchParams({ text: 'help' }),
    method: 'POST',
  });
  const json = (await response.json()) as { blocks?: unknown };

  if (response.status !== 200 || !Array.isArray(json.blocks)) {
    throw new Error(`/api/slash-command returned unexpected payload: ${JSON.stringify(json)}`);
  }
};

const run = async (): Promise<void> => {
  const server = startPreview();

  try {
    await waitForServer();

    for (const route of htmlRoutes) {
      await assertHtmlRoute(route);
      console.log(`ok ${route.path}`);
    }

    await assertAreTheyApi();
    console.log('ok /api/are-they');

    await assertSlashCommandApi();
    console.log('ok /api/slash-command');
  } finally {
    server.kill('SIGTERM');
  }
};

await run();
