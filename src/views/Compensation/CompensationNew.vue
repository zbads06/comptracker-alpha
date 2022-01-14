<template>
    <div class="compensations">
        <h1>New Compensation</h1>

        <div class="row">
            <div class="col-sm-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/compensations">Compensations</a></li>
                        <li class="breadcrumb-item active" aria-current="page">New Compensation</li>
                    </ol>
                </nav>
            </div>
        </div>

        <compensation-data :compensation="compensation" ref="compensationDataComponent"></compensation-data>
        
        <div class="row complete-action-section">
            <div class="col-sm-12">
                <button class="btn btn-success add-button" @click="saveCompensation">
                    <i class="fa fa-check action-icon"></i> Save new compensation
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import computeMixin from '@/lib/mixins/compute.mixin.js'
    import formatMixin from '@/lib/mixins/format.mixin.js'

    import CompensationDataComponent from '@/components/Compensation/CompensationData.vue'

    export default {
        name: 'CompensationNewPage',
        mixins: [computeMixin, formatMixin],
        components: {
            'compensation-data': CompensationDataComponent
        },
        data () {
            return {
                compensation: {
                    targetType: 'L',
                    targetId: '',
                    isAdvanced: false,
                    isPartial: false,
                    targetDate: '',
                    workDate: '',
                    timeStart: '',
                    timeEnd: '',
                    hoursWorked: '',
                    hoursRemaining: false,
                }, 
            }
        },
        methods: {
            saveCompensation () {
                this.$store.dispatch('saveNewCompensation', this.compensation)
                this.$refs.compensationDataComponent.resetCompensationData();
            }, 
        }
    }
</script>

<style scoped>
    

    .action-icon {
        margin-right: 5px; 
        cursor: pointer;
    }

    .add-button {
        font-size: 90%;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .complete-action-section {
        margin-top: 30px;
    }
</style>