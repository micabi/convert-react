import React, { useState } from 'react';

function SimpleButton(): React.JSX.Element {
  const [state, setState] = useState(false);

  function toggleBtn() {
    setState((prevState) => !prevState);
  }

  return (
    <button type="button" onClick={toggleBtn}>
      {state ? 'ON' : 'OFF'}
    </button>
  );
}
export { SimpleButton };
