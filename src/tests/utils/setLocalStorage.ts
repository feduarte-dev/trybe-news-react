import { ReportType } from '../../types';

const setLocalStorage = (report: ReportType[]) => {
  window.localStorage.setItem('Favorite News', JSON.stringify(report));
};

export default setLocalStorage;
