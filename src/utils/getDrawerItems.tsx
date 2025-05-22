import { USER_ROLES } from '@/constants';
import AppsIcon from '@mui/icons-material/Apps';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { DrawerItem } from '@/types/drawer';

export const getDrawerItems = (role?: string): DrawerItem[] => {
  const commonItems = [
    { text: 'All Course', icon: <AppsIcon />, url: '/' },
    { text: 'My Course', icon: <AppRegistrationIcon />, url: '/my-courses' },
  ];

  if (role === USER_ROLES.TEACHER) {
    return [...commonItems];
  }

  if (role === USER_ROLES.STUDENT) {
    return [...commonItems];
  }

  return [];
};
