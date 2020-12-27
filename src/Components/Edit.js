import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();

  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:4000/edit/${id}`, {
      Name: name,
      Email: email,
      Password: password,
    });
    console.log("res", res.data.users);

    if (res.data.msg === "user update") {
      history.push("/dis");
    } else {
      setData(res.data.msg);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []); //[] is for runiing only 1 time

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:4000/edit/${id}`);
    setName(result.data.users.name);
    setEmail(result.data.users.email);
    setPassword(result.data.users.password);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Update User</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              className="form-control form-control-lg"
              placeholder="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control form-control-lg"
              name="Passord"
              placeholder="Enter Your Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
        <h1>{data}</h1>
      </div>
    </div>
  );
};

export default Edit;
