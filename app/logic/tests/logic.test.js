import { createMockStore } from 'redux-logic-test';
import managerCrudPageReducer, { initialState } from '../reducer';
import { onListSuccess } from '../actions';
import { ON_LIST_SUCCESS } from '../constants';
import managerCrudPageLogic from '../logic';

describe('ManagerCrudPage logics', () => {
  let store;

  beforeAll(() => {
    const requestUtil = {
      getParameter: () => '',
    };
    const forwardTo = jest.fn();

    const injectedDeps = {
      api: () => Promise.resolve(true),
      url: 'http://url',
      follow: () => Promise.resolve(true),
      action: {
        pageSize: 0,
        rel: [],
      },
      forwardTo,
      requestUtil,
    };

    store = createMockStore({
      initialState,
      reducer: managerCrudPageReducer, // default: identity reducer
      logic: managerCrudPageLogic, // default: []
      injectedDeps,
      middleware: [], // optionalArr, other mw, exclude logicMiddleware
    });
  });

  describe('getEntityList', () => {
    it('should make request and dispatch', () => {
      const success = 'hoora!';
      store.dispatch(onListSuccess(success));
      return store.whenComplete(() => {
        expect(store.actions).toEqual([
          {
            type: ON_LIST_SUCCESS,
            success,
          },
        ]);
      });
    });
  });
});
