import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment'
import CallIcon from '@mui/icons-material/Call';
import { ContactNumber } from './constants';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Dialog } from '@mui/material';
import MuiImageSlider from 'mui-image-slider';
import { service } from '../../../service';

const getAge = born => {
  return moment().diff(moment(born), 'years');
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CollaboratorCard({ collaborator }) {
  const { BookingInformation } = collaborator;
  const fullName = `${collaborator.FirstName} ${collaborator.LastName}`
  const [expanded, setExpanded] = React.useState(false);
  const [openImageSlideShow, setOpenImageSlideShow] = React.useState(false);
  const [userImages, setUserImages] = React.useState([])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleShowCollaboratorImages = id => {
    service.getImages(`Home/GetUserImages/${id}`).then(response => {
      const fileImages = response.map((item, idex) => new File([item.file], `${item.name}.jpeg`))
      const images = fileImages.map(item => URL.createObjectURL(item))
      setUserImages(prev => [...prev, ...images])
      setOpenImageSlideShow(true)
    })
  }

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={`${collaborator.FirstName} ${collaborator.LastName}`}
        subheader={`${collaborator.Address} - ${getAge(collaborator.BirthDate)} tuổi`}
      />
      <CardMedia
        component="img"
        height="194"
        image={collaborator.Avatar ? URL.createObjectURL(collaborator.Avatar) : null}
        alt={fullName}
        onClick={() => handleShowCollaboratorImages(collaborator.Id)}
      />
      <CardContent onClick={handleExpandClick}>
        <Typography variant="body2" color="text.secondary">
          Biệt danh: {
            BookingInformation.DisplayName ?? "Chưa có"
          }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Services: {
            BookingInformation.CollaboratorServices.map(service => service.Service.Name).join(', ')
          }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sở thích: {
            collaborator.Hobbies
          }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <CallIcon />
        </IconButton>
        <IconButton aria-label="share">
          <Typography>{ContactNumber}</Typography>
        </IconButton>
        <IconButton aria-label="share" onClick={() => handleShowCollaboratorImages(collaborator.Id)}>
          <PhotoLibraryIcon ></PhotoLibraryIcon>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph> * Số đo: {`V1 - V2 - V3: ${collaborator.V1} - ${collaborator.V2} - ${collaborator.V3}`}</Typography>
          {/* <Typography paragraph>{`V1 - V2 - V3: ${collaborator.V1} - ${collaborator.V2} - ${collaborator.V3}`}</Typography> */}
          <Typography paragraph> * Dịch vụ:</Typography>
            {
              BookingInformation.CollaboratorServices && BookingInformation.CollaboratorServices.map(service => <Typography key={service.Id} paragraph>{service.Service.Name}: {service.Prices} VND</Typography>)
            }
          <Typography paragraph> * Địa chỉ: {collaborator.Address}</Typography>
          {/* <Typography paragraph>{collaborator.Address}</Typography> */}
          <Typography paragraph> * Mô tả: {collaborator.Description}</Typography>
          {/* <Typography paragraph>{collaborator.Description}</Typography> */}
          <Typography paragraph> * Sở thích: </Typography>
          {/* <Typography paragraph>{collaborator.Hobbies}</Typography> */}
          <Typography paragraph> * Trường: {collaborator.School}</Typography>
          {/* <Typography paragraph>{collaborator.School}</Typography> */}
        </CardContent>
      </Collapse>

      <Dialog open={openImageSlideShow} onClose={() => setOpenImageSlideShow(false)}>
        {
          userImages.length ? <MuiImageSlider images={userImages} fitToImageHeight={true}/> : <Typography>No images</Typography>
        }
      </Dialog>
    </Card>
  );
}
