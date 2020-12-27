import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:4000/edit/${id}`);
    setName(result.data.users.name);
    setEmail(result.data.users.email);
    setPassword(result.data.users.password);
  };

  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/dis">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">name: {name}</li>

        <li className="list-group-item">email: {email}</li>
        <li className="list-group-item">phone: {password}</li>
      </ul>
    </div>
  );
};

export default User;
