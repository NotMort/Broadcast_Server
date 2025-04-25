import WebSocket from 'ws';
import readline from 'readline';

export default function startClient(host, port) {
  const ws = new WebSocket(`ws://${host}:${port}`);

  ws.on('open', () => {
    console.log(`Connected to ws://${host}:${port}`);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on('line', (input) => {
      ws.send(input);
    });
  });

  ws.on('message', (data) => {
    console.log(`${data}`);
  });

  ws.on('close', () => {
    console.log('Disconnected from server');
    process.exit(0);
  });

  ws.on('error', (err) => {
    console.error('Connection error:', err.message);
    process.exit(1);
  });
}
