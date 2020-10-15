import React from 'react';
import { Link } from 'react-router-dom';
import useDocument from 'src/hooks/useDocument';
import { Record } from 'src/store/types';
import RecordForm from './RecordForm';

const RecordDetailsPage: React.FC = () => {
  const { document, id, isNew } = useDocument<Record>('records');

  return (
    <>
      <Link to="/records">&lt;</Link>
      {isNew ? 'Lisää kirjaus' : 'Muokkaa kirjausta'}
      <RecordForm id={id} initialValues={document} />
    </>
  );
};

export default RecordDetailsPage;
