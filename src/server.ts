import http from 'http';
import mongoose from 'mongoose';
import debug from 'debug';
import app from './app';
import type { AddressInfo } from 'net';

debug('setoalan-api:server');

function normalizePort(val: string) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error: any) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  debug(`Listening on ${bind}`);
}

mongoose.connect(process.env.DATABASE || '', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: \n'));
db.once('open', () => console.log('Connected to MongoDB'));

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  const { port: addressPort } = server.address() as AddressInfo;
  console.log(`Express running → PORT ${addressPort}`);
});
server.on('error', onError);
server.on('listening', onListening);
