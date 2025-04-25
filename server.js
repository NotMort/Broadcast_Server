import WebSocket, { WebSocketServer } from 'ws';

const clients = new Set();

export default function startServer(port) {
  const wss = new WebSocketServer({ port });

  console.log(`Broadcast server on ws://localhost:${port}`);

  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Client connected');

    ws.on('message', (message) => {
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected');
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  });

  process.on('SIGINT', () => {
    console.log('\nShutting down...');
    for (const client of clients) {
      client.close();
    }
    wss.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
}
