type LogFields = Record<string, unknown>;

const log = (level: "info" | "error", message: string, fields?: LogFields): void => {
  const payload = fields ? { message, ...fields } : { message };
  console[level](JSON.stringify(payload));
};

export const logger = {
  error: (message: string, fields?: LogFields): void => log("error", message, fields),
  info: (message: string, fields?: LogFields): void => log("info", message, fields),
};
