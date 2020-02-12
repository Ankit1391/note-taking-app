import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import ShopIcon from '@material-ui/icons/ShoppingBasket';
import WeekendIcon from '@material-ui/icons/Weekend';
import BillIcon from '@material-ui/icons/Album';
import TravelIcon from '@material-ui/icons/Traffic';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  }
}));

export default function Note(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar onClick={props.onSelect} className='clickable'>
          <Avatar>
            {((c) => {
              switch (c.toLowerCase()) {
                case 'shopping list': return <ShopIcon />;
                case 'bills': return <BillIcon />;
                case 'weekend work': return <WeekendIcon />;
                case 'travel plan': return <TravelIcon />;
                default: return <WorkIcon />;
              }
            })(props.category || '')}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.title} onClick={props.onSelect} className='clickable' />
        <Button variant="contained" onClick={props.editNote}>Edit</Button>
        <Button variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon />} onClick={props.deleteNote}>Delete</Button>
      </ListItem>
    </List>
  );
}
