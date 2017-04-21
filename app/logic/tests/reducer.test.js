import managerCrudPageReducer, { initialState } from '../reducer';

describe('managerCrudPageReducer', () => {
  it('returns the initial state', () => {
    expect(managerCrudPageReducer(undefined, {})).toEqual(initialState);
  });
});
