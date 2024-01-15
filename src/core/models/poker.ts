import { Card } from './card';
import { Deck } from './deck';
import { Player } from './player';

export class Poker {
	private _players: Player[] = [];
	private _flop: Card[] = [];

	private constructor(deck: Deck, players: Player[]) {
		for (let i = 0; i < 3; i++) {
			const card = deck.draw();

			if (!card) {
				throw new Error('No more cards in deck');
			}

			this._flop.push(card);
		}

		this._players = players;
	}

	public static start(deck: Deck, players: Player[]) {
		return new Poker(deck, players);
	}

	public turnOrRiver(deck: Deck): Card {
		if (this._flop.length === 5) {
			throw new Error('The flop reached its limit');
		}

		const card = deck.draw();

		if (!card) {
			throw new Error('No more cards in deck');
		}

		return card;
	}

	public verifyWinner(): Player {
		let winner = {
			player: this._players[0],
			wonBy: 'higher card',
		};

		for (const player of this._players) {
			if (player.hand.isRoyalFlush(this._flop)) {
				return player;
			}

			if (player.hand.isStraightFlush(this._flop)) {
				winner = {
					player,
					wonBy: 'straight flush',
				};
			} else if (
				player.hand.isFourOfAKind(this._flop) &&
				winner.wonBy !== 'straight flush'
			) {
				winner = { player, wonBy: 'four of a kind' };
			} else if (
				player.hand.isFullHouse(this._flop) &&
				winner.wonBy !== 'four of a kind'
			) {
				winner = { player, wonBy: 'full house' };
			} else if (
				player.hand.isFlush(this._flop) &&
				winner.wonBy !== 'full house'
			) {
				winner = { player, wonBy: 'flush' };
			} else if (
				player.hand.isStraight(this._flop) &&
				winner.wonBy !== 'flush'
			) {
				winner = { player, wonBy: 'straight' };
			} else if (
				player.hand.isThreeOfAKind(this._flop) &&
				winner.wonBy !== 'straight'
			) {
				winner = { player, wonBy: 'three of a kind' };
			} else if (
				player.hand.isTwoPairs(this._flop) &&
				winner.wonBy !== 'three of a kind'
			) {
				winner = { player, wonBy: 'two pair' };
			} else if (
				player.hand.isPair(this._flop) &&
				winner.wonBy !== 'two pair'
			) {
				winner = { player, wonBy: 'pair' };
			} else if (
				player.hand.isHigherCard(this._flop) &&
				winner.wonBy !== 'pair'
			) {
				winner = { player, wonBy: 'higher card' };
			}
		}

		return winner.player;
	}
}
