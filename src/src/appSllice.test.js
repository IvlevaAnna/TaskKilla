import store from "./store";
import {
    hideCardForm,
    hideEditForm,
    hideMap,
    setCategory,
    setDateFilter, setPriority, setTaskID, setUserAddress,
    showCardForm,
    showEditForm,
    showMap
} from "./appSlice";

describe('Redux test', () => {
    it('Reducer show card form', () => {
        store.dispatch(showCardForm())
        const states = store.getState()

        expect(states.app.isCardFormShown).toBe(true)
    })

    it('Reducer hide card form', () => {
        store.dispatch(showCardForm())
        const states = store.getState()

        expect(states.app.isCardFormShown).toBe(true)

        store.dispatch(hideCardForm())
        const states2 = store.getState()

        expect(states2.app.isCardFormShown).toBe(false)
    })

    it('Reducer show edit card form', () => {
        store.dispatch(showEditForm())
        const states = store.getState()

        expect(states.app.isEditFormShown).toBe(true)
    })

    it('Reducer hide edit card form', () => {
        store.dispatch(showEditForm())
        const states = store.getState()

        expect(states.app.isEditFormShown).toBe(true)

        store.dispatch(hideEditForm())
        const states2 = store.getState()

        expect(states2.app.isEditFormShown).toBe(false)
    })

    it('Reducer category', () => {
        store.dispatch(setCategory('Done'))
        const states = store.getState()

        expect(states.app.category).toEqual("Done")
    })

    it('Reducer show map', () => {
        store.dispatch(showMap())
        const states = store.getState()

        expect(states.app.isMapShown).toBe(true)
    })

    it('Reducer hide map', () => {
        store.dispatch(showMap())
        const states = store.getState()

        expect(states.app.isMapShown).toBe(true)

        store.dispatch(hideMap())
        const states2 = store.getState()

        expect(states2.app.isMapShown).toBe(false)
    })

    it('Reducer date filter', () => {
        store.dispatch(setDateFilter('09.04.2022'))
        const states = store.getState()

        expect(states.app.dateFilter).toEqual('09.04.2022')
    })

    it('Reducer user address', () => {
        store.dispatch(setUserAddress('Saint-Petersburg'))
        const states = store.getState()

        expect(states.app.userAddress).toEqual('Saint-Petersburg')
    })

    it('Reducer set priority', () => {
        store.dispatch(setPriority('low'))
        const states = store.getState()

        expect(states.app.priority).toEqual('low')
    })

    it('Reducer set task id', () => {
        store.dispatch(setTaskID(1))
        const states = store.getState()

        expect(states.app.taskID).toEqual(1)
    })
})
