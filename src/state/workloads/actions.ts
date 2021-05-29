import { createAction } from 'typesafe-actions';
import {WorkloadService} from './services';
import { Status } from './types';
import { SUBMIT, CREATED, CANCEL, UPDATE_STATUS, CREATE_INTERVAL } from './constants';


export const submit = createAction(SUBMIT, resolve => (params: { complexity: number }) => resolve({ complexity: params.complexity }));

export const created = createAction(CREATED, resolve =>
  (params: { id: number, status: Status, complexity: number, completeDate: Date }) => resolve({
    id: params.id,
    status: params.status,
    completeDate: params.completeDate,
    complexity: params.complexity,
  }));

// export const createInterval = createAction(CREATE_INTERVAL, WorkloadService.checkStatus())

export const createInterval = (id: number) => {
  setInterval(() => {
    console.log('createInterval called');
    updateStatus({id, status: 'SUCCESS'})
  }, 1000);
}

export const cancel = createAction(CANCEL, resolve => (params: { id: number }) => resolve({ id: params.id }));

export const updateStatus = createAction(UPDATE_STATUS, resolve =>
  (params: { id: number, status: Status }) => resolve({ id: params.id, status: params.status }))

// export const checkStatus = createAction()
