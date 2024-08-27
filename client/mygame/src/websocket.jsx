const WS_URL = 'ws://localhost:3001'; 
let ws;

export function connectWebSocket(onMessage) {
  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log('WebSocket connection established');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return ws;
}

export function sendMessage(message) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}
