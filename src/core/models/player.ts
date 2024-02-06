import { Deck } from './deck';
import { Hand } from './hand';

export class Player {
	private _id: string;
	private _hand: Hand;
	private _chips: number;

	private constructor(id: string, deck: Deck) {
		this._id = id;
		this._hand = Hand.create(deck);
		this._chips = 1000;
	}

	public static create(id: string, deck: Deck) {
		return new Player(id, deck);
	}

	public changeHand(deck: Deck) {
		this._hand = Hand.create(deck);
	}

	public get id() {
		return this._id;
	}

	public get hand() {
		return this._hand;
	}

	public get chips() {
		return this._chips;
	}

	public bet(value: number) {
		if (value > this._chips) {
			throw new Error('Player does not have enough chips');
		}

		this._chips -= value;
		return { player: this, bet: value };
	}
}
