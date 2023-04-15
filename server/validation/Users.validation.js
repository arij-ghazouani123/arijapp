import validator from "validator";
const isEmpty = (value) => 
value === null || value === undefined
|| typeof(value) === "object" && Object.keys(value).length === 0
|| typeof(value) === "string" && value.trim().length === 0
export default  function ValidateUser(data) {
  let errors = {};
  data.Notes = !isEmpty(data.Notes) ? data.Notes : "";
  data.Date = !isEmpty(data.Date) ? data.Date : "";
  data.Testeur = !isEmpty(data.Testeur) ? data.Testeur : "";
  // data.Version = !isEmpty(data.Version) ? data.Version : "";
 
 
  if (validator.isEmpty(data.Notes)) {
    errors.Notes = "Required Notes";
  }
  if (validator.isEmpty(data.Date)) {
    errors.Date = "Required Date";
  }
  if (validator.isEmpty(data.Testeur)) {
    errors.Testeur = "Required Testeur";
  }
  // if (validator.isEmpty(data.Version)) {
  //   errors.Version = "Required Version";
  // } 

  return {
      errors,
      isValid: isEmpty(errors)
  }
};
