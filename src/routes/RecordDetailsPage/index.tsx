import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import useDocument from 'src/hooks/useDocument';
import { Record } from 'src/store/types';
import RecordForm from './RecordForm';

const RecordDetailsPage: React.FC = () => {
  const { document, id, isNew } = useDocument<Record>('records');

  return (
    <div className="page">
      <header>
        <Link to="/records" className="action"><FaChevronLeft size={24} /></Link>
        <h1 className="title">{isNew ? 'Lisää kirjaus' : 'Muokkaa kirjausta'}</h1>
      </header>
      <RecordForm id={id} initialValues={document} />
    </div>
  );
};

export default RecordDetailsPage;
