//hooks
import React, { useEffect, useState } from "react";
import RowDetails from "../components/RowDetailsEvent";
import axios from "axios";
import Alert from "../components/Alert";
//import { DownloadCloud } from "react-feather";

import { Edit, MoreVertical, Trash } from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Col,
  Input,
  Row,
  Form,
  Label,
  Button,
  Table,
  Badge,
} from "reactstrap";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

import IconButton from "@mui/material/IconButton";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { Box, Paper, Select, Typography } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { Group } from "@material-ui/icons";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,PieChart, Pie, Cell, ResponsiveContainer, } from "recharts";

function Home() {
  // stat to manpulate all components in front
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [testeurCount, setTesteurCount] = useState(0);

  const [testeur, setTesteur] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useHistory();

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (id) => {
    setSelectedRow(id);
    navigate.push(`/info/${id}`);
  };

  const initialPath = "http://localhost:3001/Release/lien/";

  const [formData, setFormData] = useState({
    Notes: "",
    Testeur: "",
    Version: "",
    Date: "",
    apkFile: null,
  });

  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      apkFile: event.target.files[0],
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formDataF = new FormData();
    formDataF.append("Notes", formData.Notes);
    formDataF.append("Date", formData.Date);
    formDataF.append("Testeur", formData.Testeur);
  
    try {
      // Find the last released version of the note
      const lastRelease = await axios.get(`/api/release?Notes=${formData.Notes}&sort=-Version&limit=1`);
  
      // Get the last version number, or set it to 1.0 as a fallback
      let lastVersion = 1.0;
      if (lastRelease && lastRelease.data && lastRelease.data.length > 0) {
        lastVersion = lastRelease.data[0].Version;
      }
  
      // Increment the new version number by 0.1
      const newVersion = lastVersion + 0.1;
      formDataF.append("Version", newVersion);
  
      formDataF.append("apkFile", formData.apkFile);
  
      const response = await axios.post("/api/release", formDataF, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setMessage(response.message);
      navigate.push("/Release");
    } catch (error) {
      setError(error.response.error);
    }
  };
  
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const formDataF = new FormData();
  //   formDataF.append("Notes", formData.Notes);
  //   formDataF.append("Date", formData.Date);
  //   formDataF.append("Testeur", formData.Testeur);
  //   formDataF.append("Version", formData.Version);

  //   formDataF.append("apkFile", formData.apkFile);

  //   try {
  //     const response = await axios.post("/api/release", formDataF, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }).then((response) => {
  //     setMessage(response.data.message);
  //     navigate.push("/Release")})

  //   } catch (error) {
  //     setError(error.response.data.error);
  //   }
    
  // };

  /* delete */
  const OnDelete = (id__) => {
    if (window.confirm("are you sure to delete this release")) {
      axios.delete(`/api/release/${id__}`).then((res) => {
        setMessage(res.data.message);
        setShow(true);
        //to refresh table after delete
        loadRelease();
        setTimeout(() => {
          // Alert or notification whene delete show in 0.4 second
          setShow(false);
        }, 4000);
      });
    }
  };
  const handleTesteurChange = (event) => {
    const { value } = event.target;
    console.log(event);
    setFormData({
      ...formData,
      Testeur: value,
    });
  };
  //when window show in first one
  useEffect(async () => {
    loadRelease();
    loadTesteur();
  }, []);
  useEffect(() => {
    setUserCount(users.length);
    setTesteurCount(users.reduce((count, user) => {
      if (user.Testeur) {
        return count + 1;
      }
      return count;
    }, 0));
  }, [users]);
  const loadRelease = async () => {
    await axios.get("/api/release").then((res) => {
      setUsers(res.data);
    });
  };

  const loadTesteur = async () => {
    try {
      const response = await axios.get("/api/releaseTesteur");
      const testeur = response.data.map(({ user: { userName } }) => ({
        userName,
      }));
      setTesteur(testeur);
      console.log("ttttttttt", testeur);
      return testeur;
    } catch (error) {
      console.log(error.message);
    }
  };
  const TesteurCount = users.reduce((count, user) => {
    if (user.Testeur) {
      return count + 1;
    }
    return count;
  }, 0);



  // const chartData = {
  //   labels: ['Users'],
  //   datasets: [
  //     {
  //       label: 'Number of users',
  //       data: [users.length],
  //       backgroundColor: ['rgba(54, 162, 235, 0.2)'],
  //       borderColor: ['rgba(54, 162, 235, 1)'],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       ticks: {
  //         stepSize: 1,
  //       },
  //     },
  //   },
  // };
  const data = [
    { name: 'User Count', count: userCount },
    { name: 'Testeur Count', count: testeurCount },
  ];

  const colors = ['#8884d8', '#82ca9d'];
  const data2 = [
    { name: 'User Count', value: userCount },
    { name: 'Testeur Count', value: testeurCount },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };




  return (
<div>
    <div className="row p-6" style={{marginTop:-40, marginLeft:30}} >
      {/* alert show */}
      <Alert message={message} show={show} />
      <div className="mt-4">
        <h2> Release Mangement</h2>
      </div>

      <div className="col-12 col-lg-8"  >
        <Table className="table"  >
          <thead>
            <tr>
              <th scope="col">File</th>
              <th scope="col">Version</th>
              <th scope="col">Notes</th>
              <th scope="col">Date</th>
              <th scope="col">Testeur</th>
              <th scope="col" onClick={(e) => {
          // prevent row click handler from being called
          e.stopPropagation();
        }}>Actions</th>
            </tr>
          </thead>
          <tbody>
          {users.map(({ Notes, Testeur, Version, Date, Lien, _id }) => (
      <tr
        key={_id}
        className={selectedRow === _id ? "selected" : ""}
      >
        <td onClick={() => handleRowClick(_id)}>
          <FolderCopyIcon style={{ color: "yellow" }} />
        </td>
        <td onClick={() => handleRowClick(_id)}>
          <Badge color="danger">{Version}</Badge>
        </td>
        <td onClick={() => handleRowClick(_id)}>{Notes}</td>
        <td onClick={() => handleRowClick(_id)}>{Date}</td>
        <td onClick={() => handleRowClick(_id)}>{Testeur}</td>
        <td>
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
              <DropdownItem
                href="/"
                onClick={(e) => e.preventDefault()}
              >
                <Edit className="me-50" size={15} />
                <span className="align-middle">
                  <Link to={`/release/${_id}`} className="text-black">
                    Edit
                  </Link>
                </span>
              </DropdownItem>
              <DropdownItem
                href="/"
                onClick={(e) => e.preventDefault()}
              >
                <Trash className="me-50" size={15} />
                <span
                  className="align-middle"
                  onClick={() => OnDelete(_id)}
                >
                  Delete
                </span>
              </DropdownItem>
              <DropdownItem
               
                onClick={(e) => e.preventDefault()}
              >
                <Trash className="me-50" size={15} />
                <span
                  className="align-middle"
                 
                >
                  Disable
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
    ))}
          </tbody>
        </Table>
      </div>

      <div className="col-12 col-lg-4">
        <div>
          <h1>Add New Release</h1>
          <Form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="Notes">Notes</Label>
              <Input
                type="text"
                name="Notes"
                value={formData.Notes}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <h5>Testeur</h5>



              <select
                style={{ width: 180, height: 40, borderRadius: 20 }}
                value={formData.Testeur}
                onChange={handleTesteurChange}
              >

              <option value="">Select Testeur</option>


                {testeur.map((t, index) => (
                  <option key={index} value={t.userName}>
                    {t.userName}
                  </option>
                ))}
              </select>
            </div>
            {/* <div>
              <Label htmlFor="Version">Version</Label>
              <Input
                type="text"
                name="Version"
                value={formData.Version}
                onChange={handleInputChange}
                required
              />
            </div> */}
            <div>
              <Label htmlFor="Date">Date</Label>
              <Input
                type="date"
                name="Date"
                value={formData.Date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="apkFile">APK File</Label>
              <Input type="file" name="apkFile" onChange={handleFileChange} />
            </div>

            <Button type="submit">Add Release</Button>
          </Form>
        </div>

        
      </div>
    </div></div>
  );
}

export default Home;
