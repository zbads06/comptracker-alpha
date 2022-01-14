<template>
    <div class="compensation-data">
        <div class="row input-row">
            <div class="col-sm-4 input-div">
                <label for="targetType" class="form-label">Target Type</label>
                <select class="form-select" aria-label="Target Type" v-model="compensation.targetType">
                    <option selected value="L">Leave</option>
                    <!-- Todo -- consider undertimes -->
                    <!-- <option value="U">Undertime</option> -->
                </select>
            </div>
            <div class="col-sm-4 input-div">
                <label for="targetItem" class="form-label">Target Item</label>
                <select class="form-select" aria-label="Target Item" v-model="compensation.targetId">
                    <option v-for="(leave, index) in this.$store.state.leaves" :key="leave.id" :value="leave.id" :selected="index == 0">
                        {{ get_date_range_display(leave.startDate, leave.endDate) }}
                    </option>
                </select>
            </div>
            <div class="col-sm-4 input-div">
                <label for="targetItem" class="form-label">Target Date</label>
                <select class="form-select" aria-label="Target Date" v-model="compensation.targetDate">
                </select>
            </div>
        </div>

        <div class="row input-row">
            <div class="col-sm-4 input-div">
                <label for="workDate" class="form-label">Compensation Date</label>
                <input type="date" class="form-control" v-model="compensation.workDate">
            </div>
            <div class="col-sm-4 input-div">
                <label for="timeStart" class="form-label">Compensation Time (Start)</label>
                <input type="time" class="form-control" v-model="compensation.timeStart">
            </div>
            <div class="col-sm-4 input-div">
                <label for="timeEnd" class="form-label">Compensation Time (End)</label>
                <input type="time" class="form-control" v-model="compensation.timeEnd">
            </div>
        </div>
        

        <div class="row input-row mt-4">
            <div class="col-sm-12 input-div">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted"><strong>Summary</strong></h6>

                        <div class="row input-row">
                            <div class="col-sm-12 input-div">
                                <label for="filingDescription" class="form-label">Filing Description</label>
                                <input type="text" class="form-control" :value="filingDescription" disabled="disabled" readonly>
                            </div>
                        </div>
                        
                        <div class="row input-row">
                            <div class="col-sm-6 input-div">
                                <label for="hoursWorked" class="form-label">Hours Worked</label>
                                <input type="text" class="form-control" :value="hoursWorked" disabled="disabled" readonly>
                            </div>
                            <div class="col-sm-6 input-div">
                                <label for="remainingHours" class="form-label">Remaining Hours</label>
                                <input type="text" class="form-control" :value="remainingHours" disabled="disabled" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import computeMixin from '@/lib/mixins/compute.mixin.js'
    import formatMixin from '@/lib/mixins/format.mixin.js'

    export default {
        name: 'CompensationDataComponent',
        mixins: [computeMixin, formatMixin],
        props: {
            compensation: Object,
            isUpdate: {
                type: Boolean,
                default: false
            },
        },
        created () {
            this.getLeaveDates(1)
        },
        watch: {
            'compensation.timeStart' () {
                if (this.compensation.timeStart != '' && this.compensation.timeEnd == '') {
                    this.compensation.timeEnd = this.compensation.timeStart
                }
            }
        },
        computed: {
            filingDescription () {
                return '';
            },
            hoursWorked () {
                return ''
            },
            remainingHours () {
                return ''
            }
        },
        methods: {
            resetCompensationData () {
                this.compensation.targetType = 'L'
                this.compensation.targetId = ''
                this.compensation.isAdvanced = false
                this.compensation.isPartial = false
                this.compensation.targetDate = ''
                this.compensation.workDate = ''
                this.compensation.timeStart = ''
                this.compensation.timeEnd = ''
                this.compensation.hoursWorked = ''
                this.compensation.hoursRemaining = false
            },
            getLeaveDates (/*id*/) {
                let dates = []
                // TODO
                // const data = this.$store.getters.getLeaveById(id)

                // const startDate = moment(data.leave.startDate, 'YYYY-MM-DD')
                // const endDate = moment(data.leave.endDate, 'YYYY-MM-DD')

                // let currentDate = startDate

                // while (currentDate != endDate) {
                //     currentDate = dates.push(currentDate.add(1, 'day'))
                // }

                return dates
            }
        }
    }
</script>

<style scoped>
    .form-label,
    .form-control,
    .form-select {
        font-size: 90% !important;
    }
    
    .input-row {
        margin-top: 10px;
    }

    .input-div {
        text-align: left !important;
    }
</style>