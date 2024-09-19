import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { ScoreboardState, ScoreboardStateModel } from './scoreboard.state';
import { IncrementScoreAction } from './scoreboard.actions';

describe('Scoreboard store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideStore([ScoreboardState])],
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: ScoreboardStateModel = {
      scores: {
        player1: 1,
        player2: 0,
      },
    };
    store.dispatch(new IncrementScoreAction('player1'));
    const actual = store.selectSnapshot(ScoreboardState.getState);
    expect(actual).toEqual(expected);
  });
});
