import {
  LOAD_FROM_SERVER,
  ON_LIST_ERROR,
  ON_LIST_SUCCESS,
  ON_NAVIGATE,
} from '../constants';

import {
  loadFromServer,
  onListError,
  onListSuccess,
  onNavigate,
} from '../actions';

describe('ManagerCrudPage Actions', () => {
  describe('loadFromServer', () => {
    it('should return the correct type', () => {
      const pageSize = 0;
      const rel = [];
      const expectedResult = {
        type: LOAD_FROM_SERVER,
        pageSize,
        rel,
      };
      expect(loadFromServer(pageSize, rel)).toEqual(expectedResult);
    });
  });

  describe('onListError', () => {
    it('should return the correct type and the passed sending', () => {
      const error = 'this is an error message';
      const expectedResult = {
        type: ON_LIST_ERROR,
        error,
      };
      expect(onListError(error)).toEqual(expectedResult);
    });
  });

  describe('onListSuccess', () => {
    it('should return the correct type and the passed error', () => {
      const success = 'this is a success message';
      const expectedResult = {
        type: ON_LIST_SUCCESS,
        success,
      };
      expect(onListSuccess(success)).toEqual(expectedResult);
    });
  });

  describe('onNavigate', () => {
    it('should return the correct type', () => {
      const navUri = 'toto';
      const schema = {};
      const pageSize = 0;
      const rel = [];

      const expectedResult = {
        type: ON_NAVIGATE,
        rel,
        navUri,
        schema,
        pageSize,
      };
      expect(onNavigate(navUri, schema, pageSize, rel)).toEqual(expectedResult);
    });
  });
});
