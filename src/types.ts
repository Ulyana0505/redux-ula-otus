export type Action<T extends string = string, P = unknown> = {
  type: T;
  payload?: P;
};

export type State = Record<string, unknown>;

export type Listener = (state: State) => void;

export interface Unsubscriber {
  (): void;
}

export type ReducersMap<S extends State, A extends Action = Action> = {
  [key in keyof S]: (state: S[key] | undefined, action: A) => S[key];
};

export type Reducer<S extends State, A extends Action = Action> = (
  state: S,
  action: A
) => S;

export interface StoreStruct<S extends State = State> {
  getState(): S | undefined;
  dispatch(action: Action): void;
  subscribe(listener: Listener): Unsubscriber;
  replaceReducer(nextReducer: Reducer<S>): void;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type GenericFunction = (...args: any[]) => any;

/*export type Store<S = State, A = Action> = {
    dispatch(action: A): void;
    subscribe(cb: Listener): void;
    getState(): State;
    replaceReducer(nextReducer: Reducer<State>): void;
  };


export interface IStore<S extends State> {
  getState(): S | undefined;
  dispatch(action: Action): unknown;
  subscribe(listener: Listener): Unsubscriber;
  replaceReducer(nextReducer: Reducer<S>): void;
}

export type Reducer<S extends State, A extends Action = Action> = (
  state: S | undefined,
  action: A
) => S;

export type Middleware<State, Action> = (
    store: Store<State, Action>,
  ) => (next: (action: Action) => any) => (action: Action) => any;

export type ConfigureStore<State, Action> = (
    reducer: Reducer<State, Action>,
    initialState?: State | undefined,
    middlewares?: Middleware<State, Action>[],
  ) => Store<State, Action>;

export type Listener<S extends State> = (state: S) => void;

export type Action<T extends string = string, P = unknown> = {
  type: T;
  payload?: P;
};

export type State = Record<string, unknown>;
*/
