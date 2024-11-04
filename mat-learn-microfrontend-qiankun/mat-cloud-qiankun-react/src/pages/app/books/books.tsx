import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Books(): React.ReactElement {
  return (
    <div>
      Books Dom With Qiankun
      <br />
      <NavLink to={'/mat-cloud-qiankun-react/13'}>Book View</NavLink>
    </div>
  );
}
