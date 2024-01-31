import { Deck } from './deck';
import { Hand } from './hand';
import { Poker } from './poker';

export class Player {
	private _hand: Hand;
	private _chips: number;

	private constructor(deck: Deck) {
		this._hand = Hand.create(deck);
		this._chips = 1000;
	}

	public static create(deck: Deck) {
		return new Player(deck);
	}

	public get hand() {
		return this._hand;
	}

	public get chips() {
		return this._chips;
	}

	public fold(game: Poker) {
		game.changeLastAction(this, 'fold');
	}

	public bet(value: number) {
		if (value > this._chips) {
			throw new Error('Player does not have enough chips');
		}

		this._chips -= value;
		return value;
	}
}
