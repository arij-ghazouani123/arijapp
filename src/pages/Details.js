import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useNavigate, useParams } from "react-router-dom";
import InputGroup from "../components/InputGroupEvent";

function Details() {
  const [testeur, setTesteur] = useState([]);

  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useHistory();
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleTesteurChange = (event) => {
    const { value } = event.target;
    console.log(event);
    setForm({
      ...form,
      Testeur: value,
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
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formDataF = new FormData();

    formDataF.append("Testeur", formData.Testeur);

    axios.put(`/api/release/release/${id}`, form)
      .then((res) => {
        //rederction
        navigate.push("/Release");
        loadRelease();
      })
      .catch((err) => setErrors(err.response.data));
  };
  const loadRelease = async () => {
    await axios.get("/api/release").then((res) => {
      setUsers(res.data);
    });
  };
  useEffect(async () => {
    await axios.get(`/api/release/${id}`).then((res) => {
      setForm(res.data);
      loadTesteur();
    });
  }, []);

  const [formData, setFormData] = useState({
    Notes: "",
    Testeur: "",
    Version: "",
    Date: "",
  });

  return (
    <div className="container mt-4 col-12 col-lg-4">
      <form onSubmit={onSubmitHandler}>
        <InputGroup
          label="Notes"
          type="text"
          name="Notes"
          onChangeHandler={onChangeHandler}
          errors={errors.Notes}
          value={form.Notes}
        />
        <InputGroup
          label="Date"
          type="text"
          name="Date"
          onChangeHandler={onChangeHandler}
          errors={errors.Date}
          value={form.Date}
        />
        <h5>Testeur</h5>

        <select value={formData.Testeur} onChange={handleTesteurChange}>
          <option value="">Select Testeur</option>
          {testeur.map((t, index) => (
            <option key={index} value={t.userName}>
              {t.userName}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" type="submit">
          Update Release
        </button>
      </form>
    </div>
  );
}

export default Details;
