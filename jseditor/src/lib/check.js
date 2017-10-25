/*@flow*/
import { viewPermissions } from './constants';

type PropTypes = {
  children: Object,
  userRole: string,
  childName: string,
  postType: string
};

const isViewPermitted = (
  userRole: string,
  component: string,
  postType: string
): boolean => {
  const componentViewPermissions = viewPermissions[component];

  if (componentViewPermissions['types'].includes(postType)) {
    if ('ROLE_ADMINISTRATOR' === userRole) {
      return true;
    }

    if (componentViewPermissions['roles'].includes(userRole)) {
      return true;
    }
  }
  return false;
};

export const Check = (props: PropTypes) => {
  if (isViewPermitted(props.userRole, props.childName, props.postType)) {
    return props.children;
  }
  return null;
};
