import { Card, Deck } from './deck';

export class Poker {
	private flop: Card[] = [];

	private constructor(deck: Deck) {
		for (let i = 0; i < 3; i++) {
			const card = deck.draw();

			if (!card) {
				throw new Error('No more cards in deck');
			}

			this.flop.push(card);
		}
	}

	public static start(deck: Deck) {
		return new Poker(deck);
	}

	public turnOrRiver(deck: Deck): Card {
		const card = deck.draw();

		if (!card) {
			throw new Error('No more cards in deck');
		}

		return card;
	}
}
