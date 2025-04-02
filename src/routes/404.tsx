import React from 'react';
import '../App.scss';

function Nomatch(): React.JSX.Element {
  return (
    <>
      <p className="text-slate-400">404 Not Found</p>
      <p className="text-slate-400">このページは存在しません。</p>
    </>
  );
}
export default Nomatch;
