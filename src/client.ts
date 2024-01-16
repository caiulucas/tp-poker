import WebSocket from 'ws';

const socket = new WebSocket('ws://localhost:3333');

socket.addEventListener('open', () => {
	console.log('Connected to the server');
});

socket.addEventListener('message', (event) => {
	console.log('Received message:', event.data);
});

socket.addEventListener('close', () => {
	console.log('Disconnected from the server');
});

socket.addEventListener('error', (error) => {
	console.error('WebSocket error:', error);
});
