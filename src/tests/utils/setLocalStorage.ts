import { ReportType } from '../../types';

const setLocalStorage = (key: string, value: ReportType[] | string) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export default setLocalStorage;
