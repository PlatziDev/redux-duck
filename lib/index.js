export function createDuck(name, app) {
  function defineType(type) {
    if (app) {
      return `${app}/${name}/${type}`;
    }
    return `${name}/${type}`;
  }

  function createReducer(cases, defaultState = {}) {
    return function reducer(state = defaultState, action = {}) {
      if (state === undefined) return defaultState;
      for (const caseName in cases) {
        if (action.type === caseName) return cases[caseName](state, action);
      }
      return state;
    };
  }

  function createAction(type) {
    return function actionCreator(payload) {
      const action = {
        type,
      };

      if (payload) action.payload = payload;

      return action;
    };
  }

  return {
    defineType,
    createReducer,
    createAction,
  };
}
