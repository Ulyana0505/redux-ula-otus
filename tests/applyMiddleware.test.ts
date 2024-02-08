import { applyMiddleware } from '../src/applyMiddleware'
import { Action, Reducer } from '../src/types'
import { createStore } from '../src/createStore'

type CounterState = { value: number }
const action_ADD = 'ADD'
const reducer: Reducer<CounterState> = (state, action) => {
    if (action.type === action_ADD) {
        return { value: (state?.value ?? 0) + Number(action.payload) }
    }
    return state
}

describe('applyMiddleware', () => {
    it('is a function', () => {
        expect(applyMiddleware).toBeInstanceOf(Function)
    })
    it('is a function', () => {
        const m1 = jest.fn(
            (a1: { dispatch: (a: Action) => void }) =>
                (a2: (a: Action) => void) => {
                    a1.dispatch({
                        type: action_ADD,
                        payload: 2,
                    })
                    return a2
                }
        )
        const m2 = jest.fn(
            (a1: { dispatch: (a: Action) => void }) =>
                (a2: (a: Action) => void) => {
                    a1.dispatch({
                        type: action_ADD,
                        payload: 2,
                    })
                    return a2
                }
        )

        {
            const state = applyMiddleware()(createStore)(
                reducer,
                { value: 0 },
                []
            )
            state.dispatch({
                type: action_ADD,
                payload: 6,
            })
            expect(state.getState()).toEqual({ value: 6 })
        }
        {
            const state = applyMiddleware(m1)(createStore)(
                reducer,
                { value: 0 },
                []
            )
            state.dispatch({
                type: action_ADD,
                payload: 6,
            })
            expect(state.getState()).toEqual({ value: 8 })
        }
        {
            const state = applyMiddleware(m1, m2)(createStore)(
                reducer,
                { value: 0 },
                []
            )
            state.dispatch({
                type: action_ADD,
                payload: 6,
            })
            expect(state.getState()).toEqual({ value: 10 })
        }
    })
})
