import { createAction } from 'typesafe-actions';
import { Status } from './types';
import {store} from '../../../src/index'
import { SUBMIT, CREATED, CANCEL, UPDATE_STATUS } from './constants';
import moment from 'moment';

export const submit = createAction(SUBMIT, resolve => (params: { complexity: number }) => resolve({ complexity: params.complexity }));

export const created = createAction(CREATED, resolve =>
  (params: { id: number, status: Status, complexity: number, completeDate: Date }) => resolve({
    id: params.id,
    status: params.status,
    completeDate: params.completeDate,
    complexity: params.complexity,
  }));

export const createInterval = (id: number, completeDate: Date, isCancelled: boolean) => {
  let interval = setInterval(() => {
    let currentDate = moment().valueOf();
    let completeDateUnix = moment(completeDate).valueOf();
    let diffSecs = (completeDateUnix - currentDate) / 1000;
    if(isCancelled) {
      store.dispatch(updateStatus({id, status: 'FAILURE'}));
      clearInterval(interval);
      clearInterval(interval);
    } else {
    if(diffSecs <= 0) {
      store.dispatch(updateStatus({id, status: 'SUCCESS'}));
      clearInterval(interval);
    }
    if(diffSecs >= 0) {
      store.dispatch(updateStatus({id, status: 'WORKING'}));
    }
  }
  }, 1000);
}

export const cancel = createAction(CANCEL, resolve => (params: { id: number }) => resolve({ id: params.id }));

export const updateStatus = createAction(UPDATE_STATUS, resolve =>
  (params: { id: number, status: Status }) => resolve({ id: params.id, status: params.status }))
