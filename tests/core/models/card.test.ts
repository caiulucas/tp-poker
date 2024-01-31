import { Card, Rank, Suit } from '@/core/models/card';

describe('Card', () => {
	it('should be able to create a card', () => {
		const card = Card.create({ suit: Suit.Spades, rank: Rank.Ace });

		expect(card.rank).toBe(Rank.Ace);
		expect(card.suit).toBe(Suit.Spades);
	});

	it('should be able to verify if rank of cards is equal', () => {
		const card1 = Card.create({ suit: Suit.Spades, rank: Rank.Ace });
		const card2 = Card.create({ suit: Suit.Hearts, rank: Rank.Ace });

		expect(card1.isRankEqual(card2)).toBe(true);
	});

	it('should be able to verify if suit of cards is equal', () => {
		const card1 = Card.create({ suit: Suit.Spades, rank: Rank.Ace });
		const card2 = Card.create({ suit: Suit.Spades, rank: Rank.Queen });

		expect(card1.isSuitEqual(card2)).toBe(true);
	});
});
