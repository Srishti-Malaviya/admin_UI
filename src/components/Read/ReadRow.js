import React from "react";
import "./ReadRow.css";
import { MdModeEdit, MdDelete } from "react-icons/md";

const ReadRow = ({
  user,
  handleEditButton,
  checked,
  selectUser,
  deleteUser
}) => {
  return (
    <tr className={checked ? "backgroundChange" : "backgroundOriginal"}>
      <td>
        <input
          type="checkbox"
          name={user.name}
          checked={checked}
          onChange={selectUser}
        />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button
          type="button"
          className="edit"
          onClick={(event) => handleEditButton(event, user)}>
          <MdModeEdit />
        </button>

        <button type="button" className="delete" onClick={deleteUser}>
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default ReadRow;
