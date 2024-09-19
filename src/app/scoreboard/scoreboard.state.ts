import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {IncrementScoreAction} from './scoreboard.actions';

export interface ScoreboardStateModel {
  scores: { player1: number; player2: number };
}

@State<ScoreboardStateModel>({
  name: 'scoreboard',
  defaults: {
    scores: {
      player1: 0,
      player2: 0
    }
  }
})
@Injectable()
export class ScoreboardState {

  @Selector()
  static getState(state: ScoreboardStateModel) {
    return state;
  }

  @Action(IncrementScoreAction)
  increment(ctx: StateContext<ScoreboardStateModel>, {payload}: IncrementScoreAction) {
    const stateModel = ctx.getState();
    stateModel.scores[payload] += 1;
    ctx.setState(stateModel);
  }
}
