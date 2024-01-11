import { Card, Deck, Rank } from './deck';

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

	public higherCard(flop: Card[]): Card {
		const cards = [...flop, ...this._cards];
		let higherCard = cards[0];

		for (const card of cards) {
			if (Deck.compareRank(card, higherCard)) {
				higherCard = card;
			}
		}

		return higherCard;
	}

	public isPair(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards];

		for (const card of cards) {
			const pair = cards.find((c) => c.rank === card.rank);

			if (pair) {
				return true;
			}
		}

		return false;
	}

	public isTwoPairs(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards];
		let pairs = 0;

		for (const card of cards) {
			const pair = cards.find((c) => c.rank === card.rank);

			if (pair) {
				pairs++;
			}
		}

		return pairs === 2;
	}

	public isThreeOfAKind(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards];

		for (const card of cards) {
			const aux = cards.filter((c) => c.rank === card.rank);

			if (aux.length === 3) {
				return true;
			}
		}

		return false;
	}

	public isStraight(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards].sort((a, b) => a.rank - b.rank);

		for (let i = 0; i < cards.length - 1; i++) {
			if (cards[i].rank + 1 !== cards[i + 1].rank) {
				return false;
			}
		}

		return true;
	}

	public isFlush(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards].sort((a, b) => a.suit - b.suit);

		for (let i = 0; i < cards.length - 1; i++) {
			if (cards[i].suit !== cards[i + 1].suit) {
				return false;
			}
		}

		return true;
	}

	public isFourOfAKind(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards];

		for (const card of cards) {
			const aux = cards.filter((c) => c.rank === card.rank);

			if (aux.length === 4) {
				return true;
			}
		}

		return false;
	}

	public isFullHouse(flop: Card[]): boolean {
		return this.isPair(flop) && this.isThreeOfAKind(flop);
	}

	public isStraightFlush(flop: Card[]): boolean {
		return this.isStraight(flop) && this.isFlush(flop);
	}

	public isRoyalFlush(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards].sort((a, b) => a.rank - b.rank);

		return (
			this.isStraightFlush(flop) &&
			cards[0].rank === Rank.Ten &&
			cards[4].rank === Rank.Ace
		);
	}

	public get cards() {
		return this._cards;
	}
}
