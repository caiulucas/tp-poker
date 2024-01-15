import { Card, Rank } from './card';
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

	public isHigherCard(flop: Card[]): Card {
		const cards = [...flop, ...this._cards];
		let higherCard = cards[0];

		for (const card of cards) {
			if (card.isRankHigherThan(higherCard)) {
				higherCard = card;
			}
		}

		return higherCard;
	}

	private getPairs(cards: Card[]): Card[][] {
		const pairs: Card[][] = [];
		let filteredCards = [...cards];

		for (const card of cards) {
			const pair = filteredCards.filter((c) => c.isRankEqual(card));

			if (pair.length === 2) {
				pairs.push(pair);
				filteredCards = filteredCards.filter((c) => !c.isRankEqual(card));
			}
		}

		return pairs;
	}

	public isPair(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards];

		const pairs = this.getPairs(cards);
		return pairs.length === 1;
	}

	public isTwoPairs(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards];

		const pairs = this.getPairs(cards);
		return pairs.length === 2;
	}

	private getThreeOfAKind(cards: Card[]): Card[][] {
		const threeOfAKind: Card[][] = [];
		let filteredCards = [...cards];

		for (const card of cards) {
			const aux = filteredCards.filter((c) => c.isRankEqual(card));

			if (aux.length === 3) {
				threeOfAKind.push(aux);
				filteredCards = filteredCards.filter((c) => !c.isRankEqual(card));
			}
		}

		return threeOfAKind;
	}

	public isThreeOfAKind(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards];

		const threeOfAKind = this.getThreeOfAKind(cards);
		return threeOfAKind.length > 0;
	}

	private getStraight(cards: Card[]): Card[] {
		let _cards = cards.sort((a, b) => a.rank - b.rank);
		let straight = [];

		for (let i = 0; i < 4; i++) {
			if (cards[i].rank + 1 === cards[i + 1].rank) {
				straight.push(cards[i]);
			}
		}

		if (straight.length !== 4) {
			straight = [];
		} else {
			straight.push(cards[4]);
		}

		_cards = cards.sort((a, b) => b.rank - a.rank);

		for (let i = 0; i < 4; i++) {
			if (cards[i].rank - 1 === cards[i + 1].rank) {
				straight.push(cards[i]);
			}
		}

		if (straight.length !== 4) {
			straight = [];
		} else {
			straight.push(cards[4]);
		}

		return straight.sort((a, b) => a.rank - b.rank);
	}

	public isStraight(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards];
		return this.getStraight(cards).length === 5;
	}

	private verifyFlush(cards: Card[]): boolean {
		const _cards = cards.sort((a, b) => a.suit - b.suit);

		for (let i = 0; i < 4; i++) {
			let cardsWithSameSuit = 0;

			for (const card of _cards) {
				if (card.suit === i) {
					cardsWithSameSuit++;
				}
			}

			if (cardsWithSameSuit >= 5) {
				return true;
			}
		}

		return false;
	}

	public isFlush(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards];
		return this.verifyFlush(cards);
	}

	public isFourOfAKind(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards];

		for (const card of cards) {
			const aux = cards.filter((c) => c.isRankEqual(card));

			if (aux.length === 4) {
				return true;
			}
		}

		return false;
	}

	public isFullHouse(flop: Card[]): boolean {
		const threeOfAKind = this.getThreeOfAKind([...flop, ...this._cards]);

		if (threeOfAKind.length === 2) {
			return true;
		}

		const cards = [...flop, ...this._cards];

		for (const item of threeOfAKind) {
			for (const card of item) {
				cards.splice(cards.indexOf(card), 1);
			}
		}

		const pairs = this.getPairs(cards);

		return pairs.length > 0 && threeOfAKind.length > 0;
	}

	public isStraightFlush(flop: Card[]): boolean {
		const straight = this.getStraight([...flop, ...this._cards]);
		return straight.length === 5 && this.verifyFlush(straight);
	}

	public isRoyalFlush(flop: Card[]): boolean {
		const cards = [...flop, ...this._cards];
		const straight = this.getStraight(cards);

		console.log(straight);

		return (
			this.isStraightFlush(flop) &&
			straight[0].rank === Rank.Ten &&
			straight[1].rank === Rank.Jack
		);
	}

	public get cards() {
		return this._cards;
	}
}
