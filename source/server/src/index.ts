import { __appdata } from '@coma/resources';
import cors from 'cors';
import express from 'express';
import { join } from 'path';

const PORT = 3000;

const app = express();
app.use(cors());

// Serve static resources from the "public" folder (ex: when there are images to display)
app.use(express.static(join(__dirname, '../../app/dist')));

// Serve the HTML page
app.get('*', (req: any, resources: any) => {
  resources.sendFile(join(__dirname, '../../app/dist', 'index.html'));
});

app.listen(__appdata.port, () => {
  console.log(`${__appdata.title}'s server listening at http://localhost:${__appdata.port}`);
});