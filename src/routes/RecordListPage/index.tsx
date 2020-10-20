import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecordList from './RecordList';
import { BsChevronCompactDown } from 'react-icons/bs';
import { Swipeable } from 'react-swipeable';

const RecordListPage: React.FC = () => {
  const history = useHistory();
  const main = useRef<HTMLElement | null>(null);
  const [swipeEnabled, setSwipeEnabled] = useState(true);

  return (
    <Swipeable
      onSwipedDown={() => {
        if (swipeEnabled) {
          history.push('/');
        }
      }}
      onSwiping={(e) => {
        if (e.first) {
          setSwipeEnabled((main.current?.getBoundingClientRect().top ?? 0) >= 0);
        }
      }}
    >
      <div className="page">
        <div className="top">
          <BsChevronCompactDown size={40} className="shake" />
        </div>
        <main ref={main}>
          <RecordList />
        </main>
        <footer>
          <Link to="/records/new" className="button">Lisää kirjaus</Link>
        </footer>
      </div>
    </Swipeable>
  );
};

export default RecordListPage;
