import { evalHand } from 'poker-evaluator';
import { Card } from './card';
import { Deck } from './deck';
import { Player } from './player';

type Action = 'fold' | 'check' | 'bet';

type PlayerState = {
	player: Player;
	isCurrentPlayer?: boolean;
	lastAction?: Action;
};
export class Poker {
	private _playerStates: PlayerState[] = [];
	private _flop: Card[] = [];
	private _pot = 0;
	private _minBet = 0;
	private _checkCount = 0;
	private _betCount = 0;

	private constructor(deck: Deck, players: Player[]) {
		for (let i = 0; i < 3; i++) {
			const card = deck.draw();

			if (!card) {
				throw new Error('No more cards in deck');
			}

			this._flop.push(card);
		}

		this._playerStates = players.map((player) => ({ player }));
		this._playerStates[0].isCurrentPlayer = true;
	}

	public static start(deck: Deck, players: Player[]) {
		return new Poker(deck, players);
	}

	public turnOrRiver(deck: Deck) {
		if (this._flop.length === 5) {
			throw new Error('The flop reached its limit');
		}

		const card = deck.draw();

		if (!card) {
			throw new Error('No more cards in deck');
		}

		this._flop.push(card);
	}

	private nextPlayer() {
		const currentPlayerIndex = this._playerStates.findIndex(
			(playerState) => playerState.isCurrentPlayer,
		);

		this._playerStates[currentPlayerIndex].isCurrentPlayer = false;
		this._playerStates[
			(currentPlayerIndex + 1) % this._playerStates.length
		].isCurrentPlayer = true;
	}

	public fold(player: Player) {
		const playerState = this._playerStates.find(
			(playerState) => playerState.player === player,
		);

		if (!playerState) {
			throw new Error('Player not found');
		}

		this._playerStates = this._playerStates.filter(
			(playerState) => playerState.player !== player,
		);

		if (this._playerStates.length === 1) {
			return this.winners();
		}

		this.nextPlayer();
	}

	public bet(player: Player, value: number, deck: Deck) {
		const playerState = this._playerStates.find(
			(playerState) => playerState.player === player,
		);

		if (!playerState) {
			throw new Error('Player not found');
		}

		if (value < this._minBet) {
			throw new Error('Player must bet at least the current bet');
		}

		const { player: updatedPlayer, bet } = player.bet(value);
		this._pot += bet;

		playerState.lastAction = 'bet';
		this._minBet = bet;
		this._betCount++;

		if (this._betCount === this._playerStates.length) {
			if (this._flop.length === 5) {
				return { player: updatedPlayer, winner: this.winners() };
			}

			this.turnOrRiver(deck);
			this._betCount = 0;
		}

		this.nextPlayer();
		return { player: updatedPlayer };
	}

	public check(player: Player, deck: Deck) {
		const playerState = this._playerStates.find(
			(playerState) => playerState.player === player,
		);

		if (!playerState) {
			throw new Error('Player not found');
		}

		playerState.lastAction = 'check';
		this._checkCount++;

		if (this._checkCount === this._playerStates.length) {
			if (this._flop.length === 5) {
				return this.winners();
			}

			this._checkCount = 0;
			this.turnOrRiver(deck);
		}

		this.nextPlayer();
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

	public get currentPlayer() {
		const playerState = this._playerStates.find(
			(playerState) => playerState.isCurrentPlayer,
		);

		if (!playerState) {
			throw new Error('No current player');
		}

		return playerState.player;
	}

	public get minBet() {
		return this._minBet;
	}
}
