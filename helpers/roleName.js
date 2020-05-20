const role = {
  admin: "Admin",
};

exports.roleName = {
  admin: role.admin,
};

function allRoles() {
  return [role.admin];
}

exports.getAllRoles = allRoles;
