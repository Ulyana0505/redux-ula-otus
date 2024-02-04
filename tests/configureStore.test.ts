import { configureStore } from "../src/configureStore";
import { Reducer } from "../src/types";

type State = { value: number };
const action_ADD = "ADD";
const action_MUL = "MUL";
const reducer: Reducer<State> = (state, action) => {
  if (action.type === action_ADD) {
    return { value: (state?.value ?? 0) + Number(action.payload) };
  }
  return state;
};

const nextReducer: Reducer<State> = (state, action) => {
  if (action.type === action_MUL) {
    return { value: (state?.value ?? 0) * Number(action.payload) };
  }
  return state;
};

describe("configureStore", () => {
  it("is a function", () => {
    expect(configureStore).toBeInstanceOf(Function);
  });
  it("returns a object", () => {
    expect(Object.keys(configureStore(reducer))).toEqual([
      "getState",
      "subscribe",
      "replaceReducer",
      "dispatch",
    ]);
  });
  it("returns a object", () => {
    const initialState: State = { value: 0 };
    const store = configureStore(reducer, initialState);
    expect(store.getState()).toEqual(initialState);

    const subscriber = jest.fn(() => {});
    const unsubscribe = store.subscribe(subscriber);
    expect(unsubscribe).toBeInstanceOf(Function);

    store.dispatch({ type: action_ADD, payload: 2 });
    expect(store.getState()).toEqual({ value: 2 });
    expect(unsubscribe()).toEqual(void 0);
    expect(subscriber).toBeCalledTimes(1);

    store.replaceReducer(nextReducer);
    store.dispatch({ type: action_MUL, payload: 3 });
    expect(store.getState()).toEqual({ value: 6 });
  });
});
