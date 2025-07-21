import React from 'react';
import FlowerList from './component/FlowerList';
import WatchList from './component/WatchList';
import Billing from './component/Billing';

const App = () => (
  <div style={{ padding: 20 }}>
    <h1>🛒 Simple Shop</h1>
    <FlowerList />
    <WatchList />
    <Billing />
  </div>
);

export default App;