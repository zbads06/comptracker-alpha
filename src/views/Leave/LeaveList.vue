<template>
    <div class="leaves">
        <h1>Leaves</h1>

        <div class="row">
            <div class="col-sm-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active" aria-current="page">Leaves</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="row action-section new-action">
            <div class="col-sm-12">
                <a class="btn btn-success add-button" href="/leaves/new">
                    <i class="fa fa-plus-circle action-icon"></i> Record new leave
                </a>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <!-- Todo -- consider holidays and half days -->
                                <!-- <th>Duration</th> -->
                                <th width="8%">Start Date</th>
                                <th width="8%">End Date</th>
                                <th>Compensated Hours</th>
                                <th>Status</th>
                                <th>Filing Description</th>
                                <th class="text-center"><i class="fas fa-ellipsis-h"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-left" v-for="record in this.$store.state.leaves" :key="record.id">
                                <td>{{ leave_type(record.type) }}</td>
                                <!-- Todo -- consider holidays and half days -->
                                <!-- <td>{{ record.duration + ' ' + basic_pluralize('day', record.duration) }}</td> -->
                                <td>{{ record.startDate }}</td>
                                <td>{{ record.endDate }}</td>
                                <td>{{ getCompensatedHours(record.id) + ' of ' + date_scope_in_hours(record.startDate, record.endDate) + ' ' + basic_pluralize('hour', record.totalHours) }}</td>
                                <td>{{ status_type(record.status) }}</td>
                                <td class="text-left">
                                    <!-- <div class="action-function copy-function">
                                        <span class="far fa-copy copy-icon"></span> Copy
                                    </div> -->
                                    {{ leave_reason(record.type, record.baseReason, record.overrideFullReason) + ' ' + compensation_plan(record.compensateOn) }}
                                </td>
                                <td>
                                    <router-link :to="{path: '/leaves/edit/' + record.id}">
                                        <div class="action-function edit-function">
                                            <i class="far fa-edit edit-icon"></i>Edit
                                        </div>
                                    </router-link>
                                    <div class="action-function delete-function" @click="deleteLeave(record.id)">
                                        <i class="far fa-trash-alt delete-icon"></i>Del
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import computeMixin from '@/lib/mixins/compute.mixin.js'
    import formatMixin from '@/lib/mixins/format.mixin.js'

    export default {
        name: 'LeaveListPage',
        mixins: [computeMixin, formatMixin],
        created () {
            // this.$store.commit('resetData')
        },
        data () {
            return {

            }
        },
        computed: {
        },
        methods: {
            deleteLeave (leaveId) {
                this.$store.dispatch('deleteLeave', leaveId)
            },
            getCompensatedHours (leaveId) {
                const compensations = this.$store.getters.getLeaveCompensation(leaveId)
                
                let vm = this
                let totalHours = 0;
                
                compensations.forEach(function (compensation) {
                    totalHours += vm.time_difference_in_hours(compensation.timeStart, compensation.timeEnd)
                })

                return totalHours;
            }
        }
    }
</script>

<style scoped>
    table {
        text-align: left;
        font-size: 90%;
    }

    td {
        vertical-align: middle;
        font-size: 90%;
    }

    .action-function {
        padding: 5px;
        width: 80px;
        cursor: pointer;
        text-align: center;
        font-size: 80%;
        border-radius: 10px;
    }

    .copy-function {
        background-color: steelblue;
        color: white;
    }

    .edit-function {
        background-color: slategray;
        color: white;
    }

    .delete-function {
        background-color: red;
        color: white;
        margin-top: 5px;
    }

    .copy-icon {
        margin-right: 5px; 
        /* color: steelblue; */
    }

    .edit-icon {
        margin-right: 5px; 
        cursor: pointer;
    }

    .delete-icon {
        margin-right: 5px; 
        cursor: pointer;
    }

    .action-section {
        margin-top: 10px;
        margin-bottom: 15px;
        text-align: left;
    }

    .action-icon {
        margin-right: 5px; 
        cursor: pointer;
    }

    .add-button {
        font-size: 90%;
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>