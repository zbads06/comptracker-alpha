<template>
    <div class="leave-data">
        <div class="row input-row">
            <div class="col-sm-4 input-div">
                <label for="leaveType" class="form-label">Leave Type</label>
                <select class="form-select" aria-label="Leave type" v-model="leave.type">
                    <option selected value="V">Vacation Leave</option>
                    <option value="S">Sick Leave</option>
                </select>
            </div>
            <div class="col-sm-4 input-div">
                <label for="startDate" class="form-label">Start Date</label>
                <input type="date" class="form-control" v-model="leave.startDate">
            </div>
            <div class="col-sm-4 input-div">
                <label for="endDate" class="form-label">End Date</label>
                <input type="date" class="form-control" v-model="leave.endDate">
            </div>
        </div>

        <div class="row input-row">
            <div class="col-sm-4 input-div">
                <label for="baseReason" class="form-label">Base Reason</label>
                <input type="text" class="form-control" v-model="leave.baseReason">
            </div>
            <div class="col-sm-4 input-div">
                <label for="overrideFullReason" class="form-label">Override Full Reason</label>
                <input type="text" class="form-control" v-model="leave.overrideFullReason">
            </div>
            <div class="col-sm-4 input-div">
                <label for="compensateOn" class="form-label">Compensate On</label>
                <input type="text" class="form-control" v-model="leave.compensateOn">
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
                                <label for="durationInDays" class="form-label">Duration (in days)</label>
                                <input type="text" class="form-control" :value="durationInDays" disabled="disabled" readonly>
                            </div>
                            <div class="col-sm-6 input-div">
                                <label for="durationInHours" class="form-label">Duration (in hours)</label>
                                <input type="text" class="form-control" :value="durationInHours" disabled="disabled" readonly>
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
        name: 'LeaveDataComponent',
        mixins: [computeMixin, formatMixin],
        props: {
            leave: Object,
            isUpdate: {
                type: Boolean,
                default: false
            },
        },
        watch: {
            'leave.startDate' () {
                if (this.leave.startDate != '' && this.leave.endDate == '') {
                    this.leave.endDate = this.leave.startDate
                }
            }
        },
        computed: {
            filingDescription () {
                const leaveDesc = (this.leave.baseReason.trim() != '' || this.leave.overrideFullReason.trim() != '') ? this.leave_reason(this.leave.type, this.leave.baseReason, this.leave.overrideFullReason) : '';
                const compensationDesc = this.leave.compensateOn.trim() != '' ? this.compensation_plan(this.leave.compensateOn) : '';

                return (leaveDesc + ' ' + compensationDesc).trim();
            },
            durationInDays () {
                const duration = this.leave.startDate === this.leave.endDate ? 1 : this.date_scope_in_days(this.leave.startDate, this.leave.endDate);
                return duration + ' ' + this.basic_pluralize('day', duration);
            },
            durationInHours () {
                const duration = this.leave.startDate === this.leave.endDate ? 1 : this.date_scope_in_hours(this.leave.startDate, this.leave.endDate);
                return duration + ' ' + this.basic_pluralize('hour', duration);
            }
        },
        methods: {
            resetLeaveData () {
                this.leave.type = 'V'
                this.leave.startDate = ''
                this.leave.endDate = ''
                this.leave.baseReason = ''
                this.leave.overrideFullReason = ''
                this.leave.compensateOn = ''
                this.leave.status = 'N'
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