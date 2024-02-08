import { Action, ReducersMap, State } from './types'

export function combineReducers<S extends State, A extends Action = Action>(
    reducers: ReducersMap<S>
) {
    return function combinationReducer(state: S, action: A) {
        const nextState: S = <S>{}

        for (const [key, reducer] of Object.entries(reducers)) {
            nextState[key as keyof S] = reducer(state[key], action)
        }

        return nextState
    }
}
