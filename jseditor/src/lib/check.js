/*@flow*/
import { viewPermissions, postTypePermissions } from './constants';

let postType, userRole;

type PropTypes = {
  children: Object,
  childName: string
};

export const init = (type: string, role: string) => {
  postType = type;
  userRole = role;
};

const isViewPermitted = (component: string): boolean => {
  const componentViewPermissions = viewPermissions[component];

  if (componentViewPermissions['types'].includes(postType)) {
    if ('ROLE_ADMINISTRATOR' === userRole && component !== 'PublicationLabel') {
      return true;
    }

    if (componentViewPermissions['roles'].includes(userRole)) {
      return true;
    }
  }
  return false;
};

export const Check = (props: PropTypes) => {
  if (isViewPermitted(props.childName)) {
    return props.children;
  }
  return null;
};

export const isValidUser = () => {
  if ('ROLE_ADMINISTRATOR' === userRole) {
    return true;
  }

  if (postTypePermissions[postType]['roles'].includes(userRole)) {
    return true;
  }

  return false;
};
