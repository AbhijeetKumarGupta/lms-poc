import AddIcon from '@mui/icons-material/Add';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AppsIcon from '@mui/icons-material/Apps';

import { USER_ROLES } from '@/constants';
import { DrawerItem } from '@/libs/types/drawer';

export const getDrawerItems = (role?: string): DrawerItem[] => {
  const commonItems = [
    { text: 'All Courses', icon: <AppsIcon />, url: '/dashboard' },
    { text: 'My Courses', icon: <AppRegistrationIcon />, url: '/my-courses' },
  ];

  if (role === USER_ROLES.TEACHER) {
    return [...commonItems, { text: 'Add Courses', icon: <AddIcon />, url: '/manage-course' }];
  }

  if (role === USER_ROLES.STUDENT) {
    return [...commonItems];
  }

  return [];
};
