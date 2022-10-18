import * as React from 'react';

import __data from '@coma-lib/res';

export function App(): React.ReactElement {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <h1 className="title">{__data.app.title}</h1>
      <p className="message">{__data.app.message}</p>
      <p className="count">Current count: <span>{count}</span></p>
      <button className="recount" onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </>
  );
}