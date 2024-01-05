import { Box } from '@mui/material';

const ServiceImage = ({ image, size = '60px' }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={
          'https://i.pinimg.com/564x/5b/99/df/5b99df8ffce845440d0c63d0eb77b460.jpg'
        }
      />
    </Box>
  );
};

export default ServiceImage;
