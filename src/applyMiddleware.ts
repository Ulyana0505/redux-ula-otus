import { Action, GenericFunction, Reducer, StoreStruct } from './types'

export function applyMiddleware(...middlewares: GenericFunction[]) {
    return (createStore: GenericFunction) =>
        (
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            reducer: Reducer<any>,
            preloadedState: unknown,
            middleware: ((s: StoreStruct) => StoreStruct)[]
        ) => {
            const store: StoreStruct = createStore(
                reducer,
                preloadedState,
                middleware
            )
            let { dispatch } = store

            const middlewareAPI = {
                getState: store.getState,
                dispatch: (action: Action) => dispatch(action),
            }

            const chain = middlewares.map((middleware) =>
                middleware(middlewareAPI)
            )
            dispatch = compose(...chain)(store.dispatch)

            return {
                ...store,
                dispatch,
            }
        }
}

function compose(...funcs: GenericFunction[]) {
    if (funcs.length === 0) {
        return (arg: unknown) => arg
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce(
        (a, b) =>
            (...args: GenericFunction[]) =>
                a(b(...args))
    )
}
