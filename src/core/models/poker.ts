import { evalHand } from 'poker-evaluator';
import { Card } from './card';
import { Deck } from './deck';
import { Player } from './player';

type Action = 'fold' | 'check' | 'call' | 'raise';

type PlayerState = {
	player: Player;
	lastAction?: Action;
	lastBet?: number;
};
export class Poker {
	private _playerStates: PlayerState[] = [];
	private _flop: Card[] = [];
	private _pot = 0;

	private constructor(deck: Deck, players: Player[]) {
		for (let i = 0; i < 3; i++) {
			const card = deck.draw();

			if (!card) {
				throw new Error('No more cards in deck');
			}

			this._flop.push(card);
		}

		this._playerStates = players.map((player) => ({ player }));
	}

	public static start(deck: Deck, players: Player[]) {
		return new Poker(deck, players);
	}

	public turnOrRiver(deck: Deck): Card {
		if (this._flop.length === 5) {
			throw new Error('The flop reached its limit');
		}

		const card = deck.draw();

		if (!card) {
			throw new Error('No more cards in deck');
		}

		return card;
	}

	public fold(player: Player) {
		const playerState = this._playerStates.find(
			(playerState) => playerState.player === player,
		);

		if (!playerState) {
			throw new Error('Player not found');
		}

		if (playerState.lastAction === 'fold') {
			throw new Error('Player already folded');
		}

		playerState.lastAction = 'fold';
	}

	public call(player: Player, value: number) {
		const playerState = this._playerStates.find(
			(playerState) => playerState.player === player,
		);

		if (!playerState) {
			throw new Error('Player not found');
		}

		if (playerState.lastAction === 'fold') {
			throw new Error('Player already folded');
		}

		const bet = player.bet(value);
		this._pot += bet;

		playerState.lastAction = 'call';
		playerState.lastBet = bet;
	}

	public raise(player: Player, value: number) {
		const playerStateIndex =
			this._playerStates.findIndex(
				(playerState) => playerState.player === player,
			) -
			(1 % this._playerStates.length);

		const lastPlayerState = this._playerStates[playerStateIndex];
		const playerState = this._playerStates.find(
			(playerState) => playerState.player === player,
		);

		if (!lastPlayerState || !playerState) {
			throw new Error('Player not found');
		}

		if (playerState.lastAction === 'fold') {
			throw new Error('Player already folded');
		}

		if (lastPlayerState.lastBet === undefined) {
			throw new Error('Player did not bet yet');
		}

		if (lastPlayerState.lastBet >= value) {
			throw new Error('Player must raise the bet');
		}

		const bet = player.bet(value);
		this._pot += bet;

		playerState.lastAction = 'raise';
		playerState.lastBet = bet;
	}

	public check(player: Player) {
		const playerState = this._playerStates.find(
			(playerState) => playerState.player === player,
		);

		if (!playerState) {
			throw new Error('Player not found');
		}

		if (playerState.lastAction === 'fold') {
			throw new Error('Player already folded');
		}

		playerState.lastAction = 'check';
	}

	public winners() {
		const playersInGame = this._playerStates.filter(
			(playerState) => playerState.lastAction !== 'fold',
		);

		let higherValue = 0;
		let winner: Player | null = null;
		let type = '';

		for (const player of playersInGame) {
			const formattedFlop = this._flop.map((card) => card.toString());
			const formattedHand = player.player.hand.cards.map((card) =>
				card.toString(),
			);

			const evaluatedHand = evalHand([...formattedFlop, ...formattedHand]);

			if (evaluatedHand.value > higherValue) {
				higherValue = evaluatedHand.value;
				winner = player.player;
				type = evaluatedHand.handName;
			}
		}

		return { winner, pot: this._pot, type };
	}

	public get flop() {
		return this._flop;
	}

	public get pot() {
		return this._pot;
	}
}
