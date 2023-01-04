import { useState } from "react";
import "./App.css";

const allStudents = [];

function App() {
  const [data, setData] = useState({
    sname: "",
    rollNumber: "",
    checkIn: "",
    checkOut: "",
  });

  const [studentsCount, setStudentsCount] = useState(0);

  function countTotalStudents() {
    let cnt = 0;
    for (let i = 0; i < allStudents.length; i++) {
      if (!allStudents[i].checkOut) {
        cnt++;
      }
    }
    setStudentsCount(cnt);
  }

  function appendToTable(data) {
    const table = document.querySelector("table");
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerHTML = data.rollNumber;
    const td2 = document.createElement("td");
    td2.innerHTML = data.sname;
    const td3 = document.createElement("td");
    td3.innerHTML = data.checkIn;
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const btn = document.createElement("button");
    btn.innerHTML = "CheckOut";
    btn.addEventListener("click", () => {
      btn.disabled = true;
      data.checkOut = new Date().toLocaleTimeString();
      td4.innerHTML = data.checkOut;
      countTotalStudents();
    });
    td5.appendChild(btn);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    table.appendChild(tr);
  }

  function validEntry(data) {
    if (allStudents.length === 0) return true;
    for (let i = 0; i < allStudents.length; i++) {
      if (allStudents[i].rollNumber === data.rollNumber) {
        return false;
      }
    }
    return true;
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!validEntry(data)) {
      alert("No two students can have same roll number.");
      return;
    }
    allStudents.push(data);
    appendToTable(data);
    countTotalStudents();
  }

  function handleChange(e) {
    setData({
      ...data,
      checkIn: new Date().toLocaleTimeString(),
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="App">
      <h1 className="heading">Student Attendence System</h1>
      <form className="form">
        <input
          type="text"
          name="sname"
          value={data.sname}
          placeholder="Enter Name"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="rollNumber"
          value={data.rollNumber}
          placeholder="Enter Roll Number"
          onChange={handleChange}
        ></input>
        <input
          type="submit"
          value="Mark Attendence"
          onClick={submitHandler}
        ></input>
      </form>
      <table>
        <tr>
          <th>Roll Number</th>
          <th>Name</th>
          <th>CheckIn Time</th>
          <th>CheckOut Time</th>
        </tr>
      </table>
      <h3>Total Students Present in School Right Now: {studentsCount}</h3>
    </div>
  );
}

export default App;
