import { Card, Rank, Suit } from '@/core/models/card';
import { Deck } from '@/core/models/deck';
import { Hand } from '@/core/models/hand';

describe('Hand', () => {
	let deck: Deck;

	beforeEach(() => {
		deck = Deck.shuffle();
	});

	it('should be able to create a hand', () => {
		const hand = Hand.create(deck);

		expect(hand.cards).toHaveLength(2);
	});

	it('should verify what is the higher card', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Hearts }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Queen, suit: Suit.Hearts }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Three, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Four, suit: Suit.Diamonds }));

		const higherCard = hand.isHigherCard(flop);

		expect(higherCard.rank).toBe(Rank.Ace);
		expect(higherCard.suit).toBe(Suit.Hearts);
	});

	it('should verify if there is a pair', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Hearts }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Queen, suit: Suit.Hearts }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Ace, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Four, suit: Suit.Diamonds }));

		expect(hand.isPair(flop)).toBe(true);
	});

	it('should verify if there is not a pair', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Hearts }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Queen, suit: Suit.Hearts }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Three, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Four, suit: Suit.Diamonds }));

		expect(hand.isPair(flop)).toBe(false);
	});

	it('should verify if there is two pairs', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Queen, suit: Suit.Hearts }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Ace, suit: Suit.Diamonds }));

		expect(hand.isTwoPairs(flop)).toBe(true);
	});

	it('should verify if there is not two pairs', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Queen, suit: Suit.Hearts }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Four, suit: Suit.Diamonds }));

		expect(hand.isTwoPairs(flop)).toBe(false);
	});

	it('should verify if there is three of a kind', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Queen, suit: Suit.Hearts }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Clubs }));
		flop.push(Card.create({ rank: Rank.Four, suit: Suit.Diamonds }));

		expect(hand.isThreeOfAKind(flop)).toBe(true);
	});

	it('should verify if there is not three of a kind', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Queen, suit: Suit.Hearts }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Four, suit: Suit.Diamonds }));

		expect(hand.isThreeOfAKind(flop)).toBe(false);
	});

	it('should verify if there is a straight', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Nine, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Eight, suit: Suit.Hearts }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Three, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Jack, suit: Suit.Clubs }));
		flop.push(Card.create({ rank: Rank.Ten, suit: Suit.Diamonds }));

		expect(hand.isStraight(flop)).toBe(true);
	});

	it('should verify if there is not a straight', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Nine, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Eight, suit: Suit.Hearts }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Three, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Jack, suit: Suit.Clubs }));
		flop.push(Card.create({ rank: Rank.Seven, suit: Suit.Diamonds }));

		expect(hand.isStraight(flop)).toBe(false);
	});

	it('should verify if there is a flush', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Nine, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Eight, suit: Suit.Spades }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Three, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Hearts }));
		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Jack, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Seven, suit: Suit.Diamonds }));

		expect(hand.isFlush(flop)).toBe(true);
	});

	it('should verify if there is not a flush', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Nine, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Eight, suit: Suit.Spades }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Three, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Hearts }));
		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Jack, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Seven, suit: Suit.Clubs }));

		expect(hand.isFlush(flop)).toBe(false);
	});

	it('should verify if there is four of a kind', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Hearts }));

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Ace, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Ace, suit: Suit.Clubs }));
		flop.push(Card.create({ rank: Rank.Four, suit: Suit.Diamonds }));

		expect(hand.isFourOfAKind(flop)).toBe(true);
	});

	it('should verify if there is not four of a kind', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Hearts }));

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Ace, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Four, suit: Suit.Diamonds }));

		expect(hand.isFourOfAKind(flop)).toBe(false);
	});

	it('should verify if there is a straight flush', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Nine, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Eight, suit: Suit.Spades }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Ten, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Jack, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Seven, suit: Suit.Diamonds }));

		expect(hand.isStraightFlush(flop)).toBe(true);
	});

	it('should verify if there is not a straight flush', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Nine, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(
				Card.create({ rank: Rank.Eight, suit: Suit.Spades }),
			);

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Ten, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Jack, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Seven, suit: Suit.Diamonds }));

		expect(hand.isStraightFlush(flop)).toBe(false);
	});

	it('should verify if there is a full house', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Hearts }));

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Ace, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Four, suit: Suit.Clubs }));
		flop.push(Card.create({ rank: Rank.Four, suit: Suit.Diamonds }));

		expect(hand.isFullHouse(flop)).toBe(true);
	});

	it('should verify if there is not a full house', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Two, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Two, suit: Suit.Hearts }));

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Two, suit: Suit.Diamonds }));
		flop.push(Card.create({ rank: Rank.Three, suit: Suit.Clubs }));
		flop.push(Card.create({ rank: Rank.Four, suit: Suit.Diamonds }));

		expect(hand.isFullHouse(flop)).toBe(false);
	});

	it('should verify if there is a royal flush', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.King, suit: Suit.Spades }));

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Jack, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Ten, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Seven, suit: Suit.Diamonds }));

		expect(hand.isRoyalFlush(flop)).toBe(true);
	});

	it('should verify if there is not a royal flush', () => {
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.Ace, suit: Suit.Spades }));
		vitest
			.spyOn(deck, 'draw')
			.mockReturnValueOnce(Card.create({ rank: Rank.King, suit: Suit.Spades }));

		const hand = Hand.create(deck);
		const flop: Card[] = [];

		flop.push(Card.create({ rank: Rank.Queen, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Jack, suit: Suit.Hearts }));
		flop.push(Card.create({ rank: Rank.Ten, suit: Suit.Spades }));
		flop.push(Card.create({ rank: Rank.Seven, suit: Suit.Clubs }));

		expect(hand.isRoyalFlush(flop)).toBe(false);
	});
});
