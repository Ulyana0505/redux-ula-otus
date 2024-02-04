import { combineReducers } from "../src/combineReducers";

describe("combineReducers", () => {
  it("is a function", () => {
    expect(combineReducers).toBeInstanceOf(Function);
  });

  it("returns a function", () => {
    expect(combineReducers).toBeInstanceOf(Function);
  });

  it("returns a reducer based on the config (initial state)", () => {
    const reducer = combineReducers({
      a: (state = 2) => state,
      b: (state = "hop") => state,
    });
    expect(reducer({}, { type: "unknown" })).toEqual({
      a: 2,
      b: "hop",
    });
  });
});
