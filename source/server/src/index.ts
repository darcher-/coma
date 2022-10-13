import { __appdata } from '@coma-lib/resources';
import cors from 'cors';
import express from 'express';
import { join } from 'path';

express()
  .use(cors())
  .use(express.static(join(__dirname, '../../app/dist')))
  .get('*', (_req: any, resources: any) =>
    resources.sendFile(join(__dirname, '../../app/dist', 'index.html')),
  )
  .listen(__appdata.port, () =>
    console.log(
      `${__appdata.title}'s server listening at http://localhost:${__appdata.port}`,
    ),
  );
