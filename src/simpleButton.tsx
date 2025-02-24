import { useState } from 'react';

function SimpleButton(): JSX.Element {
  const [state, setState] = useState(false);

  function toggleBtn() {
    setState((prevState) => !prevState);
  }

  return <button onClick={toggleBtn}>{state ? 'ON' : 'OFF'}</button>;
}
export { SimpleButton };
