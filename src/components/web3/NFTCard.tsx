import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { MoreHorizontal, ExternalLink } from 'react-feather';
import avatar from "gradient-avatar";
import { Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Divider, MenuItem, Popper } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import React from 'react';
import { t } from "@lingui/macro";
import { motion } from 'framer-motion';
import DropDownMenu from '../navigation/DropDownMenu';

interface NFTCardProps {
    id: string;
    type: string;
    name: string;
    authors: string[];
    img: string;
}

export default function NFTCard({ id, type, name, authors, img }: NFTCardProps) {
    const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(null);
    const [anchorElCreator, setAnchorElCreator] = React.useState<null | HTMLElement>(null);
    const [creator, setCreator] = React.useState<null | string>(null);
    const openMenu = Boolean(anchorElMenu);
    const openCreator = Boolean(anchorElCreator);
    const creatorId = openCreator ? 'simple-popover' : undefined;

    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElMenu(event.currentTarget);
    };
    const handleClickCreator = (event: React.MouseEvent<HTMLElement>, author: string) => {
        setAnchorElCreator(event.currentTarget);
        setCreator(author);
    };
    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };
    const handleCloseCreator = () => {
        setAnchorElCreator(null);
    };

    return (
        <motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
            <Card variant="outlined"
                sx={{
                    paddingBottom: '0.5rem',
                    width: '300px',
                    backgroundColor: (theme: Theme) => theme.palette.background.paper,
                }}>
                <CardHeader
                    sx={{
                        marginRight: '0.4rem',
                        marginTop: 0
                    }}
                    avatar={
                        <AvatarGroup max={3} >
                            {authors.map(author => {
                                return <Avatar
                                    key={author}
                                    sx={{ width: '20px', height: '20px' }}
                                    alt={author} src={`data:image/svg+xml;utf8,${encodeURIComponent(avatar(author))}`}
                                    onClick={(e) => handleClickCreator(e, author)} />
                            })}
                        </AvatarGroup>
                    }
                    action={
                        <IconButton sx={{ borderRadius: 1, paddingY: '0.1rem' }} onClick={handleClickMenu}><MoreHorizontal /></IconButton>
                    }
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingX: '1rem', marginTop: '0.5rem' }}>
                    <CardMedia
                        sx={{ borderRadius: 1.5, borderColor: 'rgba(255, 255, 255, 0.2)', borderStyle: 'solid', borderWidth: '0.05rem', height: '260px' }}
                        component="img"
                        image={process.env.PUBLIC_URL + img}
                    />
                </Box>
                <CardContent>
                    <Typography variant="overline">{type}</Typography>
                    <Typography>{name}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button sx={{ marginLeft: '0.5rem', paddingX: '2rem' }} variant="contained">Redeem</Button>
                    <Box sx={{ marginRight: '1rem', color: (theme: Theme) => theme.palette.neutral.main }}>#{id}</Box>
                </CardActions>
            </Card>
            <DropDownMenu
                id="ntf-details-menu"
                MenuListProps={{
                    'aria-labelledby': 'nft-details-button',
                }}
                anchorEl={anchorElMenu}
                open={openMenu}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleCloseMenu} disableRipple>
                    View details
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleCloseMenu} disableRipple>
                    Share
                </MenuItem>
                <MenuItem onClick={handleCloseMenu} disableRipple>
                    Send
                </MenuItem>
                <MenuItem onClick={handleCloseMenu} disableRipple>
                    Auction
                </MenuItem>
            </DropDownMenu>
            <Popper id={creatorId} open={openCreator} anchorEl={anchorElCreator} placement="top-start">
                <ClickAwayListener onClickAway={handleCloseCreator}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 13,
                            fontWeight: 100,
                            padding: '8px 14px',
                            borderRadius: 2,
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            bgcolor: 'background.paper'
                        }}
                    >
                        {t`Creator:`} {creator} <IconButton sx={{ marginLeft: '0.5rem', paddingTop: 0, paddingBottom: '0.1rem', paddingX: 0, borderRadius: 1, color: (theme: Theme) => theme.palette.secondary.light }}><ExternalLink height={'19px'} /></IconButton>
                    </Box>
                </ClickAwayListener>
            </Popper>

        </motion.div>
    );
};