import React from "react";
import "./EditRow.css";
import { MdOutlineCancel, MdSave } from "react-icons/md";

const EditRow = ({
  user,
  editForm,
  handleEditForm,
  handleCancelButton,
  checked,
  selectUser
}) => {
  return (
    <tr className={checked ? "backgroundChange" : "backgroundOriginal"}>
      <td>
        <input
          type="checkbox"
          name={user.name}
          className="innercheckBox"
          checked={checked}
          onChange={selectUser}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="name"
          size="12"
          value={editForm.name}
          onChange={handleEditForm}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter an email"
          name="email"
          size="20"
          value={editForm.email}
          onChange={handleEditForm}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter a role"
          name="role"
          size="5"
          value={editForm.role}
          onChange={handleEditForm}
        ></input>
      </td>
      <td>
        <button type="submit" className="save">
          <MdSave />
        </button>
        <button type="button" className="cancel" onClick={handleCancelButton}>
          <MdOutlineCancel />
        </button>
      </td>
    </tr>
  );
};

export default EditRow;
