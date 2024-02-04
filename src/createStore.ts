import { Reducer, State, StoreStruct } from "./types";
import { configureStore } from "./configureStore";

export function createStore<S extends State>(
  reducer: Reducer<S>,
  initialState?: S,
  middlewares?: ((s: StoreStruct<S>) => StoreStruct<S>)[]
): StoreStruct<S> {
  let store = configureStore<S>(reducer, initialState);
  if (middlewares) {
    for (let i = 0; i < middlewares.length; i += 1) {
      store = middlewares[i](store);
    }
  }
  return store;
}
