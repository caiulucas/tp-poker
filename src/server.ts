import WebSocket from 'ws';

const server = new WebSocket.Server({
	port: 3333,
});

const sockets: WebSocket[] = [];

server.on('connection', (socket) => {
	sockets.push(socket);

	socket.on('message', (msg) => {
		for (const s of sockets) {
			s.send(msg);
		}
	});

	socket.on('close', () => sockets.filter((s) => s !== socket));
});
