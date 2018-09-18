import React from 'react';

import './Error.scss';

const Error = (props) => {
  return (<p className="error">{props.message}</p>);
}

export {Error};
