import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { service } from '../../../service';
import { notify } from '../../../helpers/functionHelper';
import { Store } from 'react-notifications-component';

const WidgetWrapper = styled(Box)({
  padding: '1.5rem 1.5rem 0.75rem 1.5rem',
  backgroundColor: '#1A1A1A',
  borderRadius: '0.75rem',
});

export const ServiceDetail = ({ item }) => {
  const dark = '#E0E0E0';
  const medium = '#858585';
  const [isEditing, setIsEditing] = useState(item ? false : true);
  const [editableService, setEditableService] = useState(item ? item : {
    Name: "",
    Description: "",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableService({ ...editableService, [name]: value });
  };

  const handleSave = () => {
    const url = `/Admin/Service/${item ? "Update" : "Add"}`
    service.post(url, editableService).then(rs => {
      notify(Store, rs.IsSuccessfully, rs.Message)
      setIsEditing(false);
    })
  };
  return (
    <WidgetWrapper>
      {
        isEditing ? (
          <>
            <Box p="1rem 0" gap="4rem">
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography
                    variant="h6"
                    color={dark}
                    fontWeight="500"
                    sx={{
                      '&:hover': {
                        color: '#00353F',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    Name
                  </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography color={medium}>
                  <input
                    type="text"
                    name="Name"
                    value={editableService.Name}
                    onChange={handleInputChange}
                  />
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                <Typography
                    variant="h6"
                    color={dark}
                    fontWeight="500"
                    sx={{
                      '&:hover': {
                        color: '#00353F',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    Description
                  </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                <Typography color={medium}>
                  <input
                    type="text"
                    name="Description"
                    value={editableService.Description}
                    onChange={handleInputChange}
                  />
                </Typography>
              </Box>
            </Box>
          </>
      ) : (
        <>
          <Box p="1rem 0" gap="2rem">
            <Box display="flex" alignItems="center" gap="1rem">
              <Typography
                  variant="h6"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    '&:hover': {
                      color: '#00353F',
                      cursor: 'pointer',
                    },
                  }}
                >
                  Name
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem">
              <Typography color={medium}>{editableService.Name}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <Typography
                  variant="h6"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    '&:hover': {
                      color: '#00353F',
                      cursor: 'pointer',
                    },
                  }}
                >
                  Description
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <Typography color={medium}>{editableService.Description}</Typography>
            </Box>
          </Box>
        </>
      )}

      {/* FIRST ROW */}
      <Box mt="1rem">
        {isEditing ? (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ padding: '10px 0' }}
          >
            Save
          </Button>
        ) : (
          <Button
            fullWidth
            variant="outlined"
            onClick={handleEditToggle}
            sx={{ padding: '10px 0' }}
          >
            {
              item ? "Edit" : "Save"
            }
          </Button>
        )}
      </Box>
    </WidgetWrapper>
  );
};
