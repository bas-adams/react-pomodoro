import React from 'react';

// podanie ścieżki relatywnej do pliku
import {TimeboxList, EdiatbelTimebox} from './remaining-componetns';

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