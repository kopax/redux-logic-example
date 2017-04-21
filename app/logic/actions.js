/*
 *
 * ManagerCrudPage actions
 *
 */

import {
  ON_NAVIGATE,
  LOAD_FROM_SERVER,
  ON_LIST_SUCCESS,
  ON_LIST_ERROR,
} from './constants';

export function loadFromServer(pageSize, rel) {
  return {
    type: LOAD_FROM_SERVER,
    pageSize,
    rel,
  };
}

export function onNavigate(navUri, schema, pageSize, rel) {
  return {
    type: ON_NAVIGATE,
    rel,
    navUri,
    schema,
    pageSize,
  };
}


export function onListSuccess(success) {
  return {
    type: ON_LIST_SUCCESS,
    success,
  };
}

export function onListError(error) {
  return {
    type: ON_LIST_ERROR,
    error,
  };
}
