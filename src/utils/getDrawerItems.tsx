import { USER_ROLES } from '@/constants';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

interface DrawerItem {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const getDrawerItems = (role?: string): DrawerItem[] => {
  const commonItems = [{ text: 'Inbox', icon: <InboxIcon />, onClick: () => {} }];

  if (role === USER_ROLES.TEACHER) {
    return [
      ...commonItems,
      { text: 'Starred', icon: <MailIcon />, onClick: () => {} },
      { text: 'Teacher Panel', icon: <MailIcon />, onClick: () => {} },
    ];
  }

  if (role === USER_ROLES.STUDENT) {
    return [...commonItems, { text: 'Student Dashboard', icon: <MailIcon />, onClick: () => {} }];
  }

  return [];
};
