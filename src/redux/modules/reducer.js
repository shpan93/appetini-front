import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import modals from './modals';
import toast from './toast';
import common from './common';
import purchase from './purchase';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import moment from 'moment';

export default combineReducers({
  routing: routeReducer,
  auth,
  form: form.normalize({
    lunchForm: {
      cook_id: value => value && value.toString(),
      ready_by_date: value => value ? new Date(value) : undefined,
      ready_by_time: value => value ? moment(value, ['HH:mmZ', moment.ISO_8601]).utc().format('HH:mm\\Z') : undefined,
      food_preference_ids: value => value && value.map(item => item.toString()),
      removing_photos: value => value || []
    }
  }),
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  modals,
  toast,
  common,
  purchase,
  reduxAsyncConnect
});
