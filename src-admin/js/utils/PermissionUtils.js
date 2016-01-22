export function hasPermission(roles, permissions, permission) {
  if (roles) {
    console.log('roles', roles)
    if (roles.indexOf('Administrator') >= 0) {
      return true;
    }
  };

  if (permissions) {
    console.log('permissions', permissions)
    if (permissions.indexOf(permission) >= 0) {
      return true;
    }
  }
  return false;
}