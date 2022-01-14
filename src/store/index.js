import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        lastLeaveId: 3,
        lastCompensationId: 3,
        leaves: [
            {
                id: 1,
                type: 'V',
                // Todo -- consider holidays
                // duration: 2,
                // totalHours: 17,
                startDate: '2022-01-01',
                endDate: '2022-01-02',
                // Todo -- consider holidays
                // dates: [
                //     {
                //         date: '2022-01-01',
                //         hours: 8.5,
                //     },
                //     {
                //         date: '2022-01-02',
                //         hours: 8.5,
                //     }
                // ],
                baseReason: 'to celebrate holidays',
                overrideFullReason: '',
                compensateOn: '2022-Jan',
                status: 'N'
            }, {
                id: 2,
                type: 'S',
                // Todo -- consider holidays
                // duration: 1,
                // totalHours: 8.5,
                startDate: '2021-12-27',
                endDate: '2021-12-27',
                // Todo -- consider holidays
                // dates: [],
                baseReason: 'of headache and body pain',
                overrideFullReason: '',
                compensateOn: '2022-Jan',
                status: 'N'
            }
        ],
        compensations: [
            {
                id: 1,
                targetType: 'L',
                targetId: 1,
                isAdvanced: false,
                isPartial: true,
                targetDate: '2021-12-27',
                workDate: '2022-01-03',
                timeStart: '08:00:00',
                timeEnd: '10:00:00',
                hoursWorked: 2,
                hoursRemaining: 6.5,
            }, {
                id: 2,
                targetType: 'L',
                targetId: 1,
                isAdvanced: false,
                isPartial: true,
                targetDate: '2021-12-27',
                workDate: '2022-01-04',
                timeStart: '08:00:00',
                timeEnd: '10:00:00',
                hoursWorked: 2,
                hoursRemaining: 4.5,
            },
        ]
    },
    getters: {
        getLeaveById (state) {
            return function (id) {
                const index = state.leaves.findIndex(leave => leave.id == id)
                
                return {
                    index: index,
                    leave: state.leaves[index]
                }
            }
        },
        getCompensationById (state) {
            return function (id) {
                const index = state.compensations.findIndex(compensation => compensation.id == id)
                
                return {
                    index: index,
                    compensation: state.compensations[index]
                }
            }
        },

        getLeaveCompensation (state) {
            return function (id) {
                const leaveCompensations = state.compensations.filter(function (compensation) {
                    return compensation.targetType == 'L' && compensation.targetId == id;
                })

                return leaveCompensations;
            }
        }
    },
    mutations: {
        incrementLeaveId (state) {
            state.lastLeaveId++
        },
        addLeaveItem (state, leave) {
            leave.id = state.lastLeaveId
            state.leaves.push(leave)
        },
        deleteLeaveItem (state, id) {
            const index = state.leaves.findIndex(leave => leave.id == id)
            state.leaves.splice(index, 1)
        },
        updateLeaveItem (state, {index, leave}) {
            state.leaves[index] = leave
        },
        
        incrementCompensationId (state) {
            state.lastCompensationId++
        },
        addCompensationItem (state, compensation) {
            compensation.id = state.lastCompensationId
            state.compensations.push(compensation)
        },
        deleteCompensationItem (state, id) {
            const index = state.compensations.findIndex(compensation => compensation.id == id)
            state.compensations.splice(index, 1)
        },
        updateCompensationItem (state, {index, compensation}) {
            state.compensations[index] = compensation
        },

        resetData (state) {
            state.lastLeaveId = 3
            state.lastCompensationId = 3
            
            state.leaves = [
                {
                    id: 1,
                    type: 'V',
                    startDate: '2022-01-01',
                    endDate: '2022-01-02',
                    baseReason: 'to celebrate holidays',
                    overrideFullReason: '',
                    compensateOn: '2022-Jan',
                    status: 'N'
                  },
                  {
                    id: 2,
                    type: 'S',
                    startDate: '2021-12-27',
                    endDate: '2021-12-27',
                    baseReason: 'of headache and body pain',
                    overrideFullReason: '',
                    compensateOn: '2022-Jan',
                    status: 'N'
                  }
            ]

            state.compensations = [
                {
                    id: 1,
                    targetType: 'L',
                    targetId: 1,
                    isAdvanced: false,
                    isPartial: true,
                    targetDate: '2021-12-27',
                    workDate: '2022-01-03',
                    timeStart: '08:00:00',
                    timeEnd: '10:00:00',
                    hoursWorked: 2,
                    hoursRemaining: 6.5,
                }, {
                    id: 2,
                    targetType: 'L',
                    targetId: 1,
                    isAdvanced: false,
                    isPartial: true,
                    targetDate: '2021-12-27',
                    workDate: '2022-01-04',
                    timeStart: '08:00:00',
                    timeEnd: '10:00:00',
                    hoursWorked: 2,
                    hoursRemaining: 4.5,
                },
            ]
        }
    },
    actions: {
        saveNewLeave ({commit}, leave) {
            commit('addLeaveItem', leave)
            commit('incrementLeaveId')
        },
        deleteLeave ({commit}, id) {
            commit('deleteLeaveItem', id)
        },
        updateLeave ({commit}, {index, leave}) {
            commit('updateLeaveItem', {index, leave})
        },

        saveNewCompensation ({commit}, compensation) {
            commit('addCompensationItem', compensation)
            commit('incrementCompensationId')
        },
        updateCompensation ({commit}, {index, compensation}) {
            commit('updateCompensationItem', {index, compensation})
        },
        deleteCompensation ({commit}, id) {
            commit('deleteCompensationItem', id)
        },
    },
    modules: {
    },
    plugins: [createPersistedState()]
})
