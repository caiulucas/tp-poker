import { v4 as uuidV4 } from 'uuid';
import WebSocket from 'ws';
import { Deck } from './core/models/deck';
import { Player } from './core/models/player';

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

const players: Player[] = [];
const deck = Deck.shuffle();

server.on('connection', (socket) => {
	console.log(
		'New connection at ',
		new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
	);

	sockets.push(socket);
	players.push(Player.create(uuidV4(), deck));

	socket.on('message', (msg) => {
		for (const s of sockets) {
			s.send(msg);
		}
	});

	socket.on('close', () => sockets.filter((s) => s !== socket));
});
