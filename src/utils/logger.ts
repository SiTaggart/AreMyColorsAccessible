type LogLevel = 'info' | 'error';
type LogMeta = Record<string, unknown>;

const DATADOG_INTAKE = 'https://http-intake.logs.datadoghq.com/api/v2/logs';

const readEnv = (key: string): string | undefined =>
  typeof process !== 'undefined' ? process.env[key] : undefined;

// Fire-and-forget shipping to Datadog. winston's HTTP transport relied on Node
// streams and cannot run on Cloudflare Workers, so we POST directly with fetch.
// No key configured -> silently no-op; failures never propagate to the request.
const shipToDatadog = (level: LogLevel, message: string, meta: LogMeta): void => {
  const apiKey = readEnv('DATADOG_API_KEY');
  if (!apiKey) {
    return;
  }

  const appName = readEnv('DATADOG_APP_NAME') ?? 'aremycolorsaccessible';
  const context = readEnv('NETLIFY_CONTEXT') ?? readEnv('CF_ENV') ?? 'production';

  void fetch(DATADOG_INTAKE, {
    body: JSON.stringify([
      {
        ddsource: 'cloudflare-workers',
        level,
        message,
        service: `${appName}_${context}`,
        ...meta,
      },
    ]),
    headers: {
      'Content-Type': 'application/json',
      'DD-API-KEY': apiKey,
    },
    method: 'POST',
  }).catch(() => {
    /* logging must never break the request */
  });
};

const log = (level: LogLevel, message: string, meta: LogMeta = {}): void => {
  const line = JSON.stringify({ level, message, ...meta });
  if (level === 'error') {
    console.error(line);
  } else {
    console.info(line);
  }
  shipToDatadog(level, message, meta);
};

export const logger = {
  error: (message: string, meta?: LogMeta): void => log('error', message, meta),
  info: (message: string, meta?: LogMeta): void => log('info', message, meta),
};
