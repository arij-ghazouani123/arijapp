import React, { Fragment, useState } from "react";
import axios from "axios";

const Fileapk = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/vnd.android.package-archive') {
      setSelectedFile(file);
    } else {
      alert('Please select an APK file');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('apk', selectedFile);

      axios.post('/api/upload', formData)
        .then((response) => {
          console.log(response.data);
          alert('APK file uploaded successfully');
        })
        .catch((error) => {
          console.error(error);
          alert('Error uploading APK file');
        });
    } else {
      alert('Please select an APK file');
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Select APK file:</label>
        <input type="file" id="file" accept=".apk" onChange={handleFileSelect} />
        <button type="submit">Upload</button>
      </form>
    </Fragment>
  );
};

export default Fileapk;