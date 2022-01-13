import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import LogIn from '../partials/login';
import { useState } from 'react';
import SignUp from '../partials/signup';
import styles from './index.module.css';
import { BaseApp } from '../partials/app/baseApp';
import { BasePage } from '../components/BasePage';

export default function Index() {
  const [user] = useAuthState(auth);
  const [loginForm, setLoginForm] = useState(true);

  const loggedIn = !!user;

  const onClickToggleForm = () => {
    setLoginForm(!loginForm);
  };

  return (
    <BasePage>
      {loggedIn ? (
        <BaseApp>Dashboard</BaseApp>
      ) : (
        <>
          {loginForm ? (
            <LogIn onClickToggleForm={onClickToggleForm} />
          ) : (
            <SignUp onClickToggleForm={onClickToggleForm} />
          )}

          <div className={styles.fufyDescription}>
            Fufy is your assistant to select the most fair teams to play a
            footbal game. This is a <b>Beta</b> version, so please send us all
            your suggestions to keep improving the platform.
          </div>
        </>
      )}
    </BasePage>
  );
}
