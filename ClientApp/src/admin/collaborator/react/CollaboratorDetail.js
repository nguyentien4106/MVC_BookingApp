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
import { Box, Typography, Divider } from '@mui/material';
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
  const [user, setUser] = useState(null);
  const dark = '#E0E0E0';
  const medium = '#858585';
  const main = '#C2C2C2';
  /* 
  if (!user) {
    return null;
  } */

  const {
    firstName,
    lastName,
    address,
    birthDate,
    description,
    phoneNumber,
    v1,
    v2,
    v3,
    hobbies,
    school,
  } = {
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
  };
  console.log('Tests');

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
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
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{'5'} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0" gap="2rem">
        <Box display="flex" alignItems="center" gap="1rem">
          <DateRangeOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{birthDate}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{address}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PhoneAndroidOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{phoneNumber}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <SchoolOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{school}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Description</Typography>
          <Typography color={main} fontWeight="500">
            {description}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Hobbies</Typography>
          <Typography color={main} fontWeight="500">
            {hobbies}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />
    </WidgetWrapper>
  );
};
