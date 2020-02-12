import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Guid from 'guid';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  table: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function CreateNote(props) {

  const classes = useStyles();
  const [heading, setHeading] = React.useState('');
  const [guid, setGuid] = React.useState(Guid.create());
  const [category, setCategory] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const categories = JSON.parse(localStorage.getItem("cat"));

  React.useEffect(() => {
    let note = props.note;
    if (!note) {
      setHeading('CREATE YOUR NOTE');
      return
    };
    setHeading('EDIT NOTE');
    setGuid(props.note.guid);
    setCategory(props.note.category);
    setTitle(props.note.title);
    setDescription(props.note.description);
  }, [props.note]);

  const handleChange = event => {
    setCategory(event.target.value);
  };

  const onChangeTitle = event => {
    setTitle(event.target.value);
  }

  const onChangeDescription = event => {
    setDescription(event.target.value);
  }

  const onSubmit = event => {
    event.preventDefault();
    const note = {
      guid,
      date: new Date(),
      category,
      title,
      description
    }
    if (note.category !== '' && note.title !== '' & note.description !== '') {
      var notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes = notes.filter(n => n.guid !== guid);
      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));
      props.toggleCreateNote(false);
    }
    else{
      alert('All Fields are required');
    }
  }

  const onCancel = event => {
    event.preventDefault();
    props.toggleCreateNote(false);
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <h3>{heading}</h3>
        <form className={classes.root} noValidate autoComplete="off">
          <table className={classes.table}>
            <tbody>
            <tr>
                <td>Enter Title</td>
                <td>
                  <TextField id="standard-basic" label="Standard" value={title} onChange={onChangeTitle} />
                </td>
              </tr>
              <tr>
                <td>Select Category</td>
                <td>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      onChange={handleChange}
                    >
                      {categories.map((category, index) => (
                        <MenuItem key={index} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <td>Enter Description</td>
                <td>
                  <TextField
                    id="standard-multiline-static"
                    label="Multiline"
                    multiline
                    rows="4"
                    value={description}
                    onChange={onChangeDescription}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={onSubmit}
          >
            Save
      </Button>
      <Button variant="contained" onClick={onCancel}>
            Cancel
      </Button>
        </form>
      </Container>
    </>
  )
}

export default CreateNote;