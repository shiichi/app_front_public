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
