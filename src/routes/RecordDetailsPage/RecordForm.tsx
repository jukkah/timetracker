import React, { useCallback, useEffect, useState } from 'react';
import { Record } from 'src/store/types';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useForm } from 'react-hook-form';
import { firestore as f } from 'firebase';
import dayjs from 'dayjs';
import useSaveCallback from 'src/hooks/useSaveCallback';
import { useFirestore } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

interface RecordFormProps {
  id?: string;
  initialValues?: Record;
};

const RecordForm: React.FC<RecordFormProps> = ({id, initialValues }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { handleSubmit, register, errors, reset } = useForm();

  const firestore = useFirestore();
  const history = useHistory();
  const onDelete = useCallback(() => {
    setModalOpen(false);
    firestore.delete({ collection: 'records', doc: id }).then(() => history.push(`/records`));
  }, [setModalOpen, firestore, id, history]);

  const preSave = (values: any) => ({
    type: values.type,
    timestamp: f.Timestamp.fromMillis(dayjs(`${values.date}T${values.time}`).valueOf())
  });

  const postSave = () => history.push(`/records`);

  useEffect(() => {
    if (initialValues) {
      const timestamp = dayjs(initialValues.timestamp.toMillis());
      reset({
        type: initialValues.type,
        date: timestamp.format('YYYY-MM-DD'),
        time: timestamp.format('HH:mm:ss'),
      });
    }
  }, [initialValues, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(useSaveCallback(() => {}, 'records', id, { preSave, postSave }))}>
        Kirjaus
        <input type="radio" name="type" value="in" id="type_in" ref={register({ required: true })} />
        <label htmlFor="type_in">Sisään</label>
        <input type="radio" name="type" value="out" id="type_out" ref={register({ required: true })} />
        <label htmlFor="type_out">Ulos</label>
        {errors.type && 'Kirjaus puuttuu'}

        Ajankohta
        <input type="date" name="date" id="date" max={dayjs().format('YYYY-MM-DD')} ref={register({ required: true })} />
        <input type="time" name="time" id="time" step={1} ref={register({ required: true })} />
        {(errors.date || errors.time) && 'Ajankohta puuttuu'}

        {!!id && <button type="button" onClick={() => setModalOpen(true)}>Poista</button>}
        <button type="submit">Tallenna</button>
      </form>
      {isModalOpen && <ConfirmDeleteModal onCancel={() => setModalOpen(false)} onDelete={onDelete}/>}
    </>
  );
};

export default RecordForm;
