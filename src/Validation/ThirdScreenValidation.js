function ThirdScreenValidation(values) {
  let error = {};
  if (values.phoneNumber < 10) {
    error.phoneNumber = 'Allow only 10 digit numeric phone number';
  } else {
    error.phoneNumber = '';
  }

  return error;
}
export default ThirdScreenValidation;
