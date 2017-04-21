/**
 * Gets the repositories of the user from Github
 */
import { createLogic } from 'redux-logic';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_FROM_SERVER, ON_NAVIGATE } from './constants';
import { onListSuccess, onListError } from './actions';

/* eslint-disable no-underscore-dangle */
export const getEntityList = createLogic({
  type: LOAD_FROM_SERVER, // trigger on this action
  cancelType: LOCATION_CHANGE, // cancel if route changes
  latest: true, // use response for the latest request when multiple
  async process({ api, url, follow, action }, dispatch, done) {
    try {
      const pageSize = action.pageSize;
      const rel = action.rel;

      const res = await follow(api, url.api, [
        { rel, params: { size: pageSize } },
      ]);

      const links = res._links; // eslint-disable-line no-underscore-dangle
      const page = res.page;

      const schema = await api(links.profile.href, {
        headers: {
          Accept: 'application/schema+json',
        },
      });


      /**
       * Filter unneeded JSON Schema properties, like uri references and
       * subtypes ($ref).
       */
      Object.keys(schema.properties).forEach((property) => {
        if (Object.prototype.hasOwnProperty.call(schema.properties[property], 'format') &&
          schema.properties[property].format === 'uri') {
          delete schema.properties[property];
        } else if (Object.prototype.hasOwnProperty.call(schema.properties[property], '$ref')) {
          delete schema.properties[property];
        }
      });


      const entitiesPromises = res._embedded[rel].map((entity) => api(entity._links.self.href));

      const entityList = await Promise.all(entitiesPromises);

      dispatch(onListSuccess({
        page,
        schema,
        entityList,
        attributes: Object.keys(schema.properties),
        pageSize,
        links,
      }));
    } catch (err) {
      console.log(err);
      window.err = err;
      dispatch(onListError(err.message));
    }
    done();
  },
});

export const getEntityListOnNavigate = createLogic({
  type: ON_NAVIGATE, // trigger on this action
  cancelType: LOCATION_CHANGE, // cancel if route changes
  latest: true, // use response for the latest request when multiple
  async process({ api, action }, dispatch, done) {
    try {
      const schema = action.schema;
      const pageSize = action.pageSize;
      const rel = action.rel;

      const res = await api(action.navUri);

      const links = res._links;
      const page = res.page;

      const entitiesPromises = res._embedded[rel].map((entity) => api(entity._links.self.href));

      const entityList = await Promise.all(entitiesPromises);

      dispatch(onListSuccess({
        page,
        schema,
        entityList,
        attributes: Object.keys(schema.properties),
        pageSize,
        links,
      }));
    } catch (err) {
      dispatch(onListError(err.message));
    }
    done();
  },
});

// Bootstrap logic
export default [
  getEntityList,
  getEntityListOnNavigate,
];
