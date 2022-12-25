import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useContext } from 'react';
import { AccountContext } from './Account';
import styles from './Header.module.scss';


const Header = () => {
    const { logout } = useContext(AccountContext);
  
    return (
      <Box>
        <AppBar position="static" color='inherit'>
          <Toolbar >
            <button className={styles.buttonStyle} onClick={logout}>ログアウト</button>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Header;