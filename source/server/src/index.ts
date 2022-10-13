import { __appdata } from '@coma-lib/resources';
import cors from 'cors';
import express from 'express';
import { join } from 'path';

const app = express();

app.use(cors());
app.use(express.static(join(__dirname, '../../app/dist')));

app.get('*', (req: any, resources: any) => {
  resources.sendFile(join(__dirname, '../../app/dist', 'index.html'));
});

app.listen(__appdata.port, () => {
  console.log(`${__appdata.title}'s server listening at http://localhost:${__appdata.port}`);
});