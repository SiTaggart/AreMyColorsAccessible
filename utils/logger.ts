import { createLogger, format, transports } from 'winston';

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: `/v1/input/${process.env.DATADOG_API_KEY}?ddsource=nodejs&service=${process.env.DATADOG_APP_NAME}`,
  ssl: true,
};

export const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [new transports.Console(), new transports.Http(httpTransportOptions)],
});
