/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import messages from './messages';

export default function HomePage() {
  return (
    <h1>
      <div> {...messages.header} </div>
    </h1>
  );
}
