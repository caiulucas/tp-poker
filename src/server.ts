import { v4 as uuidV4 } from 'uuid';
import WebSocket from 'ws';
import { Deck } from './core/models/deck';
import { Player } from './core/models/player';
import { Poker } from './core/models/poker';

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
let poker: Poker;

const players: Player[] = [];
const deck = Deck.shuffle();

server.on('connection', (socket) => {
	sockets.push(socket);
	const player = Player.create(uuidV4(), deck);
	players.push(player);

	console.log(`Player ${player.id} connected`);

	const formattedPlayer = {
		id: player.id,
		hand: player.hand.cards.map((card) => card.toString()),
		chips: player.chips,
	};
	const formattedPlayers = players.map((player) => {
		return {
			id: player.id,
			hand: player.hand,
		};
	});

	socket.send(
		JSON.stringify({
			type: 'add-player',
			players: formattedPlayers,
			player: formattedPlayer,
			hasStarted: false,
		}),
	);

	for (const s of sockets) {
		s.send(
			JSON.stringify({
				type: 'update-players',
				players: formattedPlayers,
				hasStarted: false,
			}),
		);
	}

	socket.on('message', (msg) => {
		const data = JSON.parse(msg.toString());

		switch (data.type) {
			case 'start-game':
				poker = Poker.start(deck, players);

				for (const s of sockets) {
					s.send(
						JSON.stringify({
							type: 'start-game',
							players: formattedPlayers,
							currentPlayer: poker.currentPlayer,
							hasStarted: true,
							minBet: poker.minBet,
							flop: poker.flop.map((card) => card.toString()),
						}),
					);
				}
				break;

			case 'check': {
				const player = players.find((p) => p.id === data.playerId);

				if (!player) {
					return;
				}

				const winner = poker.check(player, deck);

				if (winner) {
					for (const s of sockets) {
						s.send(
							JSON.stringify({
								type: 'winner',
								winner,
							}),
						);
					}
				} else {
					for (const s of sockets) {
						s.send(
							JSON.stringify({
								type: 'check',
								players: formattedPlayers,
								currentPlayer: poker.currentPlayer,
								minBet: poker.minBet,
								flop: poker.flop.map((card) => card.toString()),
							}),
						);
					}
				}
				break;
			}

			case 'fold': {
				const player = players.find((p) => p.id === data.playerId);

				if (!player) {
					return;
				}

				const winner = poker.fold(player);

				if (winner) {
					for (const s of sockets) {
						s.send(
							JSON.stringify({
								type: 'winner',
								winner,
							}),
						);
					}
				} else {
					for (const s of sockets) {
						s.send(
							JSON.stringify({
								type: 'fold',
								players: formattedPlayers,
								currentPlayer: poker.currentPlayer,
								minBet: poker.minBet,
								flop: poker.flop.map((card) => card.toString()),
							}),
						);
					}
				}
				break;
			}

			case 'bet': {
				const player = players.find((p) => p.id === data.playerId);

				if (!player) {
					return;
				}

				const { player: updatedPlayer, winner } = poker.bet(
					player,
					data.value,
					deck,
				);

				if (winner) {
					for (const s of sockets) {
						s.send(
							JSON.stringify({
								type: 'winner',
								winner,
							}),
						);
					}
				} else {
					for (const s of sockets) {
						s.send(
							JSON.stringify({
								type: 'bet',
								player: {
									id: updatedPlayer.id,
									chips: updatedPlayer.chips,
									hand: updatedPlayer.hand.cards.map((card) => card.toString()),
								},
								pot: poker.pot,
								players: formattedPlayers,
								currentPlayer: poker.currentPlayer,
								minBet: poker.minBet,
								flop: poker.flop.map((card) => card.toString()),
							}),
						);
					}
				}
				break;
			}

			default:
				for (const s of sockets) {
					s.send(msg);
				}
		}
	});

	socket.on('close', () => {
		players.splice(players.indexOf(player), 1);
		console.log(`Player ${player.id} disconnected`);
		sockets.filter((s) => s !== socket);

		for (const s of sockets) {
			s.send(
				JSON.stringify({
					type: 'remove-player',
					player: player.id,
					players: players.map((player) => {
						return {
							id: player.id,
							hand: player.hand,
						};
					}),
				}),
			);
		}
	});
});
