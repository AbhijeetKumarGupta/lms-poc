import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, SxProps, Theme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

const ITEM_HEIGHT = 48;

export default function KebabMenu({
  options,
  sx,
}: {
  options: Array<{
    label: React.ReactNode;
    action: (event: React.MouseEvent<HTMLElement>) => void;
  }>;
  sx?: SxProps<Theme>;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={sx}>
      <IconButton
        aria-label="more"
        id="kebab-button"
        aria-controls={open ? 'kebab-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="kebab-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
          list: {
            'aria-labelledby': 'kebab-button',
          },
        }}
      >
        {options?.map?.((option, index) => (
          <MenuItem key={index} onClick={option?.action}>
            {option?.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
