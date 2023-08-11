function SecondScreenValidation(values) {
  let error = {};
  if (values.firstName < 2) {
    error.firstName = 'Minimum of 2 character and maximum 50';
  } else {
    error.firstName = '';
  }
  if (values.address < 10) {
    error.address = 'Minimum length 10';
  } else {
    error.address = '';
  }
  return error;
}
export default SecondScreenValidation;
