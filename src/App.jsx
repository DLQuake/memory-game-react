import React from 'react';
import GameBoard from './components/GameBoard';
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <div>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title has-text-centered">Memory game</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <GameBoard />
        </div>
      </section>
    </div>
  );
}

export default App;
