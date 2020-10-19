import React, { useCallback, useEffect, useState } from 'react';
import { Record } from 'src/store/types';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useForm } from 'react-hook-form';
import { firestore as f } from 'firebase';
import dayjs from 'dayjs';
import useSaveCallback from 'src/hooks/useSaveCallback';
import { useFirestore } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

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
      {isModalOpen && <ConfirmDeleteModal onCancel={() => setModalOpen(false)} onDelete={onDelete}/>}

      <main>
        <form>
          <div className={cx('input', { invalid: errors.type })}>
            <div className="label">Kirjaus</div>
            <div className="field switch">
              <input type="radio" name="type" value="in" id="type_in" ref={register({ required: true })} />
              <label htmlFor="type_in" className="left" tabIndex={0}>Sisään</label>
              <input type="radio" name="type" value="out" id="type_out" ref={register({ required: true })} />
              <label htmlFor="type_out" className="right" tabIndex={0}>Ulos</label>
            </div>
            <div className="errors">
              {errors.type && 'Kirjaus puuttuu'}
            </div>
          </div>

          <div className={cx('input', { invalid: errors.date || errors.time })}>
            <div className="label">Ajankohta</div>
            <div className="field datetime">
              <input type="date" name="date" id="date" max={dayjs().format('YYYY-MM-DD')} ref={register({ required: true })} />
              <input type="time" name="time" id="time" step={1} ref={register({ required: true })} />
            </div>
            <div className="errors">
              {(errors.date || errors.time) && 'Ajankohta puuttuu'}
            </div>
          </div>
        </form>
      </main>

      <footer>
        {!!id && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="button danger"
          >
            Poista
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit(useSaveCallback(() => {}, 'records', id, { preSave, postSave }))}
          className="button primary"
        >
          Tallenna
        </button>
      </footer>
    </>
  );
};

export default RecordForm;
