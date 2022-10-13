import * as React from 'react';

import { __appdata } from '@coma-lib/resources';

export function App(): React.ReactElement {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1 className="title">{__appdata.title}</h1>
      <p className="message">{__appdata.message}</p>
      <p className="count">Current count: <span>{count}</span></p>
      <button className="recount" onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
}