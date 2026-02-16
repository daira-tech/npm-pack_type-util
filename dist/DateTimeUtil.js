"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeUtil = void 0;
class DateTimeUtil {
    /**
     * Checks if the value is a valid date-time format
     * 値が有効な日付時間形式かどうかを確認します
     * @param value - 検証する値, The value to be validated
     * @returns {boolean} - 値が有効な日付時間形式であるかどうか, Whether the value is a valid date-time format
     */
    static isErrorDateTime(value) {
        try {
            const [datePart, timePart] = value.split(' ');
            const [year, month, day] = datePart.split('-').map(Number);
            let [hour, minute, sec] = [0, 0, 0];
            if (timePart !== undefined) {
                [hour, minute, sec] = timePart.split(':').map(Number);
            }
            const date = new Date(year, month - 1, day, hour, minute, sec);
            return year !== date.getFullYear() ||
                month !== date.getMonth() + 1 ||
                day !== date.getDate() ||
                hour !== date.getHours() ||
                minute !== date.getMinutes() ||
                sec !== date.getSeconds();
        }
        catch (error) {
            return true;
        }
    }
    /**
     * Generates a Date object from a string.
     * 文字列からDateオブジェクトを生成します。
     * @param dateString A string representing the date and time (e.g., "2023-10-05 14:30:00")
     * 日付と時間を表す文字列（例: "2023-10-05 14:30:00"）
     * @returns Date object
     * Dateオブジェクト
     */
    static toDateFromString(dateString) {
        const [datePart, timePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        let [hours, minutes, seconds] = [0, 0, 0];
        if (timePart !== undefined) {
            [hours, minutes, seconds] = timePart.split(':').map(Number);
        }
        return new Date(year, month - 1, day, hours, minutes, seconds);
    }
    /**
     * Formats the specified date.
     * 指定された日付をフォーマットします。
     * @param date The date object to be formatted.
     * フォーマットする対象の日付オブジェクト
     * @param type A string specifying the type of format.
     * フォーマットの種類を指定する文字列
     * @returns A formatted date string.
     * フォーマットされた日付文字列
     */
    static toStringFromDate(date, type) {
        const year = date.getFullYear().toString().padStart(4, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        switch (type) {
            case 'datetime':
                return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
            case 'date':
                return `${year}-${month}-${day}`;
            case 'time':
                return `${hour}:${minute}:${second}`;
            default:
                throw new Error('Invalid type');
        }
    }
    /**
     * Validates if the given value is in the format YYYY-MM-DD
     * 与えられた値がYYYY-MM-DD形式であるかどうかを検証します
     * @param value - The value to be validated, 検証する値
     * @returns {boolean} - Whether the value is in the format YYYY-MM-DD, 値がYYYY-MM-DD形式であるかどうか
     */
    static isYYYYMMDD(value) {
        if (typeof value !== 'string') {
            return false;
        }
        const pattern = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
        if (pattern.test(value) === false) {
            return false;
        }
        return this.isErrorDateTime(value) === false;
    }
    /**
     * Validates if the given value is in the format YYYY-MM-DD hh:mm:ss
     * 与えられた値がYYYY-MM-DD hh:mm:ss形式であるかどうかを検証します
     * @param value - The value to be validated, 検証する値
     * @returns {boolean} - Whether the value is in the format YYYY-MM-DD hh:mm:ss, 値がYYYY-MM-DD hh:mm:ss形式であるかどうか
     */
    static isYYYYMMDDhhmiss(value) {
        if (typeof value !== 'string') {
            return false;
        }
        const pattern = new RegExp('^\\d{4}-\\d{2}-\\d{2}[ T]\\d{2}:\\d{2}:\\d{2}$');
        if (pattern.test(value) === false) {
            return false;
        }
        return this.isErrorDateTime(value) === false;
    }
    /**
     * Validates if the given value is in the format YYYY-MM-DD hh:mm:ss
     * 与えられた値がYYYY-MM-DD hh:mm:ss形式であるかどうかを検証します
     * @param value - The value to be validated, 検証する値
     * @returns {boolean} - Whether the value is in the format YYYY-MM-DD hh:mm:ss, 値がYYYY-MM-DD hh:mm:ss形式であるかどうか
     */
    static isHHMM(value) {
        if (typeof value !== 'string') {
            return false;
        }
        const pattern = new RegExp('^(?:[01]\\d|2[0-3]):[0-5]\\d$');
        return pattern.test(value);
    }
    /**
     * Validates if the given value is in the format HH:MM:SS
     * 与えられた値がHH:MM:SS形式であるかどうかを検証します
     * @param value - The value to be validated, 検証する値
     * @returns {boolean} - Whether the value is in the format HH:MM:SS, 値がHH:MM:SS形式であるかどうか
     */
    static isHHMMSS(value) {
        if (typeof value !== 'string') {
            return false;
        }
        const pattern = new RegExp('^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$');
        return pattern.test(value);
    }
    static format(inputDate, format) {
        var _a, _b;
        if (typeof inputDate === 'string') {
            if (this.isErrorDateTime(inputDate) === true) {
                return format;
            }
            inputDate = this.toDateFromString(inputDate);
        }
        else if (isNaN(inputDate.getTime())) {
            return format;
        }
        // 曜日
        const jpnDay = ['日', '月', '火', '水', '木', '金', '土'][inputDate.getDay()];
        const engDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][inputDate.getDay()];
        const engDayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][inputDate.getDay()];
        format = format.replaceAll('jpnDay', jpnDay)
            .replaceAll('JpnDay', jpnDay)
            .replaceAll('dayShort', engDayShort)
            .replaceAll('DayShort', engDayShort)
            .replaceAll('Day', engDay)
            .replaceAll('day', engDay);
        // 年号
        const eraParts = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', { era: 'long', year: 'numeric' }).formatToParts(inputDate);
        const jpnEra = ((_a = eraParts.find(p => p.type === 'era')) === null || _a === void 0 ? void 0 : _a.value) || '';
        const jpnEraYear = ((_b = eraParts.find(p => p.type === 'year')) === null || _b === void 0 ? void 0 : _b.value) || '';
        format = format.replaceAll('jpnEra', jpnEra + jpnEraYear + '年')
            .replaceAll('JpnEra', jpnEra + jpnEraYear + '年');
        const year = inputDate.getFullYear().toString();
        format = format.replaceAll('yyyy', year.padStart(4, '0'))
            .replaceAll('YYYY', year.padStart(4, '0'))
            .replaceAll('YY', year.slice(-2));
        const month = (inputDate.getMonth() + 1).toString();
        format = format.replaceAll('MM', month.padStart(2, '0'))
            .replaceAll('mm', month.padStart(2, '0'))
            .replaceAll('m', month)
            .replaceAll('M', month);
        const day = inputDate.getDate().toString();
        format = format.replaceAll('dd', day.padStart(2, '0'))
            .replaceAll('DD', day.padStart(2, '0'))
            .replaceAll('d', day)
            .replaceAll('D', day);
        const hour = inputDate.getHours().toString();
        format = format.replaceAll('HH', hour.padStart(2, '0'))
            .replaceAll('hh', hour.padStart(2, '0'))
            .replaceAll('H', hour)
            .replaceAll('h', hour);
        const minute = inputDate.getMinutes().toString();
        format = format.replaceAll('mi', minute.padStart(2, '0'))
            .replaceAll('MI', minute.padStart(2, '0'))
            .replaceAll('i', minute)
            .replaceAll('I', minute);
        const second = inputDate.getSeconds().toString();
        format = format.replaceAll('ss', second.padStart(2, '0'))
            .replaceAll('SS', second.padStart(2, '0'))
            .replaceAll('s', second)
            .replaceAll('S', second);
        return format;
    }
}
exports.DateTimeUtil = DateTimeUtil;
