import { React, useState, useEffect, Fragment } from "react";
import "./Table.css";
import ReadRow from "../Read/ReadRow";
import EditRow from "../Edit/EditRow";
import Pagination from "../Pagination/Pagination";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredResult, setFilteredResult] = useState([]);
  const [selectCheckBox, setSelectCheckBox] = useState([]);
  const [selectAllCheckBox, setSelectAllCheckBox] = useState(false);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  //Pagination
  const rowsLimit = 10;
  const lastIndex = currentPageNum * rowsLimit;
  const firstIndex = lastIndex - rowsLimit;
  const usersPerPage = filteredResult.slice(firstIndex, lastIndex);
  const totalUsers = filteredResult.length;
  const totalPages = Math.ceil(totalUsers / rowsLimit);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  //Edit Form
  const handleEditForm = (event) => {
    event.preventDefault();
    const name = event.target.getAttribute("name");
    const value = event.target.value;
    const newFormData = { ...editForm };
    newFormData[name] = value;
    setEditForm(newFormData);
  };

  //Edit Button
  const handleEditButton = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);

    const formValues = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    setEditForm(formValues);
  };

  //Cancel Button
  const handleCancelButton = () => {
    setEditUserId(null);
  };

  //Submit Form
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const editedUser = {
      id: editUserId,
      name: editForm.name,
      email: editForm.email,
      role: editForm.role,
    };

    const newUsers = [...users];
    const idx = users.findIndex((contact) => contact.id === editUserId);
    newUsers[idx] = editedUser;

    setUsers(newUsers);
    setEditUserId(null);
  };

  //Filter Users
  const filter = (e) => {
    if (search !== "") {
      const searchRes = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredResult(searchRes);
    } else {
      setFilteredResult(users);
    }
  };

  // Delete Button
  const handleDeleteClick = (user_id) => {
    const updatedUser = users.filter((u) => user_id !== u.id);
    setUsers(updatedUser);
  };

  //Select CheckBox
  const handleSelect = (user_id) => {
    let selectedUsers;
    if (selectCheckBox.includes(user_id)) {
      selectedUsers = selectCheckBox.filter((user) => {
        return (user !== user_id);
      });
    } else {
      selectedUsers = [...selectCheckBox, user_id];
    }
    setSelectCheckBox(selectedUsers);
  };

  //Select All CheckBoxes
  const selectAllUsers = () => {
    if (selectCheckBox.length !== usersPerPage.length) {
      setSelectAllCheckBox(true);
      setSelectCheckBox(
        usersPerPage.map((user) => {
          return user.id;
        })
      );
    } else {
      setSelectAllCheckBox(false);
      setSelectCheckBox([]);
    }
  };

  //Multiple User Deletion
  const deleteMultipleUsers = () => {
    setSelectAllCheckBox(false);
    for (let idx = 0; idx < selectCheckBox.length; idx++) {
      handleDelete(selectCheckBox[idx]);
    }
  };

  //Single User Deletion
  const handleDelete = (user_id) => {
    setUsers((prevUser) => prevUser.filter((user) => user.id !== user_id));
  };

  //Update Current Page
  const pageUpdate = () => {
    if (usersPerPage.length === 0) {
      setCurrentPageNum(totalPages);
    }
  };

  //Update Page No.
  useEffect(() => {
    if (currentPageNum === 1) {
      return;
    }
    pageUpdate();
  }, [handleDelete]);

  //Fetch users first time
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  //Update users based on filter
  useEffect(() => {
    filter();
  }, [users, search]);

  return (
    <Fragment>
      <span className="heading">
        <h2>Admin UI</h2>
      </span>
      <div className="container">
        <input
          type="text"
          placeholder="Search by name,email or role "
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />

        <form onSubmit={handleFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    id="checkBox"
                    checked={selectAllCheckBox}
                    onClick={selectAllUsers}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersPerPage.length ? (
                usersPerPage.map((user) => (
                  <Fragment key={user.id}>
                    {editUserId === user.id ? (
                      <EditRow
                        user={user}
                        editForm={editForm}
                        handleEditForm={handleEditForm}
                        handleCancelButton={handleCancelButton}
                        checked={selectCheckBox.includes(user.id)}
                        selectUser={() => handleSelect(user.id)}
                        deleteUser={() => handleDelete(user.id)}
                      />
                    ) : (
                      <ReadRow
                        user={user}
                        handleEditButton={handleEditButton}
                        handleDeleteClick={handleDeleteClick}
                        checked={selectCheckBox.includes(user.id)}
                        selectUser={() => handleSelect(user.id)}
                        deleteUser={() => handleDelete(user.id)}
                      />
                    )}
                  </Fragment>
                ))
              ) : (
                <tr>
                  <th colSpan={5}>No user found</th>
                </tr>
              )}
            </tbody>
          </table>
        </form>

        <span className="buttons">
          <button className="deleteAll" onClick={() => deleteMultipleUsers()}>
            Delete Selected
          </button>

          <Pagination
            currentPageNum={currentPageNum}
            numbers={numbers}
            totalPages={totalPages}
            setCurrentPageNum={setCurrentPageNum}
            totalUsers={totalUsers}
          />
        </span>
      </div>
    </Fragment>
  );
};

export default Table;
