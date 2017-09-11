/*@flow*/
import { Component } from 'react';

import { roleBasedPermissions, typeBasedPermissions } from './constants';

type PropTypes = {
  postType: string,
  component: string,
  userRole: string,
  children: {}
};

const isViewPermitted = (
  userRole: string,
  postType: string,
  component: string
): boolean => {
  if (
    roleBasedPermissions[userRole][component] &&
    typeBasedPermissions[postType][component]
  ) {
    return true;
  }
  return false;
};

export const Check = (props: PropTypes) => {
  if (
    '' !== props.postType &&
    isViewPermitted(props.userRole, props.postType, props.component)
  ) {
    return props.children;
  }
  return null;
};
