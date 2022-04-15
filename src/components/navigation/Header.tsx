import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useConfig } from '../../config';
import { Menu as MenuSVG, MoreHorizontal } from 'react-feather';
// Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import { Theme } from '@mui/material/styles';
import ChainSelector from '../web3/ChainSelector';
import WalletSelector from '../web3/WalletSelector';
import SettingsMenu from './SettingsMenu';
import { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
    setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setDarkMode }: HeaderProps) {
    // Setup page layout
    const config = useConfig();
    const settings = config.layout.settings;
    const location = useLocation()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElSettings, setAnchorElSettings] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElSettings(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    //backgroundColor: (theme: Theme) => theme.palette.background.paper
    return (
        <AppBar position="fixed" color="transparent" sx={{ flexGrow: 1, display: 'flex', padding: 0, backdropFilter: "blur(10px) brightness(1.2)" }}>
            <Container disableGutters maxWidth={false}>
                <Toolbar disableGutters={true} sx={{ paddingX: '1rem' }}>
                    {/* Mobile view */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flex: 1, display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}
                    >
                        LOGO
                    </Typography>
                    {/* Should always be displayed */}
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
                        <Card variant="outlined" sx={{ display: 'flex', height: '50%', marginRight: '0.5rem' }}>
                            <ChainSelector />
                        </Card>
                        <Card variant="outlined" sx={{ display: 'flex', marginRight: '0.5rem' }}>
                            <WalletSelector />
                        </Card>
                        <Tooltip title="Open settings">
                            <Card variant="outlined" sx={{ display: 'flex' }}>
                                <IconButton color="neutral" onClick={handleOpenSettingsMenu} sx={{ paddingY: 0, borderRadius: 0 }}>
                                    <MoreHorizontal />
                                </IconButton>
                            </Card>
                        </Tooltip>
                        <SettingsMenu
                            actions={setDarkMode}
                            settings={settings}
                            anchorElSettings={anchorElSettings}
                            setAnchorElSettings={setAnchorElSettings} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}