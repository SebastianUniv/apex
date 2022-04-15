import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
    {
        date: '2/13',
        price: 2400,
        tokenAmount: 1.2
    },
    {
        date: '2/13',
        price: 1398,
        tokenAmount: 3.2
    },
    {
        date: '2/13',
        price: 9800,
        tokenAmount: 7
    },
    {
        date: '2/13',
        price: 3908,
        tokenAmount: 1
    },
    {
        date: '2/13',
        price: 4800,
        tokenAmount: 3
    },
    {
        date: '2/13',
        price: 3800,
        tokenAmount: 6
    },
    {
        date: '2/13',
        price: 4300,
        tokenAmount: 2.2
    },
];

function StyledToolTip({ payload, label, active }: any) {
    if (active) {
        let title = payload[0].name;
        title = title.charAt(0).toUpperCase() + title.slice(1);
        return (
            <Paper sx={{ paddingX: 2, paddingY: 1, opacity: 0.85 }}>
                {title}
                <Divider />
                <Grid container sx={{ display: 'flex', flexGrow: 0, fontFamily: 'Rubik-Light' }}>
                    <Grid item xs={6} >
                        <Box>Date</Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box>{payload[0].payload.date}</Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box>USD</Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box>${payload[0].payload.price}</Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box>ETH</Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box>Ξ{payload[0].payload.tokenAmount}</Box>
                    </Grid>
                </Grid>

            </Paper>
        );
    }

    return null;
}

export default function PriceLineChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 5,
                }}
            >
                <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis tick={{ fontSize: 11, opacity: 0.7 }} strokeWidth={'0.02rem'} dataKey="date" />
                <YAxis tick={{ fontSize: 11, opacity: 0.7 }} strokeWidth={'0.02rem'} />
                <Area dataKey="price" type="monotone" stroke="#8884d8" fillOpacity={0.5} fill="url(#colorPrice)" />
                <Tooltip content={<StyledToolTip />} />
            </AreaChart>
        </ResponsiveContainer>
    );
}