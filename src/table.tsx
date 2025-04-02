import React from 'react';

function ConvertTable(): React.JSX.Element {
  return (
    <>
      <div className="mb-12">
        <table className="w-full border border-violet-200 bg-violet-100">
          <caption className="mb-6 font-bold text-violet-500">変換表</caption>
          <thead>
            <tr>
              <th scope="col" className="border border-violet-300 bg-violet-200 p-1 font-light">
                ヨ
              </th>
              <th scope="col" className="border border-violet-300 bg-violet-200 p-1 font-light">
                キ
              </th>
              <th scope="col" className="border border-violet-300 bg-violet-200 p-1 font-light">
                ク
              </th>
              <th scope="col" className="border border-violet-300 bg-violet-200 p-1 font-light">
                ラ
              </th>
              <th scope="col" className="border border-violet-300 bg-violet-200 p-1 font-light">
                シ
              </th>
              <th scope="col" className="border border-violet-300 bg-violet-200 p-1 font-light">
                コ
              </th>
              <th scope="col" className="border border-violet-300 bg-violet-200 p-1 font-light">
                レ
              </th>
              <th scope="col" className="border border-violet-300 bg-violet-200 p-1 font-light">
                ツ
              </th>
              <th scope="col" className="border border-violet-300 bg-violet-200 p-1 font-light">
                ト
              </th>
              <th scope="col" className="border border-violet-300 bg-violet-200 p-1 font-light">
                メ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-violet-200 p-1">1</td>
              <td className="border border-violet-200 p-1">2</td>
              <td className="border border-violet-200 p-1">3</td>
              <td className="border border-violet-200 p-1">4</td>
              <td className="border border-violet-200 p-1">5</td>
              <td className="border border-violet-200 p-1">6</td>
              <td className="border border-violet-200 p-1">7</td>
              <td className="border border-violet-200 p-1">8</td>
              <td className="border border-violet-200 p-1">9</td>
              <td className="border border-violet-200 p-1">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export { ConvertTable };
