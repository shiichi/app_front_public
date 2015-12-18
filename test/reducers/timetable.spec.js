import expect from 'expect'
import todos from '../../src/js/reducers/timetable'
import * as types from '../../src/js/constants/ActionTypes'

describe('timetable reducer', () => {
    it('should handle initial state', () => {
        expect(
            todos(undefined, {})
        ).toEqual({})
    })

    it('should handle REQUEST_TIMETABLE', () => {
        expect(
            todos([], {
                type: types.REQUEST_TIMETABLE,
                key: '1_1_0'
            })
        ).toEqual({
            "1_1_0": {
                isFetching: true,
                didInvalidate: false,
                lastUpdated: '',
                data: {}
            }
        })

        expect(
            todos({
                "1_1_0": {
                    isFetching: true,
                    didInvalidate: false,
                    lastUpdated: '',
                    data: {}
                }
            }, {
                type: types.REQUEST_TIMETABLE,
                key: '1_1_1'
            })
        ).toEqual({
            "1_1_0": {
                isFetching: true,
                didInvalidate: false,
                lastUpdated: '',
                data: {}
            },
            "1_1_1": {
                isFetching: true,
                didInvalidate: false,
                lastUpdated: '',
                data: {}
            }
        })

        expect(
            todos({
                "1_1_0": {
                    isFetching: true,
                    didInvalidate: false,
                    lastUpdated: '',
                    data: {}
                },
                "1_1_1": {
                    isFetching: true,
                    didInvalidate: false,
                    lastUpdated: '',
                    data: {}
                }
            }, {
                type: types.REQUEST_TIMETABLE,
                key: '1_1_2'
            })
        ).toEqual({
            "1_1_0": {
                isFetching: true,
                didInvalidate: false,
                lastUpdated: '',
                data: {}
            },
            "1_1_1": {
                isFetching: true,
                didInvalidate: false,
                lastUpdated: '',
                data: {}
            },
            "1_1_2": {
                isFetching: true,
                didInvalidate: false,
                lastUpdated: '',
                data: {}
            }
        })
    })

    it('should handle REQUEST_TIMETABLE_SUCCESS', () => {
        expect(
            todos({
                "1_1_0": {
                    isFetching: true,
                    didInvalidate: false,
                    lastUpdated: '',
                    data: {}
                },
                "1_1_1": {
                    isFetching: true,
                    didInvalidate: false,
                    lastUpdated: '',
                    data: {}
                }
            }, {
                type: types.REQUEST_TIMETABLE_SUCCESS,
                key: '1_1_0',
                data: {obj: 'object'},
                receivedAt: '12345678'
            })
        ).toEqual({
            "1_1_0": {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: '12345678',
                data: {obj: 'object'}
            },
            "1_1_1": {
                isFetching: true,
                didInvalidate: false,
                lastUpdated: '',
                data: {}
            }
        })
    })

    it('should handle REQUEST_TIMETABLE_FAIL', () => {
        expect(
            todos({
                "1_1_0": {
                    isFetching: true,
                    didInvalidate: false,
                    lastUpdated: '',
                    data: {}
                },
                "1_1_1": {
                    isFetching: true,
                    didInvalidate: false,
                    lastUpdated: '',
                    data: {}
                }
            }, {
                type: types.REQUEST_TIMETABLE_FAIL,
                key: '1_1_0'
            })
        ).toEqual({
            "1_1_0": {
                isFetching: false,
                didInvalidate: true,
                lastUpdated: '',
                data: {}
            },
            "1_1_1": {
                isFetching: true,
                didInvalidate: false,
                lastUpdated: '',
                data: {}
            }
        })
    })
})