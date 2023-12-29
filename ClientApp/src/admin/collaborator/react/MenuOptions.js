import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function MenuOptions ({items}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };

  const handleClose = action => {
    setAnchorEl(null);
    setOpen(false)
    if(typeof action === "function"){
      action()
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          items && items.map(item => <MenuItem key={item.name} onClick={() => handleClose(item.action)}>{item.name}</MenuItem>)
        }
      </Menu>
    </div>
  );
}