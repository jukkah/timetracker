import { Dayjs } from "dayjs";
import { Record, WithID } from "src/store/types";
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isSameOrAfter);
dayjs.extend(isoWeek);

export const sanitize = <T>(value: T) => JSON.parse(JSON.stringify(value));

export const objectToArray = <T>(data: { [key: string]: T } | undefined | null): undefined | WithID<T>[] => {
  if (data) {
    const filteredData = Object.fromEntries(Object.entries(data ?? {}).filter(([_, value]) => !! value));
    return Object.keys(filteredData ?? {}).map(id =>({ id, ...data[id] }));
  }

  if (data === null) {
    return [];
  }

  return undefined;
}

export const relativeDays = (date: Dayjs): string => {
  const today = dayjs().startOf('day');

  if (date.isSameOrAfter(today)) {
    return 'tänään';
  }

  if (date.isSameOrAfter(today.subtract(1, 'day'))) {
    return 'eilen';
  }

  if (date.isSameOrAfter(today.subtract(2, 'day'))) {
    return 'toissapäivänä';
  }

  if (date.isSameOrAfter(today.startOf('isoWeek'))) {
    return ['sunnuntaina', 'maanantaina', 'tiistaina', 'keskiviikkona', 'torstaina', 'perjantaina', 'lauantaina'][date.day()];
  }

  if (date.isSameOrAfter(today.startOf('year'))) {
    return date.format('D.M.');
  }

  return date.format('D.M.YYYY');
};

export const hashRecord = (record: WithID<Record>): string => `${record.id}:${record.type}:${record.timestamp.toMillis()}`;
