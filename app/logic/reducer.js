/*
 *
 * ManagerCrudPage reducer
 *
 */

import { fromJS } from 'immutable';

const DEFAULT_PAGE_SIZE = 2;

export const initialState = fromJS({
  error: false,
  page: false,
  schema: false,
  entityList: false,
  attributes: false,
  pageSize: DEFAULT_PAGE_SIZE,
  links: false,
});

function managerCrudPageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default managerCrudPageReducer;
