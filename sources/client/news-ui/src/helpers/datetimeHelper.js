import constant from 'common/constant';
import moment from 'moment';

const datetimeHelper = {
  formatDateToDateVN(input) {
    try {
      if (input) {
        let value = moment(input).format(constant.DATE_FORMAT_VN);
        return value;
      }
    } catch (error) {}
  },
  formatDatetimeToDateVN(input) {
    try {
      if (input) {
        let value = moment(input).format(constant.DATETIME_FORMAT_VN);
        return value;
      }
    } catch (error) {}
  },
  formatDatetimeToDate(input) {
    try {
      if (input) {
        let value = moment(input).format(constant.DATETIME_FORMAT);
        return value;
      }
    } catch (error) {}
  },
};

export default datetimeHelper;
