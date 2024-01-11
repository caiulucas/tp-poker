import { Card, Deck } from "./deck";

export class Hand {
	private _cards: Card[] = [];

	private constructor(deck: Deck) {
		for (let i = 0; i < 5; i++) {
			const card = deck.draw();

			if (!card) {
				throw new Error("No more cards in deck");
			}

			this._cards.push(card);
		}
	}

	public static create(deck: Deck) {
		return new Hand(deck);
	}

	public compare(card1: Card, card2: Card) {
		return card1.rank > card2.rank;
	}

	public higherCard(): Card {
		let higherCard = this._cards[0];

		for (const card of this._cards) {
			if (this.compare(card, higherCard)) {
				higherCard = card;
			}
		}

		return higherCard;
	}

	public pairs(): Card[] {
		const pairs: Card[] = [];

		for (const card of this._cards) {
			const pair = this._cards.find((c) => c.rank === card.rank);

			if (pair) {
				pairs.push(pair);
			}
		}

		return pairs;
	}

	public get cards() {
		return this._cards;
	}
}
