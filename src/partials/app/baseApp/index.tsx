import { Box, Button, Collapsible } from 'grommet';
import * as Icons from 'grommet-icons';
import { Logo } from '../../../components/Logo';
import { signOut } from '@firebase/auth';
import styles from './baseApp.module.css';
import { auth } from '../../../config/firebase';
import { useState } from 'react';
import Link from 'next/link';

export const BaseApp = ({ children }) => {
  const [mainMenuVisible, setMainMenuVisible] = useState(false);

  const onClickSignOut = () => signOut(auth);
  const toggleMainMenu = () => setMainMenuVisible(!mainMenuVisible);
  return (
    <div className={styles.wrapper}>
      <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="brand"
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation="medium"
        style={{ zIndex: '1' }}
      >
        <Logo size="small" />

        <Box direction="row">
          <Button icon={<Icons.Menu />} onClick={toggleMainMenu} />
        </Box>
      </Box>

      <Box
        direction="row"
        flex
        overflow={{ horizontal: 'hidden' }}
        fill="vertical"
      >
        <Box flex align="center" justify="start">
          {children}
        </Box>
        <Collapsible direction="horizontal" open={mainMenuVisible}>
          <Box
            width="xxsmall"
            className={styles.sideMenu}
            background="light-2"
            elevation="small"
            align="center"
            justify="start"
            alignSelf="stretch"
          >
            <Link href="/app/settings">
              <Button icon={<Icons.Dashboard />} tip="Dashboard" />
            </Link>
            <Button icon={<Icons.Gamepad />} tip="Games" />
            <Button icon={<Icons.List />} tip="Players" />
            <Link href="/app/settings">
              <Button icon={<Icons.UserSettings />} tip="Settings" />
            </Link>
            <hr className={styles.divisor} />
            <Button
              icon={<Icons.Logout />}
              onClick={onClickSignOut}
              tip="Logout"
            />
          </Box>
        </Collapsible>
      </Box>
    </div>
  );
};
