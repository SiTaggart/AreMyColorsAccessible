import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { initMiddleware } from '../../utils/init-middleware';
import { logger } from '../../utils/logger';
import { prisma } from '../../utils/db-client';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const SLACK_OAUTH_URL = 'https://slack.com/api/oauth.v2.access';

const slackErrorResponse = (res: NextApiResponse, error: string | string[]): void => {
  logger.error(`slack oauth: ${error}`);
  res.redirect('/slack-app?error=true');
};

const envVariableErrorResponse = (res: NextApiResponse): void => {
  logger.error(
    'slack oauth: no environment variables. Please set SLACK_CLIENT_ID or SLACK_CLIENT_SECRET environment variables'
  );
  res.redirect('/slack-app?error=true');
};

const codeErrorResponse = (res: NextApiResponse): void => {
  logger.error('slack oauth: return code bad');
  res.redirect('/slack-app?error=true');
};

const successResponse = (res: NextApiResponse): void => {
  res.redirect('/slack-app?success=true');
};
// eslint-disable-next-line import/no-default-export
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await cors(req, res);
  const { code, error } = req.query;

  if (error !== undefined) {
    return slackErrorResponse(res, error);
  }

  if (process.env.SLACK_CLIENT_ID === undefined || process.env.SLACK_CLIENT_SECRET === undefined) {
    return envVariableErrorResponse(res);
  }

  if (typeof code !== 'string') {
    return codeErrorResponse(res);
  }

  const oauthRequestBody = new URLSearchParams({
    code,
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
  });

  const oauthResponse = await fetch(SLACK_OAUTH_URL, {
    method: 'POST',
    body: oauthRequestBody,
  })
    .then((response) => response.json())
    .then((json) => json);

  const { team, enterprise } = oauthResponse;

  logger.info('installed to', { team, enterprise });

  const result = await prisma.installation.upsert({
    where: { id: team.id },
    update: {
      team_name: team.name,
      enterprise_id: enterprise !== null ? enterprise.id : undefined,
      enterprise_name: enterprise !== null ? enterprise.name : undefined,
      install_date: new Date().toISOString(),
    },
    create: {
      id: team.id,
      team_name: team.name,
      enterprise_id: enterprise !== null ? enterprise.id : undefined,
      enterprise_name: enterprise !== null ? enterprise.name : undefined,
    },
  });

  logger.info('db response', result);

  return successResponse(res);
}
