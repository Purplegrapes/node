import {
  createAction as originalCreateAction,
  handleActions as originalHandleActions,
} from 'redux-actions';

export const actionTypeCreator = filename => actionName => `~${filename}#${actionName}`;

export const createAction = (type, payloadCreator, metaCreator) =>
  originalCreateAction(type, payloadCreator, metaCreator || (data => data));

export const handleActions = originalHandleActions;
