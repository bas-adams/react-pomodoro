import React from 'react';

// podanie ścieżki relatywnej do pliku
import {TimeboxList} from './remaining-componetns';
import EdiatbelTimebox from './EdiatbelTimebox';

/* komponent fukncyjny */
function App() {
    return (
        <div className="App">
            <TimeboxList />
            <EdiatbelTimebox />
        </div>
    );
}

export default App;