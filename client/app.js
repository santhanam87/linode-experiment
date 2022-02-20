import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../server/store/reducers/counterSlice';
import TimeComponent from './time';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const onIncrement = () => {
    dispatch(increment());
  };
  return (
    <div>
      <TimeComponent/>
      <p>
        Hello world...  from react
        {count}
        <button type="button" onClick={onIncrement}>+</button>
      </p>
    </div>
  );
}

export default App;
