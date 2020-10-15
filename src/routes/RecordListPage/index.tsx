import React from 'react';
import { Link } from 'react-router-dom';
import RecordList from './RecordList';

const RecordListPage: React.FC = () => {
  return (
    <>
      <Link to="/">v</Link>
      <RecordList />
      <Link to="/records/new">Lisää kirjaus</Link>
    </>
  );
};

export default RecordListPage;
