import { enumFilter } from './enums';
import { useFilterStore } from './filterStore';

export function filterByReport(fridge) {
  const isFilterEnabled = useFilterStore.getState().isFilterEnabled;
  const report = fridge.report;

  // If fridge does not have a report, then none of the other filters are applicable
  if (!report) {
    // display this fridge if NO_REPORT filter is enabled
    return isFilterEnabled(enumFilter.NO_REPORT);
  }
  return true;
}
