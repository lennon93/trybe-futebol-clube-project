const validPassword = 'secret_admin';
const validEmail = 'admin@admin.com';
const invalidPassword = 'invalido';
const invalidEmail = 'invalido';

const noEmailLoginBody = { email: '', password: validPassword };

const noPasswordLoginBody = { email: validEmail, password: '' };

const notExistingEmailBody = { email: invalidEmail, password: validPassword};

const notExistingPassword = { email: validEmail, password: invalidPassword};

const validLoginBody = { email: validEmail, password: validPassword };

const userMock = {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  };

export default {
  noPasswordLoginBody,
  noEmailLoginBody,
  notExistingEmailBody,
  notExistingPassword,
  validLoginBody,
  userMock,
};