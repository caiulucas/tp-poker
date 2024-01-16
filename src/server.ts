import WebSocket from 'ws';

const server = new WebSocket.Server(
	{
		host: 'localhost',
		port: 3333,
	},
	() => {
		console.log('Server is listening on port 3333');
	},
);

const sockets: WebSocket[] = [];

server.on('connection', (socket) => {
	console.log(
		'New connection at ',
		new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
	);

	sockets.push(socket);

	socket.on('message', (msg) => {
		for (const s of sockets) {
			s.send(msg);
		}
	});

	socket.on('close', () => sockets.filter((s) => s !== socket));
});
