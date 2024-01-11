import { Card, Deck } from "./deck";
import { Hand } from "./hand";

export class Player {
	private _hand: Hand;

	private constructor(deck: Deck) {
		this._hand = Hand.create(deck);
	}

	public static create(deck: Deck) {
		return new Player(deck);
	}

	public get hand() {
		return this._hand;
	}
}
