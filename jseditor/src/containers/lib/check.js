/*@flow*/
import { Component } from 'react';

import { viewPermissions } from './constants';

type PropTypes = {
  children: Object,
  userRoles: string,
  childName: string
};

const isViewPermitted = (
  userRole: string,
  component: string,
  postType: string
): boolean => {
  if ('ROLE_ADMINISTRATOR' === userRole) {
    return true;
  }
  const componentViewPermissions = viewPermissions[component];

  if (
    componentViewPermissions['types'].includes(postType) &&
    componentViewPermissions['roles'].includes(userRole)
  ) {
    return true;
  }
  return false;
};

export const Check = (props: PropTypes) => {
  if (isViewPermitted(props.userRole, props.childName, props.postType)) {
    return props.children;
  }
  return null;
};
