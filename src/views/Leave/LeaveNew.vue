<template>
    <div class="leaves">
        <h1>New Leave</h1>

        <div class="row">
            <div class="col-sm-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/leaves">Leaves</a></li>
                        <li class="breadcrumb-item active" aria-current="page">New Leave</li>
                    </ol>
                </nav>
            </div>
        </div>

        <leave-data :leave="leave" ref="leaveDataComponent"></leave-data>
        
        <div class="row complete-action-section">
            <div class="col-sm-12">
                <button class="btn btn-success add-button" @click="saveLeave">
                    <i class="fa fa-check action-icon"></i> Save new leave
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import computeMixin from '@/lib/mixins/compute.mixin.js'
    import formatMixin from '@/lib/mixins/format.mixin.js'

    import LeaveDataComponent from '@/components/Leave/LeaveData.vue'

    export default {
        name: 'LeaveNewPage',
        mixins: [computeMixin, formatMixin],
        components: {
            'leave-data': LeaveDataComponent
        },
        data () {
            return {
                leave: {
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
        methods: {
            saveLeave () {
                this.$store.dispatch('saveNewLeave', this.leave)
                this.$refs.leaveDataComponent.resetLeaveData();
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