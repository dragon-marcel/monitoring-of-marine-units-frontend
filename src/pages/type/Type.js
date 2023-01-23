import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL_API } from "../../helper/URL";

function Type() {
  const [typelist, setTypeList] = useState({ list: [] });

  const FetchData = async () => {
    const { data } = await axios.get(URL_API + "/type");
    setTypeList({ list: data });
  };

  useEffect(() => {
    FetchData();
  }, [setTypeList]);

  return (
    <div>
      <Navbar />
      <div id="precontainer">
        <div id="container">
          <div id="caption">Type list</div>
          <hr></hr>
          <table className="table" id="table">
            <thead>
              <tr>
                <th> ID </th>
                <th> Description </th>
              </tr>
            </thead>
            <tbody>
              {typelist.list &&
                typelist.list.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                  </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Type;
