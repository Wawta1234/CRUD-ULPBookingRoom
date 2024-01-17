import React from "react";
import Axios from "axios";
import { useState } from "react";

export default function Room() {
  const [room_id, setRoomID] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [projector, setprojertor] = useState(0);
  const [visualizer, setvisualizer] = useState(0);
  const [micophone, setmicophone] = useState(0);
  const [computer, setcomputer] = useState(0);
  const [newCapacity, setNewCapacity] = useState("");
  const [newProjector, setNewProjector] = useState("");
  const [newVisualizer, setNewVisualizer] = useState("");
  const [newMicophone, setNewMicophone] = useState("");
  const [newComputer, setNewComputer] = useState("");

  const [roomsList, setroomList] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");

  const getRooms = () => {
    Axios.get("http://localhost:3001/rooms").then((response) => {
      setroomList(response.data);
    });
  };

  const addRooms = () => {
    Axios.post(
      "http://localhost:3001/creat",
      {
        room_id: room_id,
        capacity: capacity,
        building: selectedBuilding,
        floors: selectedFloor,
        projector: projector,
        visualizer: visualizer,
        micophone: micophone,
        computer: computer,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      setroomList([
        ...roomsList,
        {
          room_id: room_id,
          capacity: capacity,
          building: selectedBuilding,
          floors: selectedFloor,
          projector: projector,
          visualizer: visualizer,
          micophone: micophone,
          computer: computer,
        },
      ]);
    });
  };

  const UpdateRooms = (val) => (room_id) => {
  Axios.put(`http://localhost:3001/update`, {
    capacity: newCapacity !== "" ? newCapacity : val.capacity,
    projector: newProjector !== "" ? newProjector : val.projector,
    visualizer: newVisualizer !== "" ? newVisualizer : val.visualizer,
    microphone: newMicophone !== "" ? newMicophone : val.microphone,
    computer: newComputer !== "" ? newComputer : val.computer,
    room_id: room_id,
  }).then((response) => {
    setroomList((prevRoomsList) =>
      prevRoomsList.map((room) =>
        room.room_id === room_id
          ? {
              ...room,
              capacity: newCapacity !== "" ? newCapacity : room.capacity,
              projector: newProjector !== "" ? newProjector : room.projector,
              visualizer: newVisualizer !== "" ? newVisualizer : room.visualizer,
              microphone: newMicophone !== "" ? newMicophone : room.micophone,
              computer: newComputer !== "" ? newComputer : room.computer,
            }
          : room
      )
    );
    setNewCapacity("");
    setNewProjector("");
    setNewVisualizer("");
    setNewMicophone("");
    setNewComputer("");
  });
};

  


  const deleteRooms = (room_id) => {
    Axios.delete(`http://localhost:3001/delete/${room_id}`).then((response) => {
      setroomList(
        roomsList.filter((val) => {
          return val.room_id !== room_id;
        })
      );
    });
  };

  return (
    <div className="container">
      <h1>บันทึกข้อมูลห้อง</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="room_id" className="form-label">
              หมายเลขห้อง :
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="ระบุหมายเลขห้อง"
              onChange={(Event) => {
                setRoomID(Event.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="capacity" className="form-label">
              จำนวนที่นั่ง:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="ระบุจำนวนที่นั่งที่สามารถบรรจุได้"
              onChange={(Event) => {
                setCapacity(Event.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="Building" className="form-label">
              อาคาร :
            </label>
            <select
              className="form-select"
              onChange={(event) => {
                setSelectedBuilding(event.target.value);
              }}
            >
              <option value="">-กรุณาเลือกอาคาร-</option>
              <option value="อาคารบุญชูปณิธาน">อาคารบุญชูปณิธาน</option>
              <option value="อาคารเรียนรวม 4 ชั้น">อาคารเรียนรวม 4 ชั้น</option>
              <option value="อาคารเรียนรวม 5 ชั้น">อาคารเรียนรวม 5 ชั้น</option>
              <option value="อาคารสิรินธรารัตน์">อาคารสิรินธรารัตน์</option>
              <option value="อาคารนวัตกรรมบริการ">อาคารนวัตกรรมบริการ</option>
              <option value="อาคารอเนกประสงค์และสนามกีฬาในร่ม">อาคารอเนกประสงค์และสนามกีฬาในร่ม</option>
              <option value="อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม">อาคารปฏิบัติการสาขาออกแบบหัตถอุตสาหกรรม</option>
              
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="floors" className="form-label">
              ชั้น
            </label>
            <select
              className="form-select"
              onChange={(event) => {
                setSelectedFloor(event.target.value);
              }}
            >
              <option value="">-กรุณาเลือกชั้น-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="projector" className="form-label">
              จำนวน projector :
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="ระบุจำนวน projector ที่มี"
              onChange={(Event) => {
                setprojertor(Event.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="visualizer" className="form-label">
              จำนวน visualizer :
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="ระบุจำนวน visualizer ที่มี"
              onChange={(Event) => {
                setvisualizer(Event.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="micophone" className="form-label">
              จำนวน micophone :
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="ระบุจำนวน micophone ที่มี"
              onChange={(Event) => {
                setmicophone(Event.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="computerr" className="form-label">
              จำนวน computer :
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="ระบุจำนวน computer ที่มี"
              onChange={(Event) => {
                setcomputer(Event.target.value);
              }}
            ></input>
          </div>
          <button className="btn btn-success" onClick={addRooms}>
            เพิ่มห้อง
          </button>
        </form>
      </div>
      <hr />
      <div className="showroom">
        <button className="btn btn-primary" onClick={getRooms}>
          แสดงห้อง
        </button>
        <br />
        <br />
        {roomsList.map((val, key) => {
          return (
            <div className="rooms card" key={key}>
              <div className="card-body text-left">
                <p className="card-text">เลขห้อง :{val.room_id} </p>
                <p className="card-text">อาคาร :{val.building} </p>
                <p className="card-text">ชั้น :{val.floors} </p>
                <p className="card-text">ที่นั่ง :{val.capacity} </p>
                <div className="d-flex">
                  <input
                    type="number"
                    placeholder="เปลี่ยนแปลงจำนวนที่นั่ง"
                    onChange={(event) => {
                      setNewCapacity(event.target.value);
                    }}
                  />
                </div>
                <p className="card-text"> projector :{val.projector} </p>
                <div className="d-flex">
                  <input
                    type="number"
                    placeholder="เปลี่ยนแปลงจำนวน projector"
                    onChange={(event) => {
                      setNewProjector(event.target.value);
                    }}
                  />
                </div>
                <p className="card-text">visualizer :{val.visualizer} </p>
                <div className="d-flex">
                  <input
                    type="number"
                    placeholder="เปลี่ยนแปลงจำนวน visualizer"
                    onChange={(event) => {
                      setNewVisualizer(event.target.value);
                    }}
                  />
                </div>
                <p className="card-text">micophone :{val.micophone} </p>
                <div className="d-flex">
                  <input
                    type="number"
                    placeholder="เปลี่ยนแปลงจำนวน micophone"
                    onChange={(event) => {
                      setNewMicophone(event.target.value);
                    }}
                  />
                </div>
                <p className="card-text"> computer :{val.computer} </p>
                <div className="d-flex">
                  <input
                    type="number"
                    placeholder="เปลี่ยนแปลงจำนวน computer"
                    onChange={(event) => {
                      setNewComputer(event.target.value);
                    }}
                  />
                  <button
                    className="btn btn-warning"
                    onClick={() => UpdateRooms(val)(val.room_id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteRooms(val.room_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
