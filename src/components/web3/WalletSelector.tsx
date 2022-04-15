import React, { useEffect } from 'react';
import { useConfig } from '../../config';
import { t } from "@lingui/macro";
import { ArrowLeft, X } from 'react-feather';
// Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { WalletConnector } from './WalletConnector';
import useDynamicWeb3Hook, { Web3User } from '../../abstraction/hooks/DynamicWeb3Hook';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    paddingX: 2,
    paddingTop: 2,
    paddingBottom: 4
};

const WalletContainer = styled('div')(({ theme }) => ({
    width: '100%',
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
    marginTop: '0.5rem',
    padding: 30,
    borderRadius: 20,
    cursor: 'pointer'
}));

export default function WalletSelector() {
    const config = useConfig();
    // UI
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // Web3
    const { authenticate, isAuthenticated, getUserInfo, getConnector } = useDynamicWeb3Hook();

    let [user, setUser] = React.useState<Web3User | null>(null);
    let [walletAddress, setWalletAddress] = React.useState<null | string>(null);

    useEffect(() => {
        if (isAuthenticated()) {
            setUser(getUserInfo());

            if (user) {
                setWalletAddress(user.accounts[0])
            }
        }
    }, [isAuthenticated, getUserInfo, user]);

    const handleWalletConnection = (name: any) => {
        authenticate({ provider: name.toLowerCase(), chainId: 1 });
        handleClose();
    }

    return (
        <>
            <Button onClick={handleOpen} color="neutral" sx={{ paddingX: '0.8rem', fontFamily: isAuthenticated() ? 'Space Mono' : 'Rubik' }}>{isAuthenticated() ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-5)}` : t`Connect Wallet`}</Button>
            {/* Show wallet connection options when user is not logged on */}
            {!isAuthenticated() &&
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={boxStyle}>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <IconButton sx={{ p: 0 }}>
                                    <ArrowLeft />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton sx={{ p: 0 }} onClick={handleClose}>
                                    <X />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ marginTop: '2rem' }}>
                            {config.web3.connectors.map((connector) => (
                                <Grid item xs={12} key={connector.name}>
                                    <WalletConnector name={connector.name} SVG={connector.svg} handleWalletConnection={handleWalletConnection} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Modal>
            }
            {/* Show user wallet when user has logged on */}
            {isAuthenticated() &&
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={boxStyle}>
                        <Grid container justifyContent="space-between">
                            <Typography sx={{ marginLeft: '0.5rem' }} variant="body1">
                                Account
                            </Typography>
                            <Grid item>
                                <IconButton sx={{ p: 0 }} onClick={handleClose}>
                                    <X />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <WalletContainer sx={{ marginTop: '2rem' }}>
                            <Typography variant="body2" sx={{ opacity: '30%' }}>
                                {t`Connected with ${getConnector()}`}
                            </Typography>
                            <Typography variant="h6" sx={{ fontFamily: 'Space Mono' }}>
                                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-5)}
                            </Typography>
                        </WalletContainer>
                    </Box>
                </Modal>
            }

        </>
    );
}