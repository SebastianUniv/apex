import * as React from 'react';
import { MenuItem as IMenuItem } from '../../config';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import DropDownMenu from './DropDownMenu';

interface SettingsMenuProps {
    actions: any;
    settings: IMenuItem[];
    anchorElSettings: null | HTMLElement;
    setAnchorElSettings: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export default function SettingsMenu({ actions, settings, anchorElSettings, setAnchorElSettings }: SettingsMenuProps) {
    // UI
    const theme = useTheme();

    const handleCloseSettingsMenu = (setting?: IMenuItem) => {
        setAnchorElSettings(null);
        // Only execute action when user selected a menu item
        if (setting && setting.name === 'theme') {
            actions((dark: boolean) => !dark);
        }
    };

    return (
        <DropDownMenu
            sx={{ mt: '35px' }}
            id="menu-appbar"
            anchorEl={anchorElSettings}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElSettings)}
            onClose={() => handleCloseSettingsMenu()}
        >
            {settings.map((setting: IMenuItem) => (
                <MenuItem sx={{}} key={setting.text} onClick={() => handleCloseSettingsMenu(setting)}>
                    <ListItemText>{setting.text}</ListItemText>
                    <ListItemIcon sx={{ justifyContent: 'end' }}>
                        <setting.icon width={'50%'} color={theme.palette.text.secondary} />
                    </ListItemIcon>
                </MenuItem>
            ))}
        </DropDownMenu>
    );
}