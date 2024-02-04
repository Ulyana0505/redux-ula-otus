import { Action, GenericFunction, Reducer, State, StoreStruct } from "./types";

export function applyMiddleware(
  ...middlewares: GenericFunction[]
): GenericFunction {
  return (createStore: GenericFunction) =>
    (
      reducer: Reducer<State>,
      preloadedState: State,
      middleware: ((s: StoreStruct) => StoreStruct)[]
    ) => {
      const store: StoreStruct = createStore(
        reducer,
        preloadedState,
        middleware
      );
      let { dispatch } = store;

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action: Action) => dispatch(action),
      };

      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose(...chain)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
}

function compose(...funcs: GenericFunction[]) {
  if (funcs.length === 0) {
    return (arg: unknown) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  const last = funcs[funcs.length - 1];
  const rest = funcs.slice(0, -1);
  return (...args: unknown[]) =>
    rest.reduceRight((composed, f) => f(composed), last(...args));
}
