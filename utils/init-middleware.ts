import type { NextApiRequest, NextApiResponse } from 'next';
// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export const initMiddleware = (middleware: any) => (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
