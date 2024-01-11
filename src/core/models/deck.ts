export enum Rank {
	Two = 0,
	Three = 1,
	Four = 2,
	Five = 3,
	Six = 4,
	Seven = 5,
	Eight = 6,
	Nine = 7,
	Ten = 8,
	Jack = 9,
	Queen = 10,
	King = 11,
	Ace = 12,
}

export enum Suit {
	Spades = 0,
	Hearts = 1,
	Diamonds = 2,
	Clubs = 3,
}

export type Card = {
	suit: Suit;
	rank: Rank;
};

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
				this._cards.push({ suit, rank });
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

	public static compareRank(card1: Card, card2: Card) {
		return card1.rank > card2.rank;
	}

	public static compareSuit(card1: Card, card2: Card) {
		return card1.suit > card2.suit;
	}

	public draw() {
		return this._cards.pop();
	}

	public get cards() {
		return this._cards;
	}
}
