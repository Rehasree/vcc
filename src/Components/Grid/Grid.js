import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import RecipeReviewCard from '../Card/Card';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function FormRow(accessToken) {
  return (
    <React.Fragment>
      <Grid item xs={12}  style={{display:"flex", justifyContent:"center"}} >
        <RecipeReviewCard accessToken={accessToken}/>
      </Grid>
      <Grid item xs={12}  style={{display:"flex", justifyContent:"center"}}>
        <RecipeReviewCard accessToken={accessToken}/>
      </Grid>
      <Grid item xs={12}  style={{display:"flex", justifyContent:"center"}}>
        <RecipeReviewCard accessToken={accessToken}/>
        {/* <Item>Item-1</Item> */}
      </Grid>
    </React.Fragment>
  );
}

export default function NestedGrid(accessToken) {
  return (
    <Box sx={{ flexGrow: 1 }} style={{margin:"40px"}}>
      <Grid container spacing={1} >
        <Grid container item spacing={3} >
          <FormRow accessToken={accessToken} />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow accessToken={accessToken} />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow  accessToken={accessToken}/>
        </Grid>
      </Grid>
    </Box>
  );
}