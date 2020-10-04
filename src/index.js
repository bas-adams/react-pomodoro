import React from 'react';
import ReactDOM from 'react-dom';

// podanie ścieżki relatywnej do pliku
import App  from './components/App';

// taki sposób importu jest mozliwy dzięki webpack
import './styles/main.scss';

ReactDOM.render(<App />, document.getElementById("root"));