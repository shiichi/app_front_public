//used by reducer and validationUtils

export const alert = {
  access: {
    users: {
      permissionCheck: 'Checking a permission will also check its dependencies, if any.',
      notFound: 'That user does not exist.',
      deactivateSuccess: 'The user was successfully deactivated.',
      activateSuccess: 'The user was successfully activated.',
      deleteSuccess: 'The user was successfully deleted.',
      restoreSuccess: 'The user was successfully restored.',
      permanentlyDeleteSuccess: 'The user was successfully permanently deleted.',
      updatedSuccess: 'The user was successfully updated.',
      storeSuccess: 'The user was successfully created.',
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
      associatedPermissionsPxplanation: 'A permission marked with a (D) means that the permission has dependencies. They will be checked automatically when you select that permission. You can manage each permissions dependencies in the dependency tab of the edit permission screen.'
    },
    permissions: {
      associatedPermissionsPxplanation: ''
    }
  }
};

export const server = {
  faildToAccess: 'Oops! Faild to accsss server.'
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
    notValid: 'Password must be between 6 and 20.',
    required: 'The password field is required.',
    mustOver6: 'The password field must over 6.',
    mustUnder20: 'The password field must under 20',
  },
  passwordConfomation: {
    notValid: 'Password and Password Confomation do not match.',
    required: 'The password confirmation field is required.'
  },
};

