import { Deck } from '@/core/models/deck';
import { Hand } from '@/core/models/hand';

describe('Hand', () => {
	let deck: Deck;

	beforeEach(() => {
		deck = Deck.shuffle();
	});

	it('should be able to create a hand', () => {
		const hand = Hand.create(deck);

		expect(hand.cards).toHaveLength(5);
	});
});
