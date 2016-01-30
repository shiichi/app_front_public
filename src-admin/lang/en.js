//used by reducer and validationUtils

export const alert = {
  access: {
    users: {
      permissionCheck: 'Checking a permission will also check its dependencies, if any.',
      notFound: 'That user does not exist.',
      deactivateSuccess: 'The user was successfully deactivated.',
      activateSuccess: 'The user was successfully activated.',
      destroySuccess: 'The user was successfully deleted.',
      restoreSuccess: 'The user was successfully restored.',
      deleteSuccess: 'The user was successfully permanently deleted.',
      updatedSuccess: 'The user was successfully updated.',
      storeSuccess: 'The user was successfully created.',
      changePasswordSuccess: 'The user\'s password was successfully updated.',
      cantDeactivateSelf: 'You can not do that to yourself.',
      cantDeleteSelf: 'You can not delete yourself.',
      createError: 'There was a problem creating this user. Please try again.',
      deleteError: 'There was a problem deleting this user. Please try again.',
      emailError: 'That email address belongs to a different user.',
      markError: 'There was a problem updating this user. Please try again.',
      restoreError: 'There was a problem restoring this user. Please try again.',
      roleNeededCreate: 'You must choose at least one role. User has been created but deactivated.',
      roleNeeded: 'You must choose at least one role.',
      updateError: 'There was a problem updating this user. Please try again.',
      updatePasswordError: 'There was a problem changing this users password. Please try again.',
    },
    roles: {
      notFound: 'That role does not exist.',
      alreadyExists: 'That role already exists. Please choose a different name.',
      needsPermission: 'You must select at least one permission for this role.',
      createError: 'There was a problem creating this role. Please try again.',
      updateError: 'There was a problem updating this role. Please try again.',
      cantDeleteAdmin: 'You can not delete the Administrator role.',
      hasUsers: 'You can not delete a role with associated users.',
      deleteError: 'There was a problem deleting this role. Please try again.',
      associatedPermissionsPxplanation: 'A permission marked with a (D) means that the permission has dependencies. They will be checked automatically when you select that permission. You can manage each permissions dependencies in the dependency tab of the edit permission screen.'
    },
    permissions: {
      notFound: 'That permission does not exist.',
      associatedPermissionsPxplanation: ''
    }
  }
};

export const server = {
  '200': '200',
  '201': '201',
  '204': '204',
  '400': '400',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '409': 'Conflict',
  '415': 'Unsupported Media Type',
  '406': 'Not Acceptable',
  '422': 'Unprocessable Entity',
  '500': 'Internal Server Error',
};

export const validation = {
  someError: 'Please check the input.',
  userId: {
    alreadyExists: 'This userId has already been taken.',
    required: 'The userId field is required.'
  },
  email: {
    notValid: 'The email must be a valid email address.',
    alreadyExists: 'This email has already been taken.',
    required: 'The email field is required.'
  },
  password: {
    notValid: 'The password must be a valid password.',
    required: 'The password field is required.',
    mustOver6: 'The password must be at least 6 characters.',
    mustUnder20: 'The password must be at most 20 characters.',
  },
  passwordConfomation: {
    notMuch: 'Password and Password Confomation do not match.',
    required: 'The password confirmation field is required.'
  },
  age: {
    notValid: 'The age must be a valid age.',
    required: 'The password confirmation field is required.'
  },
  postalCode: {
    notValid: 'The Postal Code must be a valid Postal Code.',
    required: 'The password confirmation field is required.'
  },
};
