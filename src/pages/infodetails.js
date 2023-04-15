import axios from "axios";
import React, { useEffect, useState } from "react";
import { Archive, Award, Clock, Tool } from "react-feather";
import { useParams } from "react-router-dom";
import { Badge, Button, Card, CardBody } from "reactstrap";
import "./info.css";

function Info() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/release/${id}`);
      const testeur = response.data;
      setUsers(testeur);
      console.log("ttttttttt", testeur);
      return testeur;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const downloadFile = async () => {
    try {
      const response = await axios.get(`/api/download/${id}`, {
        responseType: "arraybuffer", // change response type to arraybuffer
      });

      // get the filename from the Content-Disposition header
      const disposition = response.headers["content-disposition"];
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      const filename =
        matches != null && matches[1]
          ? matches[1].replace(/['"]/g, "")
          : users.apkFile;

      // create a Blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // create a temporary URL for the Blob object
      const url = window.URL.createObjectURL(blob);

      // create a link and trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // release the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container" style={{ marginTop: 50 }}>
      <div class="row">
        <Card className="invoice-preview-card">
          <CardBody className="invoice-padding pb-0">
            <div class="col s12">
              <h1 id="header-about">
                <Award size={90} /> {users.Notes}
              </h1>
              <h4 id="stack">
                <Tool style={{ marginRight: 50, marginLeft: 20 }} size={50} />
                <Badge color="danger">
                  Thiss app is not compatible with windows
                </Badge>
              </h4>
              <hr></hr>
              <div class="p-about" style={{ border: 2, borderColor: "black" }}>
                <p>
                  <Archive style={{ marginRight: 60 }} size={40} />
                  <Badge
                    color="primary
                  "
                  >
                    Version :
                  </Badge>{" "}
                  {users.Version}
                </p>{" "}
                <p>
                  <Clock style={{ marginRight: 60 }} size={40} />
                  <Badge color="success" className="badge-glow">
                    Date :
                  </Badge>
                  {users.Date}
                </p>
              </div>
              <hr></hr>
              <div></div> <hr></hr>
              <div>
                <h4 id="find-me">
                  <i class="material-icons">language</i>
                  {users.apkFile} <span></span>
                  <Button onClick={downloadFile}>Download APK</Button>
                </h4>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>{" "}
      <Button
        size="large"
        style={{
          marginTop: "100px",
          borderRadius: "10px",
          background: "lightgray",
        }}
        icon={<Clock />}
        onClick={() => (typeof window !== "undefined" ? window.print() : null)}
      >
        <b>export PDF</b>
      </Button>
    </div>
  );
}

export default Info;
