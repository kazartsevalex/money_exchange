import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Header.module.css';

const header = (props) => {
  return (
    <div className={classes.Header}>
      <NavLink to="/" exact className={classes.Link} activeClassName={classes.Current}>
        My Pockets
      </NavLink>
    </div>
  );
}

export default header;
