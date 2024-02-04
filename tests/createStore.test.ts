import { createStore } from "../src/createStore";
import { Reducer, StoreStruct } from "../src/types";

type CounterState = { value: number };
const action_ADD = "ADD";
const reducer: Reducer<CounterState> = (state, action) => {
  if (action.type === action_ADD) {
    return { value: (state?.value ?? 0) + Number(action.payload) };
  }
  return state;
};

describe("createStore", () => {
  it("is a function", () => {
    expect(createStore).toBeInstanceOf(Function);
  });
  it("init", () => {
    expect(createStore(reducer).dispatch).toBeInstanceOf(Function);
  });
  it("middlewares", () => {
    const mv = (s: StoreStruct<CounterState>) => s;
    expect(createStore(reducer, { value: 0 }, [mv]).dispatch).toBeInstanceOf(
      Function
    );
  });
});
