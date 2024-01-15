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
	Clubs = 0,
	Hearts = 1,
	Spades = 2,
	Diamonds = 3,
}

type CardCreateProps = {
	suit: Suit;
	rank: Rank;
};

export class Card {
	private readonly _suit: Suit;
	private readonly _rank: Rank;

	private constructor(readonly props: CardCreateProps) {
		this._suit = props.suit;
		this._rank = props.rank;
	}

	public static create(props: CardCreateProps) {
		return new Card(props);
	}

	public isRankEqual(card: Card) {
		return this._rank === card._rank;
	}

	public isSuitEqual(card: Card) {
		return this._suit === card._suit;
	}

	public isRankHigherThan(card: Card) {
		return this._rank > card._rank;
	}

	public isSuitHigherThan(card: Card) {
		return this._suit > card._suit;
	}

	get suit() {
		return this._suit;
	}

	get rank() {
		return this._rank;
	}
}
