const users = {
  valid: {
    email: "3e912213-319f-4315-a638-ed58a1124574@mailslurp.com",
    password: "Test@123",
    testTitle: "Verify that a user can login with a valid email and password",
  },
  invalidPassword: {
    email: "3e912213-319f-4315-a638-ed58a1124574@mailslurp.com",
    password: "Test1234",
    errorMsg: "Wrong email or password.",
    testTitle:
      "Verify that a user cannot login with an incorrect password and valid email",
  },
  invalidCredentials: {
    email: "test@gmail.com",
    password: "Test1234",
    errorMsg: "Wrong email or password.",
    testTitle:
      "Verify that a user cannot login with incorrect email and password",
  },
};
const usersInfo = [
  {
    firstName: "Test",
    lastName: "Test",
    email: users["valid"].email,
    address: "Test Street",
    suite: "23T",
    city: "Toronto",
    country: "Canada",
    province: "Alberta",
    countryCode: "CA",
    provinceCode: "AB",
    postalCode: "00000",
    valid: true,
    testTitle:
      "Verify that a user can fill out the billing section correctly and move to the payment section",
  },
  {
    firstName: "Test",
    lastName: "Test",
    email: null,
    address: "Test Street",
    suite: "23T",
    city: "Toronto",
    country: "Canada",
    countryCode: "CA",
    provinceCode: "AB",
    province: "Alberta",
    postalCode: "00000",
    testTitle:
      "Verify that a user is shown an error message if they didn't provide all the required information for the billing section",
  },
];
const contactFormData = [
  {
    firstName: "Test",
    lastName: "Test",
    email: users["valid"].email,
    valid: true,
    testTitle: "Verify that a user can send a message",
    subject: "Hi",
    message: "Testing contact form",
  },
  {
    firstName: "Test",
    lastName: "Test",
    email: null,
    testTitle:
      "Verify that a user cannot send a message without filling out the required fields",
    subject: "Hi",
    message: "Testing contact form",
  },
  {
    firstName: "Test",
    lastName: "Test",
    email: "invalid email",
    testTitle:
      "Verify that a user cannot send a message with an invalid email address",
    subject: "Hi",
    message: "Testing contact form",
  },
];
module.exports = { users, usersInfo, contactFormData };
