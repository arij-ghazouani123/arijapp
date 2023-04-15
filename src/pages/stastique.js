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



 // Fetch the latest release with the same note
 const response = await  axios.get(`/api/releases?notes=${formData.Notes}`).then((res) => {
  //setReleases(res.data);
});
 const data = await response.json();

 // Calculate the new version number
//  let newVersion = "1.0";
//  if (data.length > 0) {
//    const lastVersion = data[0].Version;
//    const versionArr = lastVersion.split(".");
//    versionArr[1] = parseInt(versionArr[1]) + 1;
//    newVersion = versionArr.join(".");
//  }
















    const formDataF = new FormData();
    formDataF.append("Notes", formData.Notes);
    formDataF.append("Date", formData.Date);
    formDataF.append("Testeur", formData.Testeur);
    formDataF.append("Version", formData.Version);

    formDataF.append("apkFile", formData.apkFile);

    try {
      const response = await axios.post("/api/release", formDataF, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
      setMessage(response.data.message);
      navigate.push("/Release")})

    } catch (error) {
      setError(error.response.data.error);
    }
    
  };

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
      const testeur = response.data.map(({ user: { username } }) => ({
        username,
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
   <div className='dash'>
  <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 4,
            textAlign: 'center',
            flexDirection: 'column',
          }}
        >
          <Paper elevation={3}
            sx={{
              p: 3,
              marginLeft: 0,
              marginTop: 4,
              height: 100,
              // background: 'linear-gradient(#00d4ff, #6666d6)',
              background: 'linear-gradient(109deg, rgba(21,1,255,0.7484243697478992) 0%, rgba(18,125,215,1) 58%, rgba(120,226,238,1) 100%)',
              width: 260,
              boxShadow: '0px 2px 20px #181a1f',

              
            }}>
            <Typography variant="h6" >Total Release</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',

                justifyContent: 'center',
              }}
            >
              <Group sx={{ height: 30, width: 70, opacity: 0.3, mr: 1 }} />
              <Typography variant="h4">{users.length}</Typography>
            </Box>
          </Paper>
          {/* // 2eme */}
          <Paper elevation={3}
            sx={{
              p: 3,
              marginLeft: 10,
              marginTop: 4,
              height: 100,
              // background: 'linear-gradient(#00d4ff, #6666d6)',
              background: 'linear-gradient(109deg, rgba(21,1,255,0.7484243697478992) 0%, rgba(18,125,215,1) 58%, rgba(120,226,238,1) 100%)',
              width: 260,
              boxShadow: '0px 2px 20px #181a1f',

              
            }}>
            <Typography variant="h6" >Total Testeur</Typography>
            
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',

                justifyContent: 'center',
              }}
            >
              <Group sx={{ height: 30, width: 70, opacity: 0.3, mr: 1 }} />
              <Typography variant="h4">{TesteurCount}</Typography>
            </Box>
          </Paper>
          <Paper elevation={3}
            sx={{
              p: 3,
              marginLeft: 10,
              marginTop: 4,
              height: 100,
              // background: 'linear-gradient(#00d4ff, #6666d6)',
              background: 'linear-gradient(109deg, rgba(21,1,255,0.7484243697478992) 0%, rgba(18,125,215,1) 58%, rgba(120,226,238,1) 100%)',
              width: 260,
              boxShadow: '0px 2px 20px #181a1f',

              
            }}>
            <Typography variant="h6" >Total Testeur</Typography>
            
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',

                justifyContent: 'center',
              }}
            >
              <Group sx={{ height: 30, width: 70, opacity: 0.3, mr: 1 }} />
              <Typography variant="h4">{TesteurCount}</Typography>
            </Box>
          </Paper>

</Box> 
<div style={{marginLeft: 0, marginTop:50, marginBottom:0}} >  <Row><Col style={{marginTop:50, marginLeft: 80}}>

          <PieChart width={200} height={200}  >
        <Pie
          data={data2}
          cx={100}
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        > 
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart></Col>
        <Col style={{marginTop: 10}}>

          <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.map((entry, index) => (
          <Bar key={entry.name} dataKey="count" fill={colors[index]} />
        ))}
       </BarChart></Col></Row>   
</div>
        


      </div>





        
      </div>
  
  );
}

export default Home;
