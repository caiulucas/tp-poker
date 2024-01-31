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

		const evalHand = hand.evalHand(flop);
		expect(evalHand.handName).toBe('high card');
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

		const evalHand = hand.evalHand(flop);
		expect(evalHand.handName).toBe('one pair');
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

		const evalHand = hand.evalHand(flop);
		expect(evalHand.handName).toBe('two pairs');
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

		const evalHand = hand.evalHand(flop);
		expect(evalHand.handName).toBe('three of a kind');
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

		const evalHand = hand.evalHand(flop);
		expect(evalHand.handName).toBe('straight');
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

		const evalHand = hand.evalHand(flop);
		expect(evalHand.handName).toBe('flush');
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

		const evalHand = hand.evalHand(flop);
		expect(evalHand.handName).toBe('four of a kind');
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

		const evaluatedHand = hand.evalHand(flop);
		expect(evaluatedHand.handName).toBe('straight flush');
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

		const evalHand = hand.evalHand(flop);
		expect(evalHand.handName).toBe('full house');
	});
});
