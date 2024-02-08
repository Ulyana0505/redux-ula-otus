export type Action<T extends string = string, P = unknown> = {
    type: T
    payload?: P
}

export type State = Record<string, unknown>

export type Listener = (state: State) => void

export interface Unsubscriber {
    (): void
}

export type ReducersMap<S extends State, A extends Action = Action> = {
    [key in keyof S]: (state: S[key] | undefined, action: A) => S[key]
}

export type Reducer<S extends State = State, A extends Action = Action> = (
    state: S,
    action: A
) => S

export interface StoreStruct<S extends State = State> {
    getState(): S | undefined
    dispatch(action: Action): void
    subscribe(listener: Listener): Unsubscriber
    replaceReducer(nextReducer: Reducer<S>): void
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type GenericFunction = (...args: any[]) => any
