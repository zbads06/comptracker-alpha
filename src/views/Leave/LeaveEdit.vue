<template>
    <div class="leaves">
        <h1>Edit Leave</h1>

        <div class="row">
            <div class="col-sm-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/leaves">Leaves</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit Leave</li>
                    </ol>
                </nav>
            </div>
        </div>

        <leave-data :leave="leave" :is-update="true"></leave-data>
        
        <div class="row complete-action-section">
            <div class="col-sm-12">
                <button class="btn btn-success add-button" @click="saveLeave">
                    <i class="fa fa-check action-icon"></i> Update leave
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
        name: 'LeaveEditPage',
        mixins: [computeMixin, formatMixin],
        components: {
            'leave-data': LeaveDataComponent
        },
        created () {
            this.id = this.$route.params.id

            const data = this.leaveData

            if (data.leave === undefined) {
                this.$router.push({path: '/leaves'})
            } else {
                this.index = data.index
                this.leave = data.leave
            }
        },
        data () {
            return {
                id: 0,
                index: 0,
                leave: {
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
            leaveData () {
                return this.$store.getters.getLeaveById(this.id)
            }
        },
        methods: {
            saveLeave () {
                this.$store.dispatch('updateLeave', {
                    index: this.index,
                    leave: this.leave
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