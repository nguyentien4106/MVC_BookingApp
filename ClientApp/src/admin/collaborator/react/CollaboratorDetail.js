import React, { useEffect, useState } from 'react';
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  DateRangeOutlined,
  PhoneAndroidOutlined,
  SchoolOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import CollaboratorImage from './CollaboratorImage';

const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const WidgetWrapper = styled(Box)({
  padding: '1.5rem 1.5rem 0.75rem 1.5rem',
  backgroundColor: '#1A1A1A',
  borderRadius: '0.75rem',
});

export const CollaboratorDetail = ({ userId, picturePath }) => {
  const [user, setUser] = useState({
    firstName: 'Nguyen',
    lastName: 'Thang',
    birthDate: '1990-01-15',
    description: 'Description of John',
    phoneNumber: '123-456-7890',
    address: '123 Main St',
    v1: '85',
    v2: '68',
    v3: '88',
    hobbies: 'Reading, Swimming',
    school: 'University of XYZ',
  });
  const dark = '#E0E0E0';
  const medium = '#858585';
  const main = '#C2C2C2';
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(user);

  const {
    FirstName,
    LastName,
    Address,
    BirthDate,
    Description,
    PhoneNumber,
    V1,
    V2,
    V3,
    Hobbies,
    School,
  } = collaborator

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleSave = () => {
    // Implement save logic, e.g., API call to update user data

    setIsEditing(false);
  };
  /* 
  if (!user) {
    return null;
  } */

  return (
    <WidgetWrapper>
      {isEditing ? (
        <>
          <FlexBetween gap="0.5rem" pb="1.1rem">
            <FlexBetween gap="1rem">
              <CollaboratorImage image={picturePath} />
              <Box>
                <Typography variant="h4" color={dark} fontWeight="500">
                  <input
                    type="text"
                    name="firstName"
                    value={editableUser.firstName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={editableUser.lastName}
                    onChange={handleInputChange}
                  />
                </Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>

          <Divider />

          {/* SECOND ROW */}
          <Box p="1rem 0" gap="4rem">
            <Box display="flex" alignItems="center" gap="0.5rem">
              <DateRangeOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>
                <input
                  type="text"
                  name="birthDate"
                  value={editableUser.birthDate}
                  onChange={handleInputChange}
                />
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <LocationOnOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>
                <input
                  type="text"
                  name="address"
                  value={editableUser.address}
                  onChange={handleInputChange}
                />
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <PhoneAndroidOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editableUser.phoneNumber}
                  onChange={handleInputChange}
                />
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <SchoolOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>
                <input
                  type="text"
                  name="school"
                  value={editableUser.school}
                  onChange={handleInputChange}
                />
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* THIRD ROW */}
          <Box p="1rem 0">
            <FlexBetween mb="0.5rem">
              <Typography color={medium}>Description</Typography>
              <Typography color={main} fontWeight="500">
                <textarea
                  name="description"
                  value={editableUser.description}
                  onChange={handleInputChange}
                />
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography color={medium}>Hobbies</Typography>
              <Typography color={main} fontWeight="500">
                <textarea
                  name="hobbies"
                  value={editableUser.hobbies}
                  onChange={handleInputChange}
                />
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />
        </>
      ) : (
        <>
          <FlexBetween gap="0.5rem" pb="1.1rem">
            <FlexBetween gap="1rem">
              <CollaboratorImage image={picturePath} />
              <Box>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    '&:hover': {
                      color: '#00353F',
                      cursor: 'pointer',
                    },
                  }}
                >
                  {editableUser.firstName} {editableUser.lastName}
                </Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>

          <Divider />

          {/* SECOND ROW */}
          <Box p="1rem 0" gap="2rem">
            <Box display="flex" alignItems="center" gap="1rem">
              <DateRangeOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{editableUser.birthDate}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <LocationOnOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{editableUser.address}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <PhoneAndroidOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{editableUser.phoneNumber}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <SchoolOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{editableUser.school}</Typography>
            </Box>
          </Box>

          <Divider />

          {/* THIRD ROW */}
          <Box p="1rem 0">
            <FlexBetween mb="0.5rem">
              <Typography color={medium}>Description</Typography>
              <Typography color={main} fontWeight="500">
                {editableUser.description}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography color={medium}>Hobbies</Typography>
              <Typography color={main} fontWeight="500">
                {editableUser.hobbies}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />
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
            Edit
          </Button>
        )}
      </Box>
    </WidgetWrapper>
  );
};
