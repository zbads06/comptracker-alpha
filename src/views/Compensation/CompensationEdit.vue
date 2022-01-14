<template>
    <div class="compensations">
        <h1>Edit Compensation</h1>

        <div class="row">
            <div class="col-sm-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/compensations">Compensations</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit Compensation</li>
                    </ol>
                </nav>
            </div>
        </div>

        <compensation-data :compensation="compensation" :is-update="true"></compensation-data>
        
        <div class="row complete-action-section">
            <div class="col-sm-12">
                <button class="btn btn-success add-button" @click="saveCompensation">
                    <i class="fa fa-check action-icon"></i> Update compensation
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
        name: 'CompensationEditPage',
        mixins: [computeMixin, formatMixin],
        components: {
            'compensation-data': CompensationDataComponent
        },
        created () {
            this.id = this.$route.params.id

            const data = this.compensationData

            if (data.compensation === undefined) {
                this.$router.push({path: '/compensations'})
            } else {
                this.index = data.index
                this.compensation = data.compensation
            }
        },
        data () {
            return {
                id: 0,
                index: 0,
                compensation: {
                    id: 0,
                    type: 'V',
                    // Todo -- consider holidays and half days
                    // duration: 2,
                    // totalHours: 17,
                    startDate: '',
                    endDate: '',
                    // Todo -- consider holidays and half days
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
                    baseReason: '',
                    overrideFullReason: '',
                    compensateOn: '',
                    status: 'N'
                }, 
            }
        },
        computed: {
            compensationData () {
                return this.$store.getters.getCompensationById(this.id)
            }
        },
        methods: {
            saveCompensation () {
                this.$store.dispatch('updateCompensation', {
                    index: this.index,
                    compensation: this.compensation
                })
            }
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