import { firestore as f } from 'firebase';
import React from 'react';
import { useFirestore } from 'react-redux-firebase';
import useCollection from 'src/hooks/useCollection';
import { Record } from 'src/store/types';
import cx from 'classnames';
import { BsChevronCompactUp } from 'react-icons/bs';

const MainPage: React.FC = () => {
  const firestore = useFirestore();
  const { documents, isLoading } = useCollection<Record>({ collection: 'records', orderBy: ['timestamp', 'desc'], limit: 1 });
  const inside = documents?.[0]?.type === 'in';

  const change = (type: 'in' | 'out') => {
    return firestore.add('records', { type, timestamp: f.Timestamp.now() });
  };

  return (
    <div className="page" id="main-page">
      <main>
        <div className="status">
          {isLoading ? 'Ladataan...' : inside ? 'Olet nyt sisällä' : 'Olet nyt ulkona'}
        </div>
        <div>
          <button
            onClick={() => change('in')}
            className={cx('button call-to-action', { primary: !inside })}
          >
            Sisään
          </button>
          <button
            onClick={() => change('out')}
            className={cx('button call-to-action', { primary: inside })}
          >
            Ulos
          </button>
        </div>
      </main>
      <footer className="bottom">
        <BsChevronCompactUp size={40} className="shake" />
        Pyyhkäise ylös
      </footer>
    </div>
  );
};

export default MainPage;
