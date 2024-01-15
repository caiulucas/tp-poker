import { Card, Rank, Suit } from './card';

export class Deck {
	private _cards: Card[] = [];

	private constructor() {
		const suits: Suit[] = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs];
		const ranks: Rank[] = [
			Rank.Two,
			Rank.Three,
			Rank.Four,
			Rank.Five,
			Rank.Six,
			Rank.Seven,
			Rank.Eight,
			Rank.Nine,
			Rank.Ten,
			Rank.Jack,
			Rank.Queen,
			Rank.King,
			Rank.Ace,
		];

		for (const suit of suits) {
			for (const rank of ranks) {
				this._cards.push(Card.create({ suit, rank }));
			}
		}
	}

	public static shuffle() {
		const deck = new Deck();

		for (let i = deck._cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[deck._cards[i], deck._cards[j]] = [deck._cards[j], deck._cards[i]];
		}

		return deck;
	}

	public draw() {
		return this._cards.pop();
	}

	public get cards() {
		return this._cards;
	}
}
