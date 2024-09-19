import {TestBed} from '@angular/core/testing';
import {provideStore, Store} from '@ngxs/store';
import {ScoreboardState, ScoreboardStateModel} from './scoreboard.state';
import {ScoreboardAction} from './scoreboard.actions';

describe('Scoreboard store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([ScoreboardState])]

    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: ScoreboardStateModel = {
      items: ['item-1']
    };
    store.dispatch(new ScoreboardAction('item-1'));
    const actual = store.selectSnapshot(ScoreboardState.getState);
    expect(actual).toEqual(expected);
  });

});
