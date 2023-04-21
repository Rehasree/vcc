import * as React from 'react';
import { useState } from 'react';
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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DuoIcon from '@mui/icons-material/Duo';
import { VideoRoom } from '../Videocall/VideoRoom';
import './Card.css'
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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [joined, setJoined] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
     sx={{ maxWidth: 345 }} 
     style={{backgroundColor: "#2d2d2d",
        color: "white"}}
     >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
       
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="data:image/jpeg;base64,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"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"  onClick={() => setJoined(true)}>
          <VideoCallIcon />
        </IconButton>
       
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
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
        {joined && (
        <>
          <button onClick={() => setJoined(false)}>
            To Lobby
          </button>
          <VideoRoom />
        </>
      )}
        </CardContent>
      </Collapse>
    </Card>
  );
}