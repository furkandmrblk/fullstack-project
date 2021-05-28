import express from 'express';

async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });
}

startServer();
