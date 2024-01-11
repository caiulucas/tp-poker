import { Deck, Rank, Suit } from '@/core/models/deck';

describe('Deck', () => {
	it('should be able to create a shuffled deck', () => {
		const deck = Deck.shuffle();

		expect(deck.cards).toHaveLength(52);
	});

	it('should be able to draw a card', () => {
		const deck = Deck.shuffle();
		const card = deck.draw();

		expect(card).toBeDefined();
		expect(deck.cards).toHaveLength(51);
	});

	it('should be able to compare rank of two cards', () => {
		const card1 = { suit: Suit.Diamonds, rank: Rank.Ace };
		const card2 = { suit: Suit.Spades, rank: Rank.Ace };
		const card3 = { suit: Suit.Hearts, rank: Rank.Queen };

		expect(Deck.compareRank(card1, card2)).toBe(true);
		expect(Deck.compareRank(card1, card3)).toBe(false);
	});

	it('should be able to compare suit of two cards', () => {
		const card1 = { suit: Suit.Hearts, rank: Rank.Ace };
		const card2 = { suit: Suit.Hearts, rank: Rank.Queen };
		const card3 = { suit: Suit.Spades, rank: Rank.Ace };

		expect(Deck.compareSuit(card1, card2)).toBe(true);
		expect(Deck.compareSuit(card1, card3)).toBe(false);
	});
});
