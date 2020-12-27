import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
const Display = () => {
  const [users, setUser] = useState([]);

  const [page_Count, setPage_Count] = useState(1);
  const [per_Page, setPer_Page] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log("userEffect is called!");
    loadUsers();
  }, []); //[] is for runiing only 1 time

  const loadUsers = async (pageNo) => {
    if (!pageNo) {
      pageNo = 1;
    }

    const result = await axios.get(
      `http://localhost:4000/display?pageNo=${pageNo}`
    );

    console.log("result", result.data);
    setCurrentPage(pageNo);
    setUser(result.data.users);

    setPer_Page(result.data.options.limit);

    setPage_Count(
      Math.ceil(result.data.total_data / result.data.options.limit)
    );
    // console.log("aaaa", result.data.total_data);
    // console.log("bbb", result.data.options.limit);
    // console.log(
    //   "pages that create",
    //   Math.ceil(result.data.total_data / result.data.options.limit)
    // );
  };

  //console.log("page_count", page_Count);

  //pagination CODE

  //pagination CODE
  const handlePageClick = async ({ selected: selectedPage }) => {
    //  console.log("Selected", selectedPage);

    const result = await axios.get(
      `http://localhost:4000/display?pageNo=${selectedPage + 1}`
    );
    //console.log("res_check", result);

    //setPer_Page(result.data.options.limit);
    setUser(result.data.users);
    setPage_Count(
      Math.ceil(result.data.total_data / result.data.options.limit)
    );

    setCurrentPage(selectedPage);

    //console.log("pagessss", result.data.options.limit);
    //console.log("pagr_count", page_Count);
  };

  const deleteUser = async (id) => {
    await axios.get(`http://localhost:4000/delete/${id}`);
    console.log("front end  delete");
    loadUsers();
  };
  console.log("page_count", page_Count);

  console.log("currentPage", currentPage);

  return (
    <div className="container">
      <div className="py-4">
        <h1>All Users Page !</h1>
        <table className="table border shadow">
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
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          pageCount={page_Count}
          onPageChange={handlePageClick}
          containerClassName={"pagination containerClassName"}
          previousLinkClassName={"previousLinkClassName"}
          nextLinkClassName={"nextLinkClassName"}
          pageClassName={"pageClassName"}
          disabledClassName={"disabledClassName"}
          activeClassName={"activeClassName"}
        />
      </div>
    </div>
  );
};

export default Display;
