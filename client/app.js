import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../server/store/reducers/counterSlice';

function useOnlineStatus({ status }) {
  const [onlineStatus, setOnlineStatus] = useState(status);
  return [onlineStatus, setOnlineStatus];
}

function App() {
  const [status] = useOnlineStatus({ status: true });

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const onIncrement = () => {
    dispatch(increment());
  };
  return (
    <div>
      {status && (<p>Online</p>)}
      <p>
        Hello world...  from react
        {count}
        <button type="button" onClick={onIncrement}>+</button>
      </p>
    </div>
  );
}

export default App;
