import { applyMiddleware } from "../src/applyMiddleware";
import { Reducer } from "../src/types";
import { createStore } from "../src/createStore";

type State = { value: number };
const action_ADD = "ADD";
const action_MUL = "MUL";
const reducer: Reducer<State> = (state, action) => {
  if (action.type === action_ADD) {
    return { value: (state?.value ?? 0) + Number(action.payload) };
  }
  return state;
};

describe("applyMiddleware", () => {
  it("is a function", () => {
    expect(applyMiddleware).toBeInstanceOf(Function);
  });
  it("is a function", () => {
    const m1 = jest.fn(() => () => 1);
    const m2 = jest.fn(() => () => 1);
    expect(applyMiddleware(m1, m2)).toBeInstanceOf(Function);
    console.log(applyMiddleware()(createStore)(reducer, { value: 0 }));
    console.log(applyMiddleware(m1)(createStore)(reducer, { value: 0 }));
    console.log(applyMiddleware(m1, m2)(createStore)(reducer, { value: 0 }));
  });
});
