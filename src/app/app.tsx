// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Card, Paper, TextField } from '@mui/material';
import styles from './app.module.scss';
import { useEffect, useState } from 'react';

export function App() {

  const [login, setLogin] = useState({ username: { value: '', error: null }, password: { value: '', error: null }, result: null, user: null });

  const onChange = (evt: any) => {
    setLogin((current: any) => {
      current[evt.target.name].value = evt.target.value
      return { ...current };
    })
  }

  const onSubmit = async () => {
    setLogin((current: any) => {
      let error = false;
      current.username.error = null;
      if (!current.username.value || current.username.value.indexOf('@') < 0) {
        current.username.error = 'Not a valid email address';
        error = true;
      }
      current.password.error = null;
      if (current.password.value?.length < 3) {
        current.password.error = 'Password must be at least 3 characters';
        error = true
      }
      if (!error) {
        current.result = { ...current };
      }
      return { ...current };
    })
  }

  useEffect(() => {
    if (!login.result || !!login.user) {
      return;
    }

    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(users => {
        setLogin(current=>({...current,user:users.results[0]}))
      })
      .catch(console.error)
  }, [login])


  return (
    <Card variant="outlined" className={styles.loginBox}>
      <TextField
        data-testid="login__field-username"
        error={!!login.username.error}
        helperText={login.username.error}
        name='username'
        label="Username"
        placeholder="someone@email.com"
        className={styles.formRow}
        onChange={onChange}
      />
      <TextField
        data-testid="login__field-password"
        error={!!login.password.error}
        helperText={login.password.error}
        name='password'
        label="Password"
        type="password"
        autoComplete="current-password"
        className={styles.formRow}
        onChange={onChange}
      />
      <Button data-testid="login__button-submit"
        variant="outlined"
        onClick={onSubmit}
        className={styles.formRow}>Login</Button>

      {login.user && <Paper data-testid="login__result-display" className={styles.formRow} elevation={0}>{JSON.stringify(login.user, null, '\t')}</Paper>}
    </Card>
  );
}

export default App;
