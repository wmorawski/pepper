export type IncrementScorePayload = 'player1' | 'player2';

export class IncrementScoreAction {
  static readonly type = '[Scoreboard] Increment score for a player';

  constructor(readonly payload: IncrementScorePayload) {
  }
}
