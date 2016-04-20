import test from 'tape';
import { createDuck } from '../build/index.js';

test('create duck', t => {
  t.plan(6);

  const duck = createDuck('test', 'redux-duck');

  t.ok(duck.defineType, 'it should had a key `defineType`');
  t.equals(
    typeof duck.defineType,
    'function',
    'it should be a function'
  );

  t.ok(duck.createReducer, 'it should had a key `createReducer`');
  t.equals(
    typeof duck.createReducer,
    'function',
    'it should be a function'
  );

  t.ok(duck.createAction, 'it should had a key `createAction`');
  t.equals(
    typeof duck.createAction,
    'function',
    'it should be a function'
  );
});

test('define type', t => {
  t.plan(2);

  const duck1 = createDuck('test1', 'redux-duck');
  const duck2 = createDuck('test2', 'redux-duck');

  const type1 = duck1.defineType('TYPE');
  const type2 = duck2.defineType('TYPE');

  t.equals(
    type1,
    'redux-duck/test1/TYPE',
    'it should be the expected action type string'
  );

  t.equals(
    type2,
    'redux-duck/test2/TYPE',
    'it should be the expected action type string'
  );
});

test('create action creator', t => {
  t.plan(3);

  const duck = createDuck('test', 'redux-duck');

  const type = duck.defineType('TYPE');

  const createType = duck.createAction(type);

  const testData = {
    id: 123,
    message: 'hello world',
  };

  const action = createType(testData);

  const emptyActon = createType();

  t.equals(
    typeof createType,
    'function',
    'it should create a valid function'
  );

  t.deepEquals(
    action,
    {
      type,
      payload: testData,
    },
    'it should create a valid action object'
  );

  t.deepEquals(
    emptyActon,
    {
      type,
    },
    'it should be able to create an action without payload'
  );
});

test('create reducer', t => {
  t.plan(3);

  const duck = createDuck('test', 'redux-duck');

  const type = duck.defineType('TYPE');

  const reducer = duck.createReducer({
    [type]: (state, action) => ({
      ...state,
      [action.payload.id]: action.payload,
    }),
  }, {});

  const testData = {
    id: 123,
    message: 'hello world',
  };

  const testAction = {
    type,
    payload: testData,
  };

  const state = reducer({}, testAction);

  t.equals(
    typeof reducer,
    'function',
    'the reducer should be a function'
  );

  t.deepEquals(
    reducer(),
    {},
    'the reducer should be able to return the default state'
  );

  t.deepEquals(
    state,
    {
      [testData.id]: testData,
    },
    'the reducer should work with the defined cases'
  );
});
