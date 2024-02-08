import {
    Action,
    Listener,
    Reducer,
    State,
    StoreStruct,
    Unsubscriber,
} from './types'

export function configureStore<S extends State = State>(
    startReducer: Reducer<S>,
    initialState?: S
) {
    let reducer = startReducer
    const subscribers = new Set<Listener>()
    let state: S = initialState || ({} as S)
    const store: StoreStruct<S> = {
        getState(): S | undefined {
            return state
        },
        subscribe(listener: Listener): Unsubscriber {
            subscribers.add(listener)
            return () => {
                subscribers.delete(listener)
            }
        },
        replaceReducer(nextReducer: Reducer<S>) {
            reducer = nextReducer
        },
        dispatch(action: Action) {
            state = reducer(state, action)
            for (const fn of subscribers) {
                fn(state)
            }
        },
    }
    return store
}
