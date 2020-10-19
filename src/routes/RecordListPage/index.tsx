import React from 'react';
import { Link } from 'react-router-dom';
import RecordList from './RecordList';

const RecordListPage: React.FC = () => {
  return (
    <div className="page">
      <Link to="/">v</Link>
      <main>
        <RecordList />
      </main>
      <footer>
        <Link to="/records/new" className="button">Lisää kirjaus</Link>
      </footer>
    </div>
  );
};

export default RecordListPage;
