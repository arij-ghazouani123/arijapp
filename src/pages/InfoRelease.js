import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Link,
  Redirect,
  useHistory,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Card,
  CardBody,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import InputGroup from "../components/InputGroupEvent";
import S from "./ss.png";
import QR from "./QRCODE";
import { DollarSign, Heart, ShoppingCart } from "react-feather";

function Details() {
  const [testeur, setTesteur] = useState([]);

  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useHistory();
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  const [centeredModal, setCenteredModal] = useState(false);

  useEffect(async () => {
    await axios.get(`/api/release/${id}`).then((res) => {
      setForm(res.data);
      console.log("zzzzzzzzzz", form);
    });
  }, []);

  return (
    <div style={{ marginLeft: 350, marginTop: 100 }}>
      <div
        className="card"
        style={{
          width: 1000,
          height: 400,
          background:
            "linear-gradient(162deg, rgba(28,101,217,1) 0%, rgba(28,101,217,1) 38%, rgba(43,67,244,0.6896008403361344) 61%)",
        }}
      >
        <div className="card-header">Release Data</div>
        <div className="card-body">
          <Card className="invoice-preview-card">
            <CardBody className="invoice-padding pb-0">
              {/* Header */}
              <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                <div>
                  <div className="logo-wrapper">
                    <img style={{ width: "30%" }} src={S} alt="" />
                    <h3
                      className="text-primary invoice-logo"
                      style={{ marginLeft: 30 }}
                    >
                      Release Info
                    </h3>
                  </div>
                  <div
                    className="invoice-date-wrapper"
                    style={{ marginTop: 62, width: 200 }}
                  >
                    <h4 className="invoice-date-title">Version Release :</h4>
                    <p className="invoice-date"></p>
                  </div>
                  <div className="invoice-date-wrapper">
                    <p className="invoice-date-title">{form.Version}</p>
                    <p className="invoice-date"></p>
                  </div>
                </div>
                <div
                  style={{
                    maxWidth: 200,
                    marginLeft: 80,
                    marginRight: "20%",
                    marginBottom: 0,
                  }}
                >
                  <h4 className="invoice-title">
                    Notes:
                    <CardText className="mb-0">{form.Notes}</CardText>{" "}
                    <span className="invoice-number"></span>
                  </h4>
                  <div
                    className="invoice-date-wrapper"
                    style={{ marginTop: 70, width: 150 }}
                  >
                    <h4 className="invoice-date-title">Name file :</h4>
                    <p className="invoice-date"></p>
                  </div>
                  <div className="invoice-date-wrapper">
                    <p className="invoice-date-title">{form.apkFile}</p>
                    <p className="invoice-date"></p>
                  </div>
                </div>
                <div className="mt-md-0 mt-2">
                  <div className="invoice-date-wrapper">
                    <p className="invoice-date-title">Date create:</p>
                    <p className="invoice-date"></p>
                  </div>
                  <h4
                    className="invoice-title"
                    style={{ marginRight: "50%", marginBottom: 0, width: 300 }}
                  >
                    <CardText className="mb-25">{form.Date}</CardText>{" "}
                    <span className="invoice-number"></span>
                  </h4>
                </div>
              </div>
              {/* /Header */}
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="vertically-centered-modal">
        <Button
          color="primary"
          outline
          onClick={() => setCenteredModal(!centeredModal)}
        >
          Release Scan
        </Button>
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
          Release Scan
          </ModalHeader>
          <ModalBody>
            <QR />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => setCenteredModal(!centeredModal)}
            >
              Accept
            </Button>
            <span className="align-middle">
                          <Link to={`/Android/${form._id}`} className="text-black">
                          http://localhost:3001/Android/{form.Notes}
                          </Link>
                        </span>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default Details;
