import moment from 'moment'

export default {
    methods:  {
        /*
        **  Computes the difference between two dates (in days)
        */
        date_difference_in_days (startDate, endDate, inclusive = false) {
            let duration = 0;

            if (startDate != '' && endDate != '') {
                const startDateLoc = moment(startDate, 'YYYY-MM-DD');
                const endDateLoc = moment(endDate, 'YYYY-MM-DD');

                duration = moment.duration(endDateLoc.diff(startDateLoc)).asDays() + (inclusive ? 1 : 0)
            }
            
            return duration;
        },

        /*
        **  Computes the difference between two dates (in hours)
        */
        date_difference_in_hours (startDate, endDate, inclusive = false) {
            return this.date_difference_in_days(startDate, endDate, inclusive) * 8.5;
        },

        /*
        **  Computes the scope between two dates (in days)
        */
        date_scope_in_days (startDate, endDate) {
            return this.date_difference_in_days(startDate, endDate, true);
        },

        /*
        **  Computes the scope between two dates (in hours)
        */
        date_scope_in_hours (startDate, endDate) {
            return this.date_difference_in_hours(startDate, endDate, true);
        },
        
        /*
        **  Computes the difference between two times (in hours)
        */
        time_difference_in_hours (startTime, endTime) {
            const startTimeLoc = moment(startTime, 'HH:mm:ss')
            const endTimeLoc = moment(endTime, 'HH:mm:ss')

            let duration = moment.duration(endTimeLoc.diff(startTimeLoc));

            return parseInt(duration.asHours() | 0)
        },
    }
}