import moment from 'moment'

export default {
    methods:  {
        /*
        **  Returns the long text for a leave type
        */
        leave_type (type ) {
            return type.toUpperCase() === 'S' ? 'Sick' : 'Vacation';
        },
        
        /*
        **  Returns the long text for a compensation type
        */
        compensation_type (type ) {
            return type.toUpperCase() === 'L' ? 'Leave' : 'Undertime';
        },

        /*
        **  Adds 's' for basic plurals, as applicable 
        */
        basic_pluralize (term , count , returnWithCount = false) {
            const lastCharacter = term.charAt(term.length - 1);
            const uppercase = lastCharacter == lastCharacter.toUpperCase();

            return (returnWithCount ? (count + " ") : "")
                + (count == 1 ? term : (term + (uppercase ? 'S' : 's')));

        },

        /*
        **  Returns the long text for a status type
        */
        status_type (type )  {
            let statusType = 'Not yet compensated';

            if (type.toUpperCase() === 'P') {
                statusType = 'Partially compensated';
            } else if (type.toUpperCase() === 'F') {
                statusType = 'Fully compensated'
            }

            return statusType;
        },

        /*
        **  Returns the complete reason to be used for filing.
        */
        leave_reason (type, reason, overrideReason ) {
            let leaveReason = '';

            if (overrideReason.trim() != '') {
                leaveReason = overrideReason;
            } else {
                if (type.toUpperCase() === 'S') {
                    leaveReason = 'I was on sick leave because ';
                } else {
                    leaveReason = 'Taking time off ';
                }

                leaveReason += reason;
            }

            leaveReason += '.';

            return leaveReason;
        },

        /*
        **  Returns the complete compensation plan to be used for filing.
        */
        compensation_plan (compensateOn) {
            return 'I will compensate for this on ' + compensateOn + '.';
        },

        compensation_description (targetDate, workDate, hoursWorked, hoursRemaining, isPartial, isAdvanced) {
            let descr = 'Worked ' + hoursWorked + ' extra ' + this.basic_pluralize('hour', hoursWorked) + 
                ' on ' + moment(workDate, 'YYYY-MM-DD').format('DD-MMM-YYYY') + ', as ';

            descr += ((isPartial ? 'partial' : 'full') + ' compensation for my leave ')

            descr += ((isAdvanced ? 'this coming' : 'on') + ' ' + moment(targetDate, 'YYYY-MM-DD').format('DD-MMM-YYYY') + '. ')

            if (hoursRemaining > 0) {
                descr += 'Remaining time to compensate: ' + this.basic_pluralize('hour', hoursRemaining, true)
            } else {
                descr += 'This completes my required compensation for the indicated leave.'
            }

            return descr;
        }, 

        get_date_range_display (startDate, endDate, format = 'MMM DD, YYYY') {
            let dateRange = moment(startDate, 'YYYY-MM-DD').format(format)
            
            if (startDate != endDate) {
                dateRange += (' - ' + moment(endDate, 'YYYY-MM-DD').format(format))
            }

            return dateRange
        }
    }
}