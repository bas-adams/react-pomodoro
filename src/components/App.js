import React from 'react';
import TimeboxList from './TimeboxList';
import { EditableTimebox } from './remaining-components';

function App() {
  return (
      <div className='App'>
          <TimeboxList />
          <EditableTimebox />
      </div>
  )
}

export default App;