import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [person, setPerson] = useState("");
  const [screen, setScreen] = useState({ screenKey: "", value: "" });
  const [tableData, setTableData] = useState([]);

  const getPerson = async () => {
    const { data } = await axios(url);
    setPerson(data.results[0]);
    setScreen({
      screenKey: data.results[0].name.first + " " + data.results[0].name.last,
      value: "name",
    });
    console.log(data);
    setFlag(true);
  };
  console.log(person.name);

  useEffect(() => {
    getPerson();
  }, []);

  const [flag, setFlag] = useState(true);
  const handleAddUser = () => {
    const newUser = {
      firstName: person.name.first,
      email: person.email,
      phone: person.phone,
      age: person.dob.age,
    };
    flag
      ? setTableData([...tableData, newUser])
      : alert(`The user is in the list. Please add a different user.`);
    setFlag(false);
  };

  const { dob, name, email, phone, location, login, picture, gender } = person;

  console.log(name);
  return (
    <main>
      <div className="block bcg-orange"></div>
      <div className="block">
        <div className="container">
          <img src={picture?.large} alt="random user" className="user-img" />
          <p className="user-title">
            My {screen?.value ? screen.value : "name"} is
          </p>
          <p className="user-value">
            {screen?.screenKey
              ? screen.screenKey
              : name?.first + " " + name?.last}
          </p>
          <div className="values-list">
            <button className="icon" data-label="name">
              <img
                onMouseOver={() =>
                  setScreen({
                    screen: `${name?.first} ${name?.last}`,
                    value: "name",
                  })
                }
                src={gender === "male" ? manSvg : womanSvg}
                alt="user"
                id="iconImg"
              />
            </button>
            <button className="icon" data-label="email">
              <img
                onMouseOver={() =>
                  setScreen({
                    screenKey: email,
                    value: "email",
                  })
                }
                src={mailSvg}
                alt="mail"
                id="iconImg"
              />
            </button>
            <button className="icon" data-label="age">
              <img
                onMouseOver={() =>
                  setScreen({
                    screenKey: dob?.age,
                    value: "age",
                  })
                }
                src={gender === "male" ? manAgeSvg : womanAgeSvg}
                alt="age"
                id="iconImg"
              />
            </button>
            <button className="icon" data-label="street">
              <img
                onMouseOver={() =>
                  setScreen({
                    screenKey: `${location?.city} ${location?.country}`,
                    value: "location",
                  })
                }
                src={mapSvg}
                alt="map"
                id="iconImg"
              />
            </button>
            <button className="icon" data-label="phone">
              <img
                onMouseOver={() =>
                  setScreen({
                    screenKey: phone,
                    value: "phone",
                  })
                }
                src={phoneSvg}
                alt="phone"
                id="iconImg"
              />
            </button>
            <button className="icon" data-label="password">
              <img
                onMouseOver={() =>
                  setScreen({
                    screenKey: `${login?.username} ${login?.password}`,
                    value: "login",
                  })
                }
                src={padlockSvg}
                alt="lock"
                id="iconImg"
              />
            </button>
          </div>
          <div className="btn-group">
            <button onClick={() => getPerson()} className="btn" type="button">
              new user
            </button>
            <button onClick={handleAddUser} className="btn" type="button">
              add user
            </button>
            <button
              onClick={() => setTableData([])}
              className="btn"
              type="button"
            >
              clear List
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {tableData === [] ? (
                ""
              ) : (
                <>
                  {tableData.map((item, index) => (
                    <tr className="body-tr" key={index}>
                      <td className="td">{item.firstName}</td>
                      <td className="td">{item.email}</td>
                      <td className="td">{item.phone}</td>
                      <td className="td">{item.age}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
