/*@flow*/
import { Component } from 'react';

import { viewPermissions } from './constants';

type PropTypes = {
  children: Object,
  userRoles: string
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
    componentViewPermissions['roles'].includes(userRole) &&
    componentViewPermissions['types'].includes(postType)
  ) {
    return true;
  }
  return false;
};

export const Check = (props: PropTypes) => {
  const component = props.children.type.name;
  if (isViewPermitted(props.userRole, component, props.postType)) {
    return props.children;
  }
  return null;
};
