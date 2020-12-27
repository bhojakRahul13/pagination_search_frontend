import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Display = () => {
  const [users, setUser] = useState([]);

  const [page_Count, setPage_Count] = useState(0);
  const [per_Page, setPer_Page] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const [searchEmail, setSearchEmail] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    loadUsers();
  }, []); //[] is for running only 1 time

  useEffect(() => {
    const search = async () => {
      const result = await axios.get(
        `http://localhost:4000/display?name=${searchName}&email=${searchEmail}&pageNo=${1}`
      );

      setCurrentPage(1);
      setUser(result.data.users);

      setPer_Page(result.data.options.limit);

      setPage_Count(
        Math.ceil(result.data.total_data / result.data.options.limit)
      );
    };
    search();
  }, [searchName, searchEmail]);

  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  const loadUsers = async (pageNo) => {
    if (!pageNo) {
      pageNo = 1;
    }

    const result = await axios.get(
      `http://localhost:4000/display?pageNo=${pageNo}`
    );

    // console.log("result", result.data);
    setCurrentPage(pageNo);
    setUser(result.data.users);

    setPer_Page(result.data.options.limit);

    setPage_Count(
      Math.ceil(result.data.total_data / result.data.options.limit)
    );
  };

  //pagination CODE
  const handlePageClick = async ({ selected }) => {
    const result = await axios.get(
      `http://localhost:4000/display?pageNo=${selected + 1}`
    );

    //setPer_Page(result.data.options.limit);
    setUser(result.data.users);
    setCurrentPage(selected);
  };

  //Button Load m showMore CODE....
  const handleShowMorePosts = async () => {
    const result = await axios.get(
      `http://localhost:4000/display?pageNo=${currentPage + 1}`
    );

    const data = setUser(users.concat(result.data.users));
    setCurrentPage(currentPage + 1);
    console.log("abc", currentPage + 1);
  };

  const deleteUser = async (id) => {
    await axios.get(`http://localhost:4000/delete/${id}`);
    // console.log("front end  delete");
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>All Users Page !</h1>
        <table className="table border shadow">
          <div>
            <input
              type="email"
              placeholder="Email search"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <t />
            <input
              type="text"
              placeholder="Username search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{user._id}</th>

                <td>{user.name} </td>
                <td>{user.email} </td>
                <td>{user.password} </td>
                <td>
                  <Link
                    className="btn btn-primary  mr-2"
                    to={`/user/${user._id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-success  mr-2"
                    to={`/edit/${user._id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {currentPage < page_Count && (
            <button onClick={handleShowMorePosts}>Load more</button>
          )}
        </div>
        <div>
          {/* <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            // pageCount={page_Count}
            //onPageChange={handlePageClick}
            containerClassName={"pagination containerClassName"}
            previousLinkClassName={"previousLinkClassName"}
            nextLinkClassName={"nextLinkClassName"}
            pageClassName={"pageClassName"}
            disabledClassName={"disabledClassName"}
            activeClassName={"activeClassName"}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Display;
