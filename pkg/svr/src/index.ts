import __data from '@coma-lib/res';
import cors from 'cors';
import express from 'express';
import { join } from 'path';

express()
  .use(cors())
  .use(express.static(join(__dirname, '../../app/dist')))
  .get('*', (_req: any, res: any) =>
    res.sendFile(join(__dirname, '../../app/dist', 'index.html')),
  )
  .listen(__data.app.port, () =>
    console.log(
      `${__data.app.title}'s svr listening at http://localhost:${__data.app.port}`,
    ),
  );
