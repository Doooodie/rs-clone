import './Header.css'

import SearchField from "../SearchField/SearchField"
import { IconButton } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png" alt="" />
        <span>Диск</span>
      </div>
      <div className="header-search">

        <SearchField />

        <div className="setting">
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>

          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
    </header>
  )
}
