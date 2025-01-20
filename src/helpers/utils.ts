import * as moment from 'moment-timezone';

export const now = () => moment.utc().valueOf();
