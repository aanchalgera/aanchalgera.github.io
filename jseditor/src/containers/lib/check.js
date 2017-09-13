/*@flow*/
import { Component } from 'react';

import { roleBasedPermissions } from './constants';

type PropTypes = {
  children: Object,
  userRoles: []
};

const isViewPermitted = (userRoles: [], component: string): boolean => {
  let isPermitted = userRoles.some(role => {
    let permissions = roleBasedPermissions[role];
    if (undefined !== permissions) {
      return true === permissions[component];
    }
  });
  return isPermitted;
};

export const Check = (props: PropTypes) => {
  let component = props.children.type.name;
  if (isViewPermitted(props.userRoles, component)) {
    return props.children;
  }
  return null;
};
