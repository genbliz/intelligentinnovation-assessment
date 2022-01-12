"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateService = void 0;
class DateServiceBase {
    getStartOfTheDay(date) {
        const dt = new Date(date);
        const datePart = this.getDateFormat_YYYY_MM_DD(dt);
        const d = new Date(`${datePart}T00:00:00.000Z`);
        return d;
    }
    getEndOfTheDay(date) {
        const dt = new Date(date);
        const datePart = this.getDateFormat_YYYY_MM_DD(dt);
        const d = new Date(`${datePart}T23:59:59.000Z`);
        return d;
    }
    isDate(dt) {
        try {
            const _date = new Date(dt);
            const check0 = dt && typeof _date.getDate !== 'undefined';
            const check1 = !isNaN(Date.parse(_date.toISOString()));
            const check2 = _date instanceof Date && !isNaN(_date.valueOf());
            return check0 && check1 && check2;
        }
        catch (err) {
            return false;
        }
    }
    addYears(date, years) {
        const _dt = new Date(date);
        _dt.setFullYear(_dt.getFullYear() + years);
        return _dt;
    }
    addMonths(date, months) {
        const _dt = new Date(date);
        _dt.setMonth(_dt.getMonth() + months);
        return _dt;
    }
    addDays(date, days) {
        const _dt = new Date(date);
        _dt.setDate(_dt.getDate() + days);
        return _dt;
    }
    addHours(date, hours) {
        const _dt = new Date(date);
        _dt.setHours(_dt.getHours() + hours);
        return _dt;
    }
    addMinutes(date, minutes) {
        const _dt = new Date(date);
        _dt.setMinutes(_dt.getMinutes() + minutes);
        return _dt;
    }
    addSeconds(date, seconds) {
        const _dt = new Date(date);
        _dt.setSeconds(_dt.getSeconds() + seconds);
        return _dt;
    }
    addMilliseconds(date, milliseconds) {
        const _dt = new Date(date);
        _dt.setMilliseconds(_dt.getMilliseconds() + milliseconds);
        return _dt;
    }
    convertDateToEpochTime(date) {
        const epoc = Math.floor(new Date(date).getTime() / 1000.0);
        return epoc;
    }
    convertEpochTimeToDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return date;
    }
    getDateDiffDays(_date1, _date2) {
        const oneDay = 24 * 60 * 60 * 1000;
        const date1 = new Date(this.getStartOfTheDay(_date1)).getTime();
        const date2 = new Date(this.getStartOfTheDay(_date2)).getTime();
        const diff = Math.round(Math.abs(date2 - date1)) / oneDay;
        return diff;
    }
    getDateDiffMunites(_date1, _date2) {
        const oneMunite = 60 * 1000;
        const date1 = new Date(_date1).getTime();
        const date2 = new Date(_date2).getTime();
        const diff = Math.round(Math.abs(date2 - date1)) / oneMunite;
        return diff;
    }
    padStart(value, maxLength, fillingValue) {
        const _val = `${value}`.padStart(maxLength, `${fillingValue}`.toString());
        return _val.toString().trim();
    }
    getTimeStampVariables(date) {
        const _now = date ? new Date(date) : new Date();
        return {
            milliseconds: this.padStart(_now.getMilliseconds(), 4, 0),
            seconds: this.padStart(_now.getSeconds(), 2, 0),
            minutes: this.padStart(_now.getMinutes(), 2, 0),
            hours: this.padStart(_now.getHours(), 2, 0),
            day: this.padStart(_now.getDate(), 2, 0),
            month: this.padStart(_now.getMonth() + 1, 2, 0),
            year: `${_now.getFullYear()}`
        };
    }
    isValidFormat_YYYY_MM_DD(dateString) {
        if (!(dateString && typeof dateString === 'string')) {
            return false;
        }
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!regEx.test(dateString)) {
            return false;
        }
        const pdate = dateString.split('-');
        if (pdate?.length !== 3) {
            return false;
        }
        const [yyyy, mm, dd] = pdate.map((dt) => parseInt(dt));
        if (!(mm >= 1 && mm <= 12)) {
            return false;
        }
        const listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const isNonLeapYearMonth = mm === 1 || mm > 2;
        if (isNonLeapYearMonth) {
            if (dd > listOfDays[mm - 1]) {
                return false;
            }
        }
        else {
            let lyear = false;
            if ((!(yyyy % 4) && yyyy % 100) || !(yyyy % 400)) {
                lyear = true;
            }
            if (lyear === false && dd >= 29) {
                return false;
            }
            if (lyear === true && dd > 29) {
                return false;
            }
        }
        const d = new Date(dateString);
        const dNum = d.getTime();
        if (!dNum && dNum !== 0) {
            return false;
        }
        const check1 = d.toISOString().slice(0, 10) === dateString;
        const check2 = d.toISOString().split('T')[0] === dateString;
        return check1 && check2;
    }
    getDateFormat_YYYY_MM_DD(date) {
        const _dt = date ? new Date(date) : new Date();
        const dt = this.getTimeStampVariables(_dt);
        return [dt.year, '-', dt.month, '-', dt.day].join('');
    }
    getTimeFormat_HH_MM_SS_ms(date) {
        const _date = date ? new Date(date) : new Date();
        const dt = this.getTimeStampVariables(_date);
        return [dt.hours, dt.minutes, dt.seconds, dt.milliseconds].join('-');
    }
    getDatesArray_YYYY_MM_DD({ fromDate, toDate }) {
        const isDateFrom = this.isDate(fromDate);
        const isDateTo = this.isDate(toDate);
        if (!(isDateFrom && isDateTo)) {
            throw new Error('Invalid date');
        }
        const _fromDate = new Date(fromDate);
        const _toDate = new Date(toDate);
        const days = this.getDateDiffDays(_fromDate, _toDate);
        if (!(days >= 0)) {
            throw new Error('Invalid day range');
        }
        const _days = days + 1;
        const datesArray = Array(_days)
            .fill(0)
            .map((_, index) => index)
            .map((add) => this.addDays(_fromDate, add))
            .map((date) => this.getDateFormat_YYYY_MM_DD(date))
            .map((datePart) => datePart);
        return Array.from(new Set(datesArray));
    }
}
exports.DateService = new DateServiceBase();
//# sourceMappingURL=date-service.js.map