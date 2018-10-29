import * as express from 'express';
import next from 'next';
import compression from 'compression';

const port: number = parseInt(process.env.PORT!, 10) || 3000;
const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server: express.Application = express();
  server.use(compression());

  server.get('/about', (req, res) => {
    return app.render(req, res, '/about', req.query);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
