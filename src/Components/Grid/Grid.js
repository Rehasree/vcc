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

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={12} lg={4} md={6} style={{display:"flex", justifyContent:"center"}} >
        <RecipeReviewCard/>
      </Grid>
      <Grid item xs={12} lg={4} md={6} style={{display:"flex", justifyContent:"center"}}>
        <RecipeReviewCard/>
      </Grid>
      <Grid item xs={12} lg={4} md={6} style={{display:"flex", justifyContent:"center"}}>
        <RecipeReviewCard/>
        {/* <Item>Item-1</Item> */}
      </Grid>
    </React.Fragment>
  );
}

export default function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1 }} style={{margin:"40px"}}>
      <Grid container spacing={1} >
        <Grid container item spacing={3} >
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </Box>
  );
}