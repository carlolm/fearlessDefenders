import React from 'react';

import './css/Main.css';


const Main = ({ data }) => (
  <div className="main">
    <h2>Main</h2>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

Main.propTypes = {
  data: React.PropTypes.object,
};

Main.defaultProps = {
  data: { text: 'coming soon' },
};

export default Main;
