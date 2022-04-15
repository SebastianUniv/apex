import React, { useEffect } from 'react';
import { useConfig, Chain, Config } from '../../config';
import { lerpColor } from '../../helpers/functions';
import { styled, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ChevronDown } from 'react-feather';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import useDynamicWeb3Hook from '../../abstraction/hooks/DynamicWeb3Hook';
import DropDownMenu from '../navigation/DropDownMenu';

const ChainActiveIndicator = styled('div')(() => ({
    height: '7px',
    width: '7px',
    borderRadius: '50%',
    backgroundColor: '#1ecc18'
}));

export default function ChainSelector() {
    const config: Config = useConfig();
    const [selectedChain, setSelectedChain] = React.useState<Chain | undefined>(undefined);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    // Web3
    const { switchChain, getChain } = useDynamicWeb3Hook();

    useEffect(() => {
        // When loading the page find the current network of user and set this in application
        setSelectedChain(config.web3.chains.find(chain => chain.chainId === getChain()) || config.web3.chains[0])
    });


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleChainSelection = (chain: Chain) => {
        switchChain(chain.chainId);
        setSelectedChain(chain)
        setAnchorEl(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {selectedChain &&
                <Button
                    color="neutral"
                    sx={{ paddingLeft: '1rem', paddingRight: '0.5rem', height: '40px' }}
                    id="chain-selector"
                    aria-controls={open ? 'chain-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    disableElevation
                    onClick={handleClick}
                    startIcon={selectedChain ? <selectedChain.svg width={'20px'} /> : undefined}
                    endIcon={<ChevronDown width={'70%'} />}
                >
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>{selectedChain.name}</Box>
                </Button>
            }
            <DropDownMenu
                id="chain-menu"
                MenuListProps={{
                    'aria-labelledby': 'chain-selector',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Typography sx={{ marginY: '0.5rem', marginLeft: '0.5rem' }} variant="body1" color="text.secondary">
                    Select a network
                </Typography>
                {config.web3.chains.slice(1).map((chain) => (
                    <MenuItem
                        sx={{
                            // Bring active chain to front by interpolating the background with white
                            backgroundColor: (theme: Theme) => {
                                // TODO: set the values of colorToInterpolate in theme file
                                let colorToInterpolate = theme.palette.mode.includes('dark') ? '#000000' : '#000000';
                                return (selectedChain?.chainId === chain.chainId) ? lerpColor(theme.palette.background.paper, colorToInterpolate, 0.1) : undefined
                            },
                            border: (theme: Theme) => {
                                return (selectedChain?.chainId === chain.chainId) ? '1px solid rgba(255, 255, 255, 0.05)' : undefined
                            },
                            margin: '0.5rem',
                            borderRadius: 1,
                            paddingY: (selectedChain?.chainId === chain.chainId) ? '1rem' : '0.5rem'
                        }}
                        onClick={() => handleChainSelection(chain)}
                        disableRipple
                        key={chain.chainId}>
                        <ListItemIcon>
                            <chain.svg width={'25px'} />
                        </ListItemIcon>
                        <ListItemText>{chain.name}</ListItemText>
                        <ListItemIcon sx={{ justifyContent: 'end' }}>
                            {(selectedChain?.chainId === chain.chainId) &&
                                <ChainActiveIndicator />
                            }
                        </ListItemIcon>
                    </MenuItem>
                ))}
            </DropDownMenu>
        </>
    );
}