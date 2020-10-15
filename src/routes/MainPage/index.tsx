import { firestore as f } from 'firebase';
import React from 'react';
import { useFirestore } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import useCollection from 'src/hooks/useCollection';
import { Record } from 'src/store/types';

const MainPage: React.FC = () => {
  const firestore = useFirestore();
  const { documents, isLoading } = useCollection<Record>({ collection: 'records', orderBy: ['timestamp', 'desc'], limit: 1 });
  const inside = documents?.[0]?.type === 'in';

  const change = (type: 'in' | 'out') => {
    return firestore.add('records', { type, timestamp: f.Timestamp.now() });
  };

  return (
    <>
      {isLoading ? 'Ladataan...' : inside ? 'Olet nyt sisällä' : 'Olet nyt ulkona'}
      <button onClick={() => change('in')}>Sisään</button>
      <button onClick={() => change('out')}>Ulos</button>
      <Link to="/records">Pyyhkäise ylös</Link>
    </>
  );
};

export default MainPage;
