import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nickname, setNickname] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [employeelist, setEmployeelist] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeelist(response.data);
    });
  };

  const addEmployee = () => {
    if (
      title !== "" &&
      name !== "" &&
      surname !== "" &&
      nickname !== "" &&
      date !== "" &&
      age !== ""
    ) {
      Axios.post("http://localhost:3001/create", {
        title: title,
        name: name,
        surname: surname,
        nickname: nickname,
        date: date,
        age: age,
      })
        .then(() => {
          const newEmployee = {
            title: title,
            name: name,
            surname: surname,
            nickname: nickname,
            date: date,
            age: age,
          };
          setEmployeelist([...employeelist, newEmployee]);
          clearFields();
          alert("เพิ่มพนักงานใหม่เรียบร้อย");
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
        });
    } else {
      alert("โปรดกรอกข้อมูลให้ครบทุกช่อง");
    }
  };

  const clearFields = () => {
    setTitle("");
    setName("");
    setSurname("");
    setNickname("");
    setDate("");
    setAge("");
    setSelectedGender("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const saveEditedEmployee = (index) => {
    const editedEmployee = employeelist[index];
    Axios.put(
      `http://localhost:3001/update/${editedEmployee.id}`,
      editedEmployee
    )
      .then(() => {
        setEditIndex(-1);
        getEmployee();
        alert("บันทึกข้อมูลเรียบร้อย");
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  const deleteEmployee = (index) => {
    const employeeToDelete = employeelist[index];
    if (window.confirm("คุณต้องการลบพนักงานคนนี้หรือไม่?")) {
      Axios.delete(`http://localhost:3001/delete/${employeeToDelete.id}`)
        .then(() => {
          const updatedList = [...employeelist];
          updatedList.splice(index, 1);
          setEmployeelist(updatedList);
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";

    const dateObj = new Date(isoDate);
    const year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (event, index, field) => {
    const updatedEmployees = [...employeelist];
    updatedEmployees[index][field] = event.target.value;
    setEmployeelist(updatedEmployees);
  };

  const countMale = employeelist.filter((emp) => emp.title === "ชาย").length;

  const countFemale = employeelist.filter((emp) => emp.title === "หญิง").length;

  return (
    <div className="Container">
      <h1>ลงทะเบียนพนักงาน</h1>
      <div className="regis">
        <form action="">
          <div className="mb-3">
            เพศ
            <input
              type="radio"
              name="title"
              id="male"
              value="ชาย"
              checked={selectedGender === "ชาย"}
              onChange={(e) => {
                setTitle(e.target.value);
                setSelectedGender(e.target.value);
              }}
            />{" "}
            ชาย
            <input
              type="radio"
              name="title"
              id="female"
              value="หญิง"
              checked={selectedGender === "หญิง"}
              onChange={(e) => {
                setTitle(e.target.value);
                setSelectedGender(e.target.value);
              }}
            />{" "}
            หญิง
            <br></br>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              ชื่อ:
            </label>
            <input
              type="text"
              style={{ width: "500px" }}
              className="form-control"
              placeholder="ตัวอย่าง : อภิสิทธิ์"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              นามสกุล:
            </label>
            <input
              type="text"
              style={{ width: "500px" }}
              className="form-control"
              placeholder="ตัวอย่าง : อมรแสงชัยกุล"
              value={surname}
              onChange={(event) => {
                setSurname(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nickname" className="form-label">
              ชื่อเล่น:
            </label>
            <input
              type="text"
              style={{ width: "500px" }}
              className="form-control"
              placeholder="ตัวอย่าง : อู๋"
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              วัน/เดือน/ปีเกิด:
            </label>
            <input
              type="date"
              style={{ width: "500px" }}
              className="form-control"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              อายุ:
            </label>
            <input
              type="number"
              style={{ width: "500px" }}
              className="form-control"
              placeholder="ตัวอย่าง : 22"
              value={age}
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={addEmployee}
          >
            ลงทะเบียน
          </button>
        </form>
      </div>
      <hr />
      <p style={{ color: "blue" }}>
        จำนวนพนักงาน {employeelist.length} คน เพศชาย {countMale} คน เพศหญิง{" "}
        {countFemale} คน
      </p>
      <div className="showcard">
        <br></br>
        <div className="employee-list">
          {employeelist.map((val, index) => (
            <div className="employee card" key={index}>
              <div className="card-body">
                <p className="card-text">
                  เพศ :{" "}
                  <input
                    type="text"
                    style={{ float: "right" }}
                    value={val.title}
                    disabled={editIndex !== index}
                    onChange={(e) => handleInputChange(e, index, "title")}
                  />
                </p>
                <p className="card-text">
                  ชื่อ :{" "}
                  <input
                    type="text"
                    style={{ float: "right" }}
                    value={val.name}
                    disabled={editIndex !== index}
                    onChange={(e) => handleInputChange(e, index, "name")}
                  />
                </p>
                <p className="card-text">
                  นามสกุล :{" "}
                  <input
                    type="text"
                    style={{ float: "right" }}
                    value={val.surname}
                    disabled={editIndex !== index}
                    onChange={(e) => handleInputChange(e, index, "surname")}
                  />
                </p>
                <p className="card-text">
                  ชื่อเล่น :{" "}
                  <input
                    type="text"
                    style={{ float: "right" }}
                    value={val.nickname}
                    disabled={editIndex !== index}
                    onChange={(e) => handleInputChange(e, index, "nickname")}
                  />
                </p>
                <p className="card-text">
                  วันเกิด :{" "}
                  <input
                    type="text"
                    style={{ float: "right" }}
                    value={formatDate(val.date)}
                    disabled={editIndex !== index}
                    onChange={(e) => handleInputChange(e, index, "date")}
                  />
                </p>
                <p className="card-text">
                  อายุ :{" "}
                  <input
                    type="number"
                    style={{ float: "right" }}
                    value={val.age}
                    disabled={editIndex !== index}
                    onChange={(e) => handleInputChange(e, index, "age")}
                  />
                </p>
                <div className="d-flex justify-content-between">
                  {editIndex === index ? (
                    <>
                      <button
                        style={{ width: "70px" }}
                        className="btn btn-success"
                        onClick={() => saveEditedEmployee(index)}
                      >
                        บันทึก
                      </button>
                      <button
                        style={{ width: "70px" }}
                        className="btn btn-secondary"
                        onClick={handleCancel}
                      >
                        ยกเลิก
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={{ width: "70px" }}
                        className="btn btn-warning"
                        onClick={() => handleEdit(index)}
                      >
                        แก้ไข
                      </button>
                      <button
                        style={{ width: "70px" }}
                        className="btn btn-danger"
                        onClick={() => deleteEmployee(index)}
                      >
                        ลบ
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
