#!/usr/bin/env node
import { Command } from 'commander';
import startServer from './server.js';
import startClient from './client.js';

const program = new Command();

program
  .command('start')
  .description('Start the broadcast server')
  .option('-p, --port <port>', 'Port to listen on', '3000')
  .action((options) => {
    startServer(Number(options.port));
  });

program
  .command('connect')
  .description('Connect as a client to the server')
  .option('-h, --host <host>', 'Server host', 'localhost')
  .option('-p, --port <port>', 'Server port', '3000')
  .action((options) => {
    startClient(options.host, Number(options.port));
  });

program.parse(process.argv);
