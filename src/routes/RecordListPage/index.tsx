import React from 'react';
import { Link } from 'react-router-dom';
import RecordList from './RecordList';
import { BsChevronCompactDown } from 'react-icons/bs';

const RecordListPage: React.FC = () => {
  return (
    <div className="page">
      <div className="top">
        <BsChevronCompactDown size={40} className="shake" />
      </div>
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
