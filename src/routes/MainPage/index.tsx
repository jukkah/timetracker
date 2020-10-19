import { firestore as f } from 'firebase';
import React from 'react';
import { useFirestore } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import useCollection from 'src/hooks/useCollection';
import { Record } from 'src/store/types';
import cx from 'classnames';

const MainPage: React.FC = () => {
  const firestore = useFirestore();
  const { documents, isLoading } = useCollection<Record>({ collection: 'records', orderBy: ['timestamp', 'desc'], limit: 1 });
  const inside = documents?.[0]?.type === 'in';

  const change = (type: 'in' | 'out') => {
    return firestore.add('records', { type, timestamp: f.Timestamp.now() });
  };

  return (
    <div className="page" id="main-page">
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
      </div>
      <div>
        <button
          onClick={() => change('out')}
          className={cx('button call-to-action', { primary: inside })}
        >
          Ulos
        </button>
      </div>
      <footer>
        <Link to="/records">Pyyhkäise ylös</Link>
      </footer>
    </div>
  );
};

export default MainPage;
