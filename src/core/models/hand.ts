import { evalHand } from 'poker-evaluator';
import { Card } from './card';
import { Deck } from './deck';

export class Hand {
	private _cards: Card[] = [];

	private constructor(readonly deck: Deck) {
		for (let i = 0; i < 2; i++) {
			const card = deck.draw();

			if (!card) {
				throw new Error('No more cards in deck');
			}

			this._cards.push(card);
		}
	}

	public static create(deck: Deck) {
		return new Hand(deck);
	}

	public get cards() {
		return this._cards;
	}

	public evalHand(flop: Card[]) {
		const flopCards = flop.map((card) => card.toString());
		const handCards = this._cards.map((card) => card.toString());

		return evalHand([...flopCards, ...handCards]);
	}
}
