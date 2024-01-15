import { Deck } from '@/core/models/deck';

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
});
