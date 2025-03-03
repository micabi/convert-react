import '../App.scss';
import { useNavigate, NavigateFunction } from 'react-router-dom';

function Help(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <div className="convert-container flex flex-wrap justify-between sm:flex-none">
        <div className="box bg-violet-100 !py-3.5 md:w-1/2">
          <p>
            記号から数字に変換します。
            <br />
            既存の記法にはある程度柔軟に対応していますが意図した結果にならない場合は記入者に確認をしてください。
          </p>

          <table className="mt-5 w-full border border-violet-200">
            <caption className="font-bold text-violet-700">変換のサンプル</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-50 border border-violet-200 bg-violet-400 p-1 text-center font-normal text-white"
                >
                  変換前
                </th>
                <th
                  scope="col"
                  className="border border-violet-200 bg-violet-400 p-1 text-center font-normal text-white"
                >
                  変換後
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-violet-200 bg-white p-1">レメメメメ</td>
                <td className="border border-violet-200 bg-white p-1">70000</td>
              </tr>
              <tr>
                <td className="border border-violet-200 bg-white p-1">レメ4</td>
                <td className="border border-violet-200 bg-white p-1">70000</td>
              </tr>
              <tr>
                <td className="border border-violet-200 bg-white p-1">キクシ+メ3</td>
                <td className="border border-violet-200 bg-white p-1">235000</td>
              </tr>
              <tr>
                <td className="border border-violet-200 bg-white p-1">トメシメ3+ツメ4</td>
                <td className="border border-violet-200 bg-white p-1">985000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="box bg-yellow-100 !py-3.5 md:w-1/2">
          <p>
            数字から記号に変換します。
            <br />
            純粋な置き換えのみで「+ツメ2」や「メ4」といった省略記法には対応していません。
          </p>

          <table className="mt-5 w-full border border-yellow-200">
            <caption className="font-bold text-yellow-600">変換のサンプル</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-50 border border-yellow-200 bg-yellow-600 p-1 text-center font-normal text-white"
                >
                  変換前
                </th>
                <th
                  scope="col"
                  className="w-50 border border-yellow-200 bg-yellow-600 p-1 text-center font-normal text-white"
                >
                  変換後
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-yellow-200 bg-white p-1">125000</td>
                <td className="border border-yellow-200 bg-white p-1">ヨキシメメメ</td>
              </tr>
              <tr>
                <td className="border border-yellow-200 bg-white p-1">453500</td>
                <td className="border border-yellow-200 bg-white p-1">ラシクシメメ</td>
              </tr>
              <tr>
                <td className="border border-yellow-200 bg-white p-1">90000</td>
                <td className="border border-yellow-200 bg-white p-1">トメメメメ</td>
              </tr>
              <tr>
                <td className="border border-yellow-200 bg-white p-1">90900</td>
                <td className="border border-yellow-200 bg-white p-1">トメトメメ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="test"></div> */}

      <div className="fixed top-5 right-5">
        <a
          className="cursor-pointer"
          onClick={(): void => {
            navigate('/');
          }}
        >
          戻る
        </a>
      </div>
    </>
  );
}
export default Help;
