import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { getUserSelector, userLogin } from '../features/Slice/userItems/userSlice';
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { userRegister } from '../features/Slice/registerItems/registerSlice';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer:{
       
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

//state type

type State = {
  username: string
  firstName:string
  lastName:string
  email:string
  password:  string
  repassword: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: '',
  firstName:'',
  lastName:'',
  email:'',
  password: '',
  repassword:'',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setRePassword', payload: string }
  | { type: 'setEmail', payload: string }
  | { type: 'setFirstName', payload: string }
  | { type: 'setLastName', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword': 
      return {
        ...state,
        password: action.payload
      };
      case 'setRePassword': 
      return {
        ...state,
        repassword: action.payload
      };
      case 'setEmail': 
      return {
        ...state,
        email: action.payload
      };
      case 'setFirstName': 
      return {
        ...state,
        firstName: action.payload
      };
      case 'setLastName': 
      return {
        ...state,
        lastName: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'loginSuccess': 
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed': 
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError': 
      return {
        ...state,
        isError: action.payload
      };
  }
}

const Login = () => {
  const classes = useStyles(); const dispatch2 = useAppDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const user_returned = useSelector(getUserSelector);
  
  const [register_works, setRegister_works] = React.useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    if (state.username.trim() && state.password.trim()&& state.repassword.trim() && state.email.trim() && state.firstName.trim() && state.lastName.trim())  {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }

    if (register_works === true && state.username != '' && state.firstName != ''&& state.lastName != '' && state.email != '' && state.password != '' && state.repassword != '') {
     
      return navigate("/");
    } 
  }, [state.username, state.password,, state.repassword, state.email, state.firstName, state.lastName,register_works]);


  

  const handleLogin2 = async () => {

 
    const current_user = {username:state.username,firstname:state.firstName,lastname:state.lastName,email:state.email,password:state.password};
    await dispatch2<any>(userRegister(current_user)).then(() => {
      setRegister_works(true);
    })

}


  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin2();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setEmail',
        payload: event.target.value
      });
    };

    const handleRePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setRePassword',
        payload: event.target.value
      });
    };

    const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setFirstName',
        payload: event.target.value
      });
    };

    const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setLastName',
        payload: event.target.value
      });
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }
  return (
    <div className={classes.mainContainer}>
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Register App" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="firstName"
              type="email"
              label="FirstName"
              placeholder="FirstName"
              margin="normal"
              onChange={handleFirstNameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="lastName"
              type="email"
              label="LastName"
              placeholder="LastName"
              margin="normal"
              onChange={handleLastNameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />

        <TextField
              error={state.isError}
              fullWidth
              id="repassword"
              type="password"
              label="ConfirmPassword"
              placeholder="ConfirmPassword"
              margin="normal"
              helperText={state.helperText}
              onChange={handleRePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin2}
            disabled={state.isButtonDisabled}>
            Create account
          </Button>
        </CardActions>
      </Card>
    </form>
    </div>
  );
}

export default Login;