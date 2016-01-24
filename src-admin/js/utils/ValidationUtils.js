export function validat(type, value1, value2) {
  switch (type) {
  case 'userId':
    return validatUserId(value1);

  case 'email':
    return validatEmail(value1);

  case 'password':
    return validatPassword(value1);

  case 'passwordConfirmation':
    return validatPasswordConf(value1, value2);

  case 'age':
    return validatAge(value1);

  case 'postalCode':
    return validatPostalCode(value1);

  default:
    return {status: '', message: ''};
  }
}

function validatUserId(userId) {
  if (userId.length === 0) {
    return {
      status: 'error',
      message: 'validation.userId.required'
    };
  } else if (userId.length > 0) {
    return {
      status: '',
      message: ''
    };
  } 
}

function validatEmail(email) {
  if (email.length === 0) {
    return {
      status: 'error',
      message: 'validation.email.required'
    };
  }
  if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email)) {
    return {
      status: '',
      message: ''
    };
  } else {
    return {
      status: 'error',
      message: 'validation.email.notMatch'
    };
  } 
}

function validatPassword(pass) {
  if (pass.length === 0) {
    return {
      status: 'error',
      message: 'validation.password.required'
    };
  }
  if (pass.match(/^[a-z\d]{6,20}$/)) {
    return  {
      status: '',
      message: ''
    };
  } else if (pass.match(/^[a-z\d]{1,5}$/)) {
    return  {
      status: 'error',
      message: 'validation.password.mustOver6'
    };
  } else {
    return {
      status: 'error',
      message: 'validation.password.mustUnder20'
    };
  }
}

function validatPasswordConf(passConf, pass) {
  if (passConf.length === 0) {
    return {
      status: 'error',
      message: 'validation.passwordConfomation.required'
    };
  }
  if (pass === passConf) {
    return {
      status: '',
      message: ''
    };
  } else {
    return {
      status: 'error',
      message: 'validation.passwordConfomation.notMatch'
    };
  }
}

function validatAge(code) {
  if (code.length === 0) {
    return {status: '', message: ''};
  }
  if (/^[\d]{1,3}$/i.test(code)) {
    return {
      status: '',
      message: ''
    };
  } else {
    return {
      status: 'error',
      message: 'validation.passwordConfomation.notMatch'
    };
  }
}

function validatPostalCode(code) {
  if (code.length === 0) {
    return {status: '', message: ''};
  }
  if (/^\d{7}$/i.test(code)) {
    return {
      status: '',
      message: ''
    };
  } else {
    return {
      status: 'error',
      message: 'validation.passwordConfomation.notMatch'
    };
  }
}

