export enum Rank {
	Ace = 'A',
	Two = '2',
	Three = '3',
	Four = '4',
	Five = '5',
	Six = '6',
	Seven = '7',
	Eight = '8',
	Nine = '9',
	Ten = 'T',
	Jack = 'J',
	Queen = 'Q',
	King = 'K',
}

export enum Suit {
	Clubs = 'c',
	Hearts = 'h',
	Spades = 's',
	Diamonds = 'd',
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

	get suit() {
		return this._suit;
	}

	get rank() {
		return this._rank;
	}

	toString() {
		return `${this._rank}${this._suit}`;
	}
}
