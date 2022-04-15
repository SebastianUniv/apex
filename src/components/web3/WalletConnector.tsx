import React, { FC, SVGProps } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';


const Connector = styled(Button)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.background.default,
    border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
    marginTop: '0.5rem',
    padding: 15,
    borderRadius: 6,
    cursor: 'pointer'
}));

interface ConnectorProps {
    name: string;
    SVG: FC<SVGProps<SVGSVGElement>>;
    handleWalletConnection: any;
}

export const WalletConnector: FC<ConnectorProps> = ({ name, SVG, handleWalletConnection }) => {
    return (
        <>
            <Connector onClick={() => handleWalletConnection(name)}>
                <Grid container sx={{ alignItems: 'center' }}>
                    <Grid item sx={{ marginRight: '1rem', paddingTop: '0.15rem' }}>
                        <SVG width={'20px'} height={'20px'} />
                    </Grid>
                    <Grid item>
                        {name}
                    </Grid>
                </Grid>
            </Connector>
        </>
    );
}