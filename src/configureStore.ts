import {
  Action,
  Listener,
  Reducer,
  State,
  StoreStruct,
  Unsubscriber,
} from "./types";

export function configureStore<S extends State = State>(
  startReducer: Reducer<S>,
  initialState?: S
) {
  let reducer = startReducer;
  const subscribers = new Set<Listener>();
  let state: S = initialState || ({} as S);
  const store: StoreStruct<S> = {
    getState(): S | undefined {
      return state;
    },
    subscribe(listener: Listener): Unsubscriber {
      subscribers.add(listener);
      return () => {
        subscribers.delete(listener);
      };
    },
    replaceReducer(nextReducer: Reducer<S>) {
      reducer = nextReducer;
    },
    dispatch(action: Action) {
      state = reducer(state, action);
      for (const fn of subscribers) {
        fn(state);
      }
    },
  };
  return store;
}

/*import { Store, Reducer, Middleware, ConfigureStore } from "./types";

  // reducer, undefined
  export function configureStore(startReducer: (state: {}, action: {}) => void, startState?: any ) {
    let reducer = startReducer;
    let state = startState;
    let cbs: any[] = [];
    const middlewares = [];
    const store: Store = {
      dispatch(action) {
        state = reducer(state, action);
        for (let cb of cbs) {
          cb();
        }
      },
      subscribe(cb) {
        cbs.push(cb);
        function unsubscribe() {
          cbs = cbs.filter((callback) => {
            return callback !== cb;
          });
        }
        return unsubscribe;
      },
      getState() {
        return state;
      },
      replaceReducer(nextReducer) {
        if(typeof nextReducer === "function") {
          return reducer = nextReducer;
        }
      },

    };
    return store;

}
*/
// const reducer = jest.fn((state = 1) => state + 1);
// const store = configureStore(reducer, undefined)
// store.dispatch(action1) -> reducer(undefined, action1) -
// store.getState() -> 2
// store.dispatch(action2) -> reducer(2, action2) -> 3

// первый
// function fetchUser (userId, cb) {
//   setTimeout(() => {
//     cb({
//       user: {
//         id: userId
//       }
//     })
//   }, 1000);
// }

// // второй
// const logUser = (user) => {
//   console.log(user)
// }
// fetchUser(100, logUser)
// fetchUser(100, () => {
//   console.log('test')
// })

/*
export class Store<S extends State = State> {
  private state: S = <S>{};

  private reducer: Reducer<S> | undefined;

  private subscribers: Set<Listener> = new Set<Listener>();

  public constructor(reducer?: Reducer<S>, initialState?: S) {
    this.reducer = reducer;
    this.state = initialState ?? this.state;
  }

  dispatch(action: Action): void {
    this.state =
      typeof this.reducer === "function"
        ? this.reduce(this.state, action)
        : this.state;
    this.subscribers.forEach((fn) =>
      typeof fn === "function" ? fn(this.state) : this.state
    );
  }

  getState(): S {
    return this.state;
  }

  subscribe(listener: Listener): Unsubscriber {
    this.subscribers.add(listener);

    return () => {
      this.subscribers.delete(listener);
    };
  }

  replaceReducer(nextReducer: Reducer<S>): void {
    if (typeof nextReducer === "function") {
      this.reducer = nextReducer;
    }
  }

  private reduce(state: S, action: Action): S {
    return typeof this.reducer === "function"
      ? this.reducer(state, action)
      : state;
  }
}
 */
