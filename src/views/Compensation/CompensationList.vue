<template>
    <div class="compensations">
        <h1>Compensations</h1>

        <div class="row">
            <div class="col-sm-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active" aria-current="page">Compensations</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="row action-section new-action">
            <div class="col-sm-12">
                <a class="btn btn-success add-button" href="/compensations/new">
                    <i class="fa fa-plus-circle action-icon"></i> Record new compensation
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
                                <th class="text-center" width="8%">Is Advanced</th>
                                <th class="text-center" width="8%">Is Partial</th>
                                <th>Target Date</th>
                                <th>Remaining Hours</th>
                                <th>Compensated On</th>
                                <th>Filing Description</th>
                                <th class="text-center"><i class="fas fa-ellipsis-h"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-left" v-for="record in this.$store.state.compensations" :key="record.id">
                                <td>{{ compensation_type(record.targetType) }}</td>
                                <td class="text-center">
                                    <span class="fa fa-check" v-if="record.isAdvanced"></span>
                                    <span class="fa fa-times" v-else></span>
                                </td>
                                <td class="text-center">
                                    <span class="fa fa-check" v-if="record.isPartial"></span>
                                    <span class="fa fa-times" v-else></span>
                                </td>
                                <td>{{ record.targetDate }}</td>
                                <td>{{ record.hoursRemaining }}</td>
                                <td>{{ record.workDate }}</td>
                                <td class="text-left">
                                    <!-- <div class="action-function copy-function">
                                        <span class="far fa-copy copy-icon"></span> Copy
                                    </div> -->
                                    {{ compensation_description(record.targetDate, record.workDate, record.hoursWorked, record.hoursRemaining, record.isPartial, record.isAdvanced) }}
                                </td>
                                <td>
                                    <router-link :to="{path: '/compensations/edit/' + record.id}">
                                        <div class="action-function edit-function">
                                            <i class="far fa-edit edit-icon"></i>Edit
                                        </div>
                                    </router-link>
                                    <div class="action-function delete-function" @click="deleteCompensation(record.id)">
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
        name: 'CompensationListPage',
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
            deleteCompensation (compensationId) {
                this.$store.dispatch('deleteCompensation', compensationId)
            },
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