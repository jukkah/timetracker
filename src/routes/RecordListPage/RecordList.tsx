import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import useCollection from 'src/hooks/useCollection';
import { Record, WithID } from 'src/store/types';
import { relativeDays } from 'src/utils/util';

const RecordList: React.FC = () => {
  const { documents, isLoading, isEmpty } = useCollection<Record>({ collection: 'records', orderBy: ['timestamp', 'desc'] });

  if (isLoading) {
    return (
      <div className="center">Ladataan...</div>
    );
  }

  if (isEmpty) {
    return (
      <div className="center">Ei kirjauksia</div>
    );
  }

  const items = documents.reduce(({ items, prev }, record) => {
    const currentDay = dayjs(record.timestamp.toMillis());
    const prevDay = prev ? dayjs(prev?.timestamp.toMillis()) : dayjs();
    return {
      items: [
        ...items,
        ...(currentDay.format('YYYY-MM-DD') !== prevDay.format('YYYY-MM-DD') ? [relativeDays(currentDay)] : []),
        record
      ],
      prev: record,
    }
  }, { items: [], prev: undefined } as { items: any[], prev: WithID<Record> | undefined }).items;

  return (
    <ul className="records">
      {items.map((item: WithID<Record> | string) => {
        if (typeof item === 'string') {
          return (
            <li key={item} className="separator">
              <span>{item}</span>
            </li>
          );
        }

        return (
          <li key={item.id}>
            <Link to={`/records/${item.id}`}>
              <span>{item.type === 'in' ? 'Sisään' : 'Ulos'}</span>
              <span>{dayjs(item.timestamp.toMillis()).format('HH:mm')}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default RecordList;
