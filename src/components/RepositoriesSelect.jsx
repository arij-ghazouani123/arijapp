import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import JSZip from "jszip";
import './RepositoriesSelect.css';

import { Progress } from 'antd';

import { CircularProgressbar } from 'react-circular-progressbar';
import { buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faHammer, faWrench, faDownload, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FormatAlignCenter } from '@material-ui/icons';
import React from 'react';
import CryptoJS from 'crypto-js';
import { Octokit } from '@octokit/core';
import GitHubAuth from './GitHubAuth';

function RepositorySelect(props) {

  const [repositories, setRepositories] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState(null);
  const [selectedAndroidmodule, SetselectedAndroidmodule] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showRepositoryModal, setShowRepositoryModal] = useState(false);
  const handleRepositoryModalClose = () => setShowRepositoryModal(false);
  const handleRepositoryModalShow = () => setShowRepositoryModal(true);
  const [downloadLink, setDownloadLink] = useState(null);
  const [buildProgress, setBuildProgress] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isBuildComplete, setIsBuildComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedOS, setSelectedOS] = useState("");
  const [IsSgined, setIsSgined] = useState("");
  const [IsDistributed, setIsDistributed] = useState("");
  


  const [selectedBuildVariant, setSelectedBuildVariant] = useState("");
  const [isAndroidAppBundle, setIsAndroidAppBundle] = useState(false);
  const [isIncrementVersionCode, setIsIncrementVersionCode] = useState(false);
  const [isRunUnitTests, setIsRunUnitTests] = useState(true);
  const [isfailed] = useState(false);
  const [key_Base64, setkey_Base64] = useState('');
  const [Keystore_password, setKeystore_password] = useState('');
  const [Key_alias, setKey_alias] = useState('');
  const [Key_password, setKey_password] = useState('');
  const [secretName, setSecretName] = useState('');
  const [secretValue, setSecretValue] = useState('');

  const [alias, setAlias] = useState('');
  const [keyPassword, setKeyPassword] = useState('');
  const [keystorePassword, setKeystorePassword] = useState('');
  const [signingKeyFile, setSigningKeyFile] = useState(null);
  const [credentialsFile, setcredentialsFile] = useState(null);

  const [IosfileContents, setIosFileContents] = useState('');
  const [AndroidfileContents, setAndroidFileContents] = useState('');
  const [Flutter_AndroidfileContents, setFlutter_AndroidfileContents] = useState('');
  const [Flutter_IosfileContents, setFlutter_IosfileContents] = useState('');

  const [accessToken, setAccessToken] = useState(null);

  //const token ="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"
  
  const token ="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"
  

  const handleTokenChange = (token) => {
    setAccessToken(token);
  };

  const handleSigningKeyChange = (event) => {
    const file = event.target.files[0];
    setSigningKeyFile(file);
  };

  const handlecredentialsChange = (event) => {
    const file = event.target.files[0];
    setcredentialsFile(file);
  };

  useEffect(() => {
    axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        setRepositories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Fetch the branches of the selected repository
  useEffect(() => {
    if (selectedRepository) {
      axios.get(`https://api.github.com/repos/${selectedRepository.full_name}/branches`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })

        .then(response => {
          setBranches(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selectedRepository]);


  const handleDownloadLogsClick = () => {
    axios
      .get(`https://api.github.com/repos/${selectedRepository.full_name}/actions/runs?status=completed&branch=${selectedBranch.name}`)
      .then((res) => {
        const lastBuild = res.data.workflow_runs[0];
        const logsUrl = lastBuild.logs_url;
        axios
          .get(logsUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3.raw",
            },
            responseType: "blob",
          })
          .then((res) => {
            const blob = new Blob([res.data], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            setDownloadLink(url);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const buildApp = (workflowName, isAppBundle) => {
    axios.post(
      `https://api.github.com/repos/${selectedRepository.full_name}/actions/workflows/${workflowName}.yml/dispatches`,
      {
        ref: selectedBranch.name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setBuildProgress(percentCompleted);
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          alert("Build In Progress");
          const interval = setInterval(() => {
            setProgress((prevProgress) => {
              const newProgress = prevProgress + 1;
              if (newProgress > 100) {
                clearInterval(interval);
                setIsBuildComplete(true);
                axios
                  .get(
                    `https://api.github.com/repos/${selectedRepository.full_name}/actions/runs?status=completed&branch=${selectedBranch.name}`
                  )
                  .then(async (res) => {
                    const lastBuild = res.data.workflow_runs[0];
                    if (lastBuild.conclusion === "success") {
                      alert("Build complete! ✅");

                      // Download APK and attach it to the form data
                      const downloadArtifact = async (url) => {
                        const headers = {
                          Authorization: `Bearer ${token}`,
                          Accept: 'application/vnd.github.v3+json',
                        };
                        const response = await fetch(url, { headers });
                        const blob = await response.blob();
                        const zip = await JSZip.loadAsync(blob);
                        const apkFile = Object.values(zip.files).find(file => file.name.endsWith('.apk'));
                        if (!apkFile) {
                          console.error('APK file not found in artifact ZIP');
                          return;
                        }
                        const apkBlob = await apkFile.async('blob');
                        return new File([apkBlob], apkFile.name, { type: apkBlob.type });
                      };

                      const owner = 'Mondher19';
                      const repo = 'Build';
                      const artifactUrl = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/artifacts?per_page=1&page=1`, {
                        headers: {
                          Accept: 'application/vnd.github.v3+json',
                          Authorization: `Bearer ${token}`,
                        },
                      })
                        .then((response) => response.json())
                        .then((data) => data.artifacts[0].archive_download_url)
                        .catch((error) => console.error(error));

                      const apkFile = await downloadArtifact(artifactUrl);

                      // Create a new FormData object to send the build data and file together
                      const formData = new FormData();
                      formData.append("Notes", selectedBranch.name);
                      formData.append("Version", isAppBundle);
                      formData.append("status", "success");
                      formData.append("Testeur", "release");
                      formData.append("Date", new Date().toISOString());
                      formData.append("lien", "release");
                      formData.append("apkFile", apkFile);

                      axios.post("http://localhost:9090/api/release", formData);






                    } else {
                      isfailed = true;
                      alert(
                        "Build failed ❌ Please Check your Logs for More Details"
                      );
                      const buildData = {
                        name: workflowName,
                        isAppBundle: isAppBundle,
                        status: "failed",
                        date: new Date().toISOString(),
                      };
                      axios.post("http://localhost:9090/addBuild", buildData);
                    }
                  })
                  .catch((err) => console.log(err));
              }
              return newProgress > 100 ? 100 : newProgress;
            });
          }, 2300);

          // Stop updates after 10 seconds
          setTimeout(() => {
            clearInterval(interval);
          }, 310000);
        } else {
          alert("Please Select The Right System");
        }
      })
      .catch((error) => {
        console.log("Please Select The Right Operating System");
        alert("Please Select The Right Operating System ");
      });




  };


  //create a file 




  const octokit = new Octokit({ auth: token });




  async function createFile_Flutter_Android() {
    try {


      const response1 = await fetch('/Flutter_Android.txt');
      const text1 = await response1.text();
      const fileContents = text1;
      const encodedContents = btoa(fileContents);




      const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'Mondher19',
        repo: 'Flutter-Project-Mondher',
        path: '.github/workflows/Flutter_Android_Build.yml',
        message: 'a new commit message',
        committer: {
          name: 'Monalisa Octocat',
          email: 'octocat@github.com'
        },
        content: encodedContents,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      console.log('File created successfully!');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }


  async function createDirectory(token, owner, repo, directoryPath) {
    try {


      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${directoryPath}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: 'Create directory',
          content: '',
          path: directoryPath
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create directory');
      }

      console.log('Directory created successfully');
    } catch (error) {
      console.log(error);
    }
  }


  async function createFile_Ios() {
    try {


      const response1 = await fetch('/Ios.txt');
      const text1 = await response1.text();
      const fileContents = text1;
      const encodedContents = btoa(fileContents);



      const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'Mondher19',
        repo: 'Calculator-SPM-local',
        path: '.github/workflows/Ios_Build.yml',
        message: 'a new commit message',
        committer: {
          name: 'Monalisa Octocat',
          email: 'octocat@github.com'
        },
        content: encodedContents,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      console.log('File created successfully!');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }



  async function createFile_Android() {
    try {

      const response1 = await fetch('/Android.txt');
      const text1 = await response1.text();
      const fileContents = text1;
      const encodedContents = btoa(fileContents);

      const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'Mondher19',
        repo: "Build",
        path: '.github/workflows/Android_build.yml',
        message: 'a new commit message',
        committer: {
          name: 'Monalisa Octocat',
          email: 'octocat@github.com'
        },
        content: encodedContents,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      console.log('File created successfully!');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }



  async function addOrUpdateSecrets() {


    const owner = 'Mondher19';
    const repo = 'Build';
    const publicKey = '568250167242549743';

    const secrets = [
      { secret_name: 'ALIAS1', secret_value: alias },
      { secret_name: 'KEYPASSWORD1', secret_value: keyPassword },
      { secret_name: 'KEYSTOREPASSWORD1', secret_value: keystorePassword },
      { secret_name: 'SIGNINGKEYBASE641', secret_value: signingKeyFile },
    ];


    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      };

      for (let i = 0; i < secrets.length; i++) {
        const { secret_name, secret_value } = secrets[i];
        let encryptedValue;

        if (secret_value instanceof File) {
          // Read the contents of the file
          const fileReader = new FileReader();
          fileReader.readAsDataURL(secret_value);

          fileReader.onload = (event) => {
            const fileContents = event.target.result.split(',')[1]; // Get the base64-encoded contents

            // Encrypt the file contents using asymmetric-key encryption
            encryptedValue = CryptoJS.AES.encrypt(fileContents, publicKey).toString();


            // Create or update the secret in the repository
            const data = {
              encrypted_value: encryptedValue,
              key_id: publicKey
            };

            axios.put(`https://api.github.com/repos/${owner}/${repo}/actions/secrets/${secret_name}`, data, config)
              .then(response => {
                console.log(`Secret ${secret_name} added/updated successfully.`);
              })
              .catch(error => {
                console.log(`Failed to add/update secret ${secret_name}: ${error.message}`);
              });
          };
          fileReader.onerror = (event) => {
            console.log(`Failed to read file ${secret_value.name}: ${event.target.error}`);
          };
        } else {
          // Encrypt the secret value using asymmetric-key encryption

          encryptedValue = CryptoJS.AES.encrypt(secret_value, publicKey).toString();

          // Create or update the secret in the repository
          const data = {
            encrypted_value: encryptedValue,
            key_id: publicKey
          };

          axios.put(`https://api.github.com/repos/${owner}/${repo}/actions/secrets/${secret_name}`, data, config)
            .then(response => {
              alert(`Secret ${secret_name} added/updated successfully.`);
            })
            .catch(error => {
              console.log(`Failed to add/update secret ${secret_name}: ${error.message}`);
            });
        }
      }
    } catch (error) {
      alert(`Failed to add/update secrets: ${error.message}`);
    }
  }

  function handleFormSubmit(event, secretName, secretValue) {
    event.preventDefault();
    addOrUpdateSecrets();

  }


  async function addOrUpdateCredentials() {

    const owner = 'Mondher19';
    const repo = 'Build';
    const publicKey = '568250167242549743';
    const secretName = 'GOOGLE_PLAY_PUBLISH_CREDENTIALS';
    const secretValue = credentialsFile;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      };

      const fileReader = new FileReader();
      fileReader.readAsDataURL(secretValue);



      fileReader.onload = (event) => {

        const fileContents = event.target.result.split(',')[1]; // Get the base64-encoded contents



        const encryptedValue = CryptoJS.AES.encrypt(fileContents, publicKey).toString(); // Encrypt the file contents using asymmetric-key encryption



        // Create or update the secret in the repository
        const data = {
          encrypted_value: encryptedValue,
          key_id: publicKey
        };

        axios.put(`https://api.github.com/repos/${owner}/${repo}/actions/secrets/${secretName}`, data, config)
          .then(response => {
            alert(`Secret ${secretName} added/updated successfully.`);
          })
          .catch(error => {
            console.log(`Failed to add/update secret ${secretName}: ${error.message}`);
          });
      };

      fileReader.onerror = (event) => {
        console.log(`Failed to read file ${secretValue.name}: ${event.target.error}`);
      };
    } catch (error) {
      console.log(`Failed to add/update secret ${secretName}: ${error.message}`);
    }
  }





  const handleBuildClick = async () => {
    const accessToken = token;
    const owner = 'Mondher19';
    const repo = selectedRepository.full_name.split('/')[1];
    const directoryPath = '.github/workflows/test.yml';

    if (selectedBranch) {
      console.log(`Building ${selectedRepository.full_name}#${selectedBranch.name}`);
      if (selectedBuildVariant === "Release" && isAndroidAppBundle === true && isIncrementVersionCode == true) {
        buildApp("Release_Bundle_inc", true, true);
        setShowModal(false);

      } else if (selectedBuildVariant === "Debug" && isAndroidAppBundle === true && isIncrementVersionCode == true) {
        buildApp("Debug_Bundle_inc", true, true);
        setShowModal(false);

      } else if (selectedOS === "Flutter") {
        await createDirectory(accessToken, owner, repo, directoryPath);
        await createFile_Flutter_Android()
        await buildApp("Flutter_Android_Build", true, true);
        setShowModal(false);

      } else if (selectedOS === "IOS") {
        await createDirectory(accessToken, owner, repo, directoryPath);
        await createFile_Ios()
        await buildApp("Ios_Build", true, true);
        setShowModal(false);

      } else if (selectedOS === "Android") {


        const repo = selectedRepository;

        await createDirectory(accessToken, owner, repo, directoryPath);
        await createFile_Android()
        await buildApp("Android_build", true, true);

        setShowModal(false);



      } else if (selectedBuildVariant === "Debug" && isAndroidAppBundle === false && isIncrementVersionCode == false) {
        buildApp("Debug", false, false);
        setShowModal(false);

      }
      else if (selectedBuildVariant === "Release" && isAndroidAppBundle === false && isIncrementVersionCode == false) {
        buildApp("Release", false, false);
        setShowModal(false);

      } else if (selectedBuildVariant === "Debug" && isAndroidAppBundle === true && isIncrementVersionCode == false) {
        buildApp("Debug_Bundle", true, false);
        setShowModal(false);

      }
      else if (selectedBuildVariant === "Release" && isAndroidAppBundle === true && isIncrementVersionCode == false) {
        buildApp("Release_Bundle", true, false);
        setShowModal(false);

      } else if (selectedBuildVariant === "Debug" && isAndroidAppBundle === false && isIncrementVersionCode == true) {
        buildApp("Debug_inc", false, true);
        setShowModal(false);

      }
      else if (selectedBuildVariant === "Release" && isAndroidAppBundle === false && isIncrementVersionCode == true) {
        buildApp("Release", false, true);
        setShowModal(false);



      }
    }
  };



  const handlekey_Base64Change = (event) => {
    setkey_Base64(event.target.value);
  }

  const handleKeystore_passwordChange = (event) => {
    setKeystore_password(event.target.value);
  }

  const handleKey_aliasChange = (event) => {
    setKey_alias(event.target.value);
  }

  const handleKey_passwordChange = (event) => {
    setKey_password(event.target.value);
  }

  const handleRepositoryChange = (event) => {
    const repository = repositories.find(r => r.full_name === event.target.value);
    setSelectedRepository(repository);
    setSelectedBranch(null);
    setShowModal(false);
  }

  const handleOSChange = (event) => {
    setSelectedOS(event.target.value);
  };

  const handleBuildVariantChange = (event) => {
    setSelectedBuildVariant(event.target.value);
  };

  const handleIncrementVersionCodeChange = () => {
    setIsIncrementVersionCode(!isIncrementVersionCode);
  };




  const handleIsSginedChange = () => {
    setIsSgined(!IsSgined);
  };


  const handleIsDistributedChange = () => {
    setIsDistributed(!IsDistributed);
  };

  const handleRunUnitTestsChange = () => {
    setIsRunUnitTests(!isRunUnitTests);
  };

  const handleSaveBuild = () => {
    // TODO: Implement build configuration saving logic here
    handleClose();
  };

  const handleBranchChange = (event) => {
    const branch = branches.find(b => b.name === event.target.value);
    setSelectedBranch(branch);
  }









  return (
    <div className="my-comp container-fluid " style={{ width: "90%", height: "90%" }}>

      <div class="my-comp row" >

        <div class="my-comp col-lg-15 text-center" >
          <div class="my-comp card text-center">
            <div class="my-comp card-body text-center   "  >

              <div class="my-comp card-body-github" >
                {selectedRepository ? null : (
                  <>

                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI5MCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPmNvbm5lY3Qtc2VydmljZS1pbGx1c3RyYXRpb248L3RpdGxlPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik0yODEuNjUgMTY4LjRoLTM3Ljg3Yy0zLjkyIDAtNi44OCAzLjE4LTYuODggNi45MyAwIDMuOTQgMi45NiA2Ljk1IDYuODggNi45NWgzNy44N2MzLjkgMCA2Ljg2LTMgNi44Ni02Ljk1IDAtMy43NS0yLjktNi45My02LjgtNi45M3oiIGZpbGw9IiNFQkVCRUIiLz48cGF0aCBkPSJNMTU2LjMgMTZjNC40NSAwIDcuNiAzIDcuNiA3LjY4IDAgNC41LTMuMTUgNy41LTcuNiA3LjUtNC40NyAwLTcuNjItMy03LjYyLTcuNSAwLTQuNjggMy4xNS03LjY4IDcuNjItNy42OHptMCAxMi45NGMyLjk2IDAgNS0yLjI0IDUtNS40NSAwLTIuOS0yLjA0LTUuMS01LTUuMS0zIDAtNC44NCAyLjItNC44NCA1IDAgMy4yIDEuODUgNS40MiA0Ljg0IDUuNDJ6bTEwIDEuODdWMTYuNGgyLjZ2MTQuNGgtMi42ek0xNzguNzUgMTZjNC40NiAwIDcuNjIgMyA3LjYyIDcuNjggMCA0LjUtMy4xNiA3LjUtNy42MiA3LjUtNC40NSAwLTcuNi0zLTcuNi03LjUgMC00LjY4IDMuMTUtNy42OCA3LjYtNy42OHptMCAxMi45NGMyLjk4IDAgNS4wMi0yLjI0IDUuMDItNS40NSAwLTIuOS0yLjA0LTUuMS01LjAyLTUuMS0yLjk3IDAtNC44MiAyLjItNC44MiA1IDAgMy4yIDEuODUgNS40MiA0LjgyIDUuNDJ6TTE5NS42NSAxNmM0LjQ1IDAgNy42IDMgNy42IDcuNjggMCA0LjUtMy4xNSA3LjUtNy42IDcuNS00LjQ3IDAtNy42Mi0zLTcuNjItNy41IDAtNC42OCAzLjE1LTcuNjggNy42Mi03LjY4em0wIDEyLjk0YzIuOTcgMCA0LjgyLTIuMjQgNC44Mi01LjQ1IDAtMi45LTEuODUtNS4xLTQuODItNS4xLTMgMC01LjAzIDIuMi01LjAzIDUgMCAzLjIgMi4wNCA1LjQyIDUuMDMgNS40MnptLTQ2LjIzIDI2LjQzVjQwLjkzaDIuNnYxNC40NGgtMi42em01Ljc2IDBWNDAuOTNoMi40djE0LjQ0aC0yLjR6bTEyLjQzLTE0LjhjNC41IDAgNy43IDMgNy43IDcuNXMtMy4xMiA3LjUtNy42IDcuNjhjLTQuNDIgMC03LjYtMy03LjYtNy41IDAtNC42OCAzLjE4LTcuNyA3LjYtNy43em0wIDEyLjkzYzMgMCA0LjktMi40NCA0LjktNS40NCAwLTIuOC0xLjgtNS4yNC00LjgtNS4yNC0yLjk0IDAtNSAyLjQzLTUgNS4yNCAwIDMgMi4wNiA1LjQ0IDUgNS40NHptOS45IDEuODdWNDAuOTNoMi42djE0LjQ0aC0yLjZ6bTUuOCAwVjQwLjkzaDIuNHYxNC40NGgtMi40em0xMi40Ny0xNC44YzQuNDUgMCA3LjYgMyA3LjYgNy41cy0zLjE1IDcuNS03LjYgNy42OGMtNC40NyAwLTcuNjItMy03LjYyLTcuNSAwLTQuNjggMy4xNi03LjcgNy42My03Ljd6bTAgMTIuOTNjMi45NyAwIDUtMi40NCA1LTUuNDQgMC0yLjgtMi4wMy01LjI0LTUtNS4yNC0zIDAtNC44NCAyLjQzLTQuODQgNS4yNCAwIDMgMS44NiA1LjQ0IDQuODUgNS40NHoiIGZpbGw9IiM5RTlFOUUiLz48cGF0aCBkPSJNMTAzLjczIDE2OC40SDcuOTNjLTMuNyAwLTYuODggMy4xOC02Ljg4IDYuOTMgMCAzLjk0IDMuMTcgNi45NSA2Ljg3IDYuOTVoOTUuOGMzLjcyIDAgNi44Ny0zIDYuODctNi45NSAwLTMuNzUtMy4yLTYuOTMtNi45LTYuOTN6IiBmaWxsPSIjRUJFQkVCIi8+PHBhdGggZD0iTTI0Ni43NiAxNzUuODN2LTNsNy02di01OWg5djY0bDUtNXYtNTloMTB2NjhoLTMxek0xMTMuOTMgMTA5LjljLS45MyAwLTEuNjctLjItMi42LS4zOC04LjM0LTEuMy0xMi4yNS05LjE4LTEyLjI1LTkuNTVsMy45LTEuOSA0LjEtMS44NnMyLjAzIDQgNS43NCA0LjZjMy45Ljc3IDguOTItMi4xIDE0LjY2LTcuOWw2LjMyIDYuNGMtNy4wNiA3LjEtMTMuNTUgMTAuNy0xOS44NyAxMC43ek03NC44OCA4NHY3OWw5IDl2M2gtMjJWODRoMTN6bS0yNi4xIDB2NzlsOSA5djNoLTIyVjg0aDEzem0xODYuNjQgMjUuOWMtNi4xNCAwLTEyLjgtMy41Ni0xOS43LTEwLjY4bDYuMzMtNi40YzUuNzUgNS44MiAxMC43NyA4LjY0IDE0LjY3IDcuOSAzLjctLjU3IDUuNzYtNC41IDUuNzYtNC41bDguMjUgMy42Yy0uNDYuNTItNC4xNyA4LjQtMTIuNTMgOS43LS45My4yLTEuODUuMzgtMi43OC4zOHoiIGZpbGw9IiMwMDFGNTIiLz48cGF0aCBkPSJNMTAyLjEzIDQxLjV2NzQuNTVzMCA1LjI4LTUuMiA1LjI4SDUuMjNjLS4wNCAwLTUuMjQgMC01LjI0LTUuMjhWNDEuNWMwLS4wMiAwLTUuMjggNS4yLTUuMjhoOTEuN2MtLjIgMCA1LjIgMCA1LjIgNS4yN3ptMTQyLjQgMGMwLTUuMjggNS4xNi01LjI4IDUuMi01LjI4aDM1LjA1YzUuMjIgMCA1LjIyIDUuMjcgNS4yMiA1LjI3VjExNmMwIDUuMjgtNS4xOCA1LjI4LTUuMjIgNS4yOGgtMzUuMDRjLTUuMjIgMC01LjIyLTUuMjYtNS4yMi01LjI3VjQxLjV6IiBmaWxsPSIjNjYyNTdDIi8+PHBhdGggZD0iTTEzNy4xNCA5Ni4ybC0zLjM0IDMuNC02LjctNi40IDMuMzYtMy41NS4yLS4yYzEuODQtMS44NyA0LjYzLTEuODcgNi40OCAwIDEuODUgMS43IDEuODUgNC43IDAgNi41NnYuMnptLTI4LjQtNTQuOTh2NzVjLjEtLjE2LjEgNS4xLTUgNS05NC42My4xLTk0LjYzLjEtOTUgMCAuMzcuMS01IC4xLTUtNXYtNzVjMCAuMjYgMC01IDUtNWg5NWMtLjEgMCA1LjEgMCA1IDV6bTEzMi44IDBjMC01IDUuNDQtNSA1LTVoMzZjNS4yMiAwIDUuMjIgNS4yNyA1IDUgLjIyLjI3LjIyLjI3IDAgNzUgLjIyIDUuMS01LjIgNS4xLTUgNS0uMi4xLS4yLjEtMzYgMC01IC4xLTUtNS4xNi01LTV2LTc1em0tMjkuMTQgNTVsLS4yLS4yYy0xLjg0LTEuODgtMS42NS00Ljg4IDAtNi41NiAxLjg3LTEuODggNC44NC0xLjg4IDYuNyAwdi4ybDMuNTMgMy41NC02LjcgNi40LTMuMzMtMy40eiIgZmlsbD0iIzk5NTE5OCIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik05IDEwNGg5NVY0MUg5Ii8+PHBhdGggZD0iTTYzLjU3IDU4TDcxIDYxdjI0bC03LjUgMy0xMS45My0xMS44NEw0NCA4MmwtMy0xLjQ4VjY1LjQ4bDMtMS40MyA3LjU3IDUuOTIgMTItMTEuOTd6TTQ0IDY4LjU0djkuMTJsNC41LTQuNjMtNC41LTQuNXptMTEuNzMgNC41bDcuNzcgNi4xMlY2Ni45bC03Ljc3IDYuMTN6IiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTMuODUgMTE2LjF2LjE4YzAgMy4zNyAyLjA0IDQuNSAzLjUyIDUuMDVIOTYuNSA5LjIzcy01LjIgMC01LjM4LTUuMjR6IiBmaWxsPSIjNjEyMzc2Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTI0NyAxMDVoMzVWNDFoLTM1Ii8+PHBhdGggZmlsbD0iI0Y1RjVGNSIgZD0iTTI0NyA2M3Y0MmgzNVY4NCIvPjxwYXRoIGQ9Ik0yMDkgODMuNzNjNC40Mi42IDcuODQgNC40NyA3Ljg0IDkuMSAwIDQuNDctMy40MiA4LjMtNy44NSA4LjkydjMuM2MwIDEuOS0yLjEgMS45LTEuOSAxLjloLTE3LjZjLTEuOSAwLTEuOS0yLjA2LTEuOS0xLjl2LTI0LjFjMC0xLjkgMi0xLjkgMS45LTEuOWgxNy42YzEuOCAwIDEuOCAyLjA3IDEuOCAxLjl2Mi43OHptMCA0Ljc1djguN2MxLjk3LS41NCAzLjM2LTIuMzIgMy4yLTQuMzUuMTYtMi4yLTEuMjMtMy44Ni0zLjItNC4zNXptLTY4LjQ1IDEzLjI3Yy00LjQzLS42LTcuODUtNC40NS03Ljg1LTguOTIgMC00LjYzIDMuNDItOC41IDcuODUtOS4xdi0yLjc4YzAgLjE3IDAtMS45IDEuODgtMS45aDE3LjZjLS4xNyAwIDEuODcgMCAxLjg3IDEuOXYyNC4xYzAtLjE2IDAgMS45LTEuODggMS45aC0xNy42Yy4xNyAwLTEuODcgMC0xLjg3LTEuOXYtMy4zem0wLTQuNTh2LTguN2MtMS45OC41LTMuMzcgMi4xNy0zLjIyIDQuMzYtLjE1IDIuMDMgMS4yNCAzLjggMy4yMiA0LjM0eiIgZmlsbD0iIzAwNzhENCIvPjxwYXRoIGQ9Ik0xNTkuMzggODIuODZ2LjYzYzAtLjMgMCAxLjktMS44IDEuOWgtMTIuN2MuMTcgMC0xLjgzIDAtMS44My0xLjl2LS43YzAgLjIgMC0xLjkgMS44Mi0xLjloMTIuN2MtLjIgMCAxLjggMCAxLjggMS45em0zMC43NyAwdi42M2MwLS4zIDAgMS45IDEuOCAxLjloMTIuN2MtLjE3IDAgMS44MyAwIDEuODMtMS45di0uN2MwIC4yIDAtMS45LTEuODItMS45aC0xMi43Yy4yIDAtMS44IDAtMS44IDEuOXoiIGZpbGw9IiNGRkYiLz48L2c+PC9zdmc+" alt="GitHub" />
                    <h1 class="my-comp text-center" style={{ color: "white" }}>Connect with GitHub</h1>
                    <p style={{ color: "white" }}>Connect your GitHub account to access your repositories.</p>
                    <Button   style={{ display: window.location.search.includes('code=') ? 'block' : 'none' ,
                    margin: '0 auto',
                    textAlign: 'center',
                    marginTop: '20px'}}
                    variant="primary" onClick={() => setShowModal(true)}>
                      Select a Repositorie
                    </Button>

                  </>

                )}
              </div>
              <form>
                <div className="my-comp form-group text-center">

                  <div>



                    <Modal
                      show={showModal}
                      onHide={() => setShowModal(false)}
                      dialogClassName="my-comp modal-90w"
                      aria-labelledby="modal-title"
                      centered
                      style={{
                        position: "absolute",
                        bottom: 0,
                        top: 0,
                        left: 400,
                        right: 0,
                      }}
                    >
                      <Modal.Header closeButton className="my-comp text-center">
                        <Modal.Title id="my-comp modal-title" className="my-comp modal-title">
                          <span style={{ display: "inline-block", marginRight: "10px", position: "relative", top: "3px" }}>
                            <img src="https://github.com/fluidicon.png" alt="GitHub Logo" style={{ width: "40px" }} />
                          </span>
                          GitHub Repositories
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ height: '800px', overflowY: 'auto' }}>
                        <Form>
                          <Form.Group controlId="repositorySelect" >
                            <Form.Label className="my-comp font-weight-bold">
                              <span style={{ display: "inline-block", marginRight: "10px", position: "relative", top: "3px" }}>
                                <img src="https://avatars.githubusercontent.com/u/99404210?v=4&s=30" alt="GitHub Logo" style={{ width: "30px" }} />
                                Mondher19
                              </span>
                            </Form.Label>

                            <Form.Control style={{ height: '700px', overflowY: 'auto' }}
                              as="select"
                              multiple
                              value={selectedRepository}
                              onChange={handleRepositoryChange}
                              className="my-comp border-0 bg-light text-dark"
                            >
                              {repositories.map((repository, index) => (
                                <React.Fragment key={repository.id}>
                                  <option value={repository.full_name}>{repository.full_name}</option>
                                  {index < repositories.length - 1 && <hr />} {/* add <hr> except for last item */}
                                </React.Fragment>
                              ))}
                            </Form.Control>

                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer style={{}}>


                      </Modal.Footer >
                    </Modal>






                  </div>
                </div>


              </form>
              {selectedRepository && (

                <div className="my-comp form-group ">


                  {(
                    <div className="my-comp form-group mt-10">
                      <div>
                        <hr />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <h1> Branches</h1>
                          <Button className="my-comp btn btn-secondary btn-sm icon-btn" onClick={() => setShowModal(true)}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </Button>
                        </div>

                        <hr />

                        <table className="my-comp table table-striped">
                          <thead className="my-comp thead-light">
                            <tr>
                              <th style={{ width: "40%" }}>Name</th>

                              <th className="my-comp text-center" style={{ width: "30%" }}>Status</th>
                              <th className="my-comp text-center" style={{ width: "30%" }}>Build progress</th>
                              <th style={{ width: "20%" }}>Logs</th>
                              <th className="my-comp text-center" style={{ width: "30%" }}>Config</th>
                              <th className="my-comp text-center" style={{ width: "30%" }}>Build</th>
                            </tr>
                          </thead>
                          <tbody>
                            {branches.map((branch) => (
                              <tr key={branch.name} onClick={() => setSelectedBranch(branch)}>
                                <td>{branch.name}</td>

                                <td className="my-comp text-center">
                                  {isBuildComplete ? (

                                    <span className="my-comp badge bg-success">Succeed</span>
                                  ) : progress > 0 ? (
                                    <span className="my-comp badge bg-warning">In Progress</span>
                                  ) : (
                                    <span className="my-comp badge bg-secondary">Not started</span>

                                  )}
                                </td>
                                <td>
                                  <div className="my-comp progress text-center">
                                    <div
                                      className="my-comp progress-bar bg-info"
                                      role="progressbar"
                                      style={{ width: `${progress}%` }}
                                      aria-valuenow={progress}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    >
                                      {progress}%
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="my-comp btn-group" role="group">
                                    {isBuildComplete && (
                                      downloadLink ? (
                                        <a href={downloadLink} download className="my-comp btn btn-secondary btn-sm icon-btn">Download Logs</a>
                                      ) : (
                                        <button className="my-comp btn btn-secondary btn-sm icon-btn" onClick={handleDownloadLogsClick}>
                                          <FontAwesomeIcon icon={faDownload} />
                                        </button>
                                      )
                                    )}
                                  </div>
                                </td>
                                <td className="text-end">
                                  <div className="my-comp btn-group " role="group">
                                    <button type="button" className="my-comp btn btn-secondary btn-sm icon-btn" onClick={handleShow} >
                                      <FontAwesomeIcon icon={faWrench} />
                                    </button>
                                  </div>
                                </td>
                                <td className="my-comp text-end" key={branch.name} onClick={() => setSelectedBranch(branch)}>
                                  <div className="my-comp btn-group" role="group">
                                    <button type="button" className="my-comp btn btn-secondary btn-sm icon-btn" onClick={() => handleBuildClick(branch.name)} >
                                      <FontAwesomeIcon icon={faHammer} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>




                      </div>

                    </div>

                  )}

                </div>

              )}


              <div>

                <Modal show={show} onHide={handleClose}
                  dialogClassName="my-comp modal-90w"
                  aria-labelledby="modal-title"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    top: 0,
                    left: 400,
                    right: 0,
                  }}>


                  <Modal.Header closeButton>

                    <Modal.Title id="my-comp modal-title" className="my-comp modal-title">Build Configuration</Modal.Title>
                  </Modal.Header>

                  <Modal.Body style={{ height: '700px', overflowY: 'auto' }} >

                    <h2 style={{ color: 'white', fontFamily: 'Arial' }}>Build App : </h2>

                    <hr style={{ margin: "20px 0px", padding: "0px" }} />  <div className="my-comp d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h6 style={{ color: 'white' }}>Select Your System : </h6>

                      </div>
                      <Form>
                        <Form.Group>
                          <FormControl
                            as="select"
                            value={selectedOS}
                            onChange={handleOSChange}
                            style={{ width: '100%', maxWidth: '500px', fontSize: "16px" }}
                          >
                            <option value="Release">Select the Opertating System </option>
                            <option value="Flutter" >Flutter</option>
                            <option value="IOS">IOS</option>
                            <option value="Android">Android</option>

                          </FormControl>
                        </Form.Group>
                      </Form>
                    </div>
                    <hr style={{ margin: "20px 0px", padding: "0px" }} />

                    <div className="my-comp d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h6 style={{ color: 'white' }}>Build Variant : </h6>

                      </div>
                      <Form>
                        <Form.Group>
                          <FormControl
                            as="select"
                            value={selectedBuildVariant}
                            onChange={handleBuildVariantChange}
                            style={{ width: '100%', maxWidth: '500px', fontSize: "16px" }}
                          >
                            <option value="0">Select the Build Variant </option>
                            <option value="Release">Release</option>
                            <option value="Debug">Debug</option>
                          </FormControl>
                        </Form.Group>
                      </Form>

                    </div>
                    <hr style={{ margin: "20px 0px", padding: "0px" }} />

                    <div className="my-comp d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h9 style={{ color: 'white' }}>Build Android App Bundle</h9>
                        <h6 style={{ color: 'white' }}>Builds a bundle in addition to your APK.</h6>
                      </div>
                      <Switch
                        checked={isAndroidAppBundle}
                        onChange={() => setIsAndroidAppBundle(!isAndroidAppBundle)}
                      />

                    </div>
                    <hr style={{ margin: "20px 0px", padding: "0px" }} />


                    <div className="my-comp d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h9 style={{ color: 'white' }}>Automatically increment version code</h9>
                        <h6 style={{ color: 'white' }}>Choose a format to increment your builds.</h6>
                      </div>
                      <Switch
                        checked={isIncrementVersionCode}
                        onChange={() => setIsIncrementVersionCode(!isIncrementVersionCode)}
                      />

                    </div>
                    <hr style={{ margin: "20px 0px", padding: "0px" }} />



                    <div className="my-comp d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h9 style={{ color: 'white' }}>Run unit tests</h9>
                        <h6 style={{ color: 'white' }}>If any test fails, the build will also fail.</h6>
                      </div>
                      <Switch
                        checked={isRunUnitTests}
                        onChange={() => setIsRunUnitTests(!isRunUnitTests)}
                      />
                    </div>


                    <hr style={{ margin: "20px 0px", padding: "0px" }} />



                    <div className="my-comp d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h9 style={{ color: 'white' }}>Sign builds</h9>
                        <h6 style={{ color: 'white' }}>Builds must be signed to run on devices..</h6>
                      </div>
                      <Switch
                        checked={IsSgined}
                        onChange={() => setIsSgined(!IsSgined)}
                      />
                    </div>
                    {IsSgined && (
                      <div>

                        <label style={{ color: 'white' }} >Keystore  : </label>

                        <input
                          type="file"
                          accept=".json"
                          onChange={e => setSigningKeyFile(e.target.files[0])}
                          title="Upload JSON File"
                          style={{

                            border: 'none',
                            color: 'white',
                            padding: '10px 20px',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ color: 'white', fontWeight: 'bold' }}>Alias:</label>
                          <input type="text" style={{ padding: '4px', borderRadius: '4px', border: '1px solid gray' }} value={alias} onChange={e => setAlias(e.target.value)} />

                          <label style={{ color: 'white', fontWeight: 'bold' }}>Key Password:</label>
                          <input type="text" style={{ padding: '4px', borderRadius: '4px', border: '1px solid gray' }} value={keyPassword} onChange={e => setKeyPassword(e.target.value)} />

                          <label style={{ color: 'white', fontWeight: 'bold' }}>Keystore Password:</label>
                          <input type="text" style={{ padding: '4px', borderRadius: '4px', border: '1px solid gray' }} value={keystorePassword} onChange={e => setKeystorePassword(e.target.value)} />
                        </div>



                        <button style={{
                          background: 'linear-gradient(45deg, #FF8E53, #FE6B8B)',
                          color: 'white',
                          borderRadius: '5px',
                          padding: '10px 20px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0px 3px 10px rgba(0,0,0,0.2)',
                        }} onClick={addOrUpdateSecrets}>Signin Information</button>





                      </div>

                    )}

                    <hr style={{ margin: "20px 0px", padding: "0px" }} />



                    <div className="my-comp d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h9 style={{ color: 'white' }}>Distribute builds</h9>
                        <h6 style={{ color: 'white' }}>Release your app to groups or to a store.</h6>
                      </div>
                      <Switch
                        checked={IsDistributed}
                        onChange={() => { if (IsSgined) { setIsDistributed(!IsDistributed) } }}

                      />
                    </div>

                    {IsDistributed && IsSgined && (
                      <div>

                        <label style={{ color: 'white' }} >Upload the Google Dev Console API credentials  : </label>

                        <input
                          type="file"
                          accept=".json"
                          onChange={e => setcredentialsFile(e.target.files[0])}
                          title="Upload JSON File"
                          style={{

                            border: 'none',
                            color: 'white',
                            padding: '10px 20px',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}
                        />




                        <button style={{
                          background: 'linear-gradient(45deg, #FF8E53, #FE6B8B)',
                          color: 'white',
                          borderRadius: '5px',
                          padding: '10px 20px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0px 3px 10px rgba(0,0,0,0.2)',
                        }} onClick={addOrUpdateCredentials}>Add Your credentials</button>





                      </div>

                    )}

                    {!IsSgined && (




                      <div>
                        <div style={{ color: 'yellow' }}>Only signed builds can be distributed and run on devices.</div>
                      </div>
                    )}






                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Save
                    </Button>
                    <Button variant="primary" onClick={() => handleBuildClick()}>
                      Save Build
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>

   <GitHubAuth onTokenChange={handleTokenChange} />
      {accessToken && <RepositorySelect accessToken={accessToken} />}

              <div className="my-comp container-fluid">
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>

  );



}

export default RepositorySelect;
