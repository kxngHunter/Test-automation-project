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
module.exports = { users };
