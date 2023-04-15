import axios from "axios";
import React from "react";
import { Edit, MoreVertical, Trash } from "react-feather";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

  function RowDetails({ Notes,Testeur,Version,Date, Id, OnDelete }) {
  return (
    <tr>
      <th>{<FolderCopyIcon style={{color:"gold"}}/>}</th>
      <th>{Version}</th>
      <td>{Notes}</td>
      <td>{Date}</td>
      <td>{Testeur}</td>

      <td className="gap__actions">
        <UncontrolledDropdown>
          <DropdownToggle
            className="icon-btn hide-arrow"
            color="transparent"
            size="sm"
            caret
          >
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
              <Edit className="me-50" size={15} />
              <span className="align-middle" >
              
                <Link to={`/${Id}`} className="text-black" >
                Edit
                </Link>
              </span>
            </DropdownItem>
            <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
              <Trash className="me-50" size={15} />
              <span className="align-middle" onClick={()=>OnDelete(Id)}>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        {/* <span className="badge bg-info">
        <Link to={`/${Id}`} className="text-white">
          <i className="fas fa-edit"></i>
        </Link>
      </span>

      <span className="badge bg-danger" onClick={()=>OnDelete(Id)}>
        <i className="fas fa-trash-alt"></i>
      </span> */}
      </td>
    </tr>
  );
}

export default RowDetails;
