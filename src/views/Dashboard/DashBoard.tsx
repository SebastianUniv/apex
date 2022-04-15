import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function NotFound() {
    return (
        <Grid container spacing={3} justifyContent="center" sx={{ marginTop: '0.5rem', paddingX: { xs: '1rem', sm: '3rem' } }}>
            <Grid item xs={12} sm={4} sx={{ display: 'flex' }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardHeader title="Portfolio balance" />
                    <CardContent>
                        <Typography variant="h6">
                            $50,343.12
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex' }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardHeader title="Portfolio value" />
                    <CardContent>
                        <Typography variant="h6">
                            $50,343.12
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex' }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardHeader title="Portfolio borrowings" />
                    <CardContent>
                        <Typography variant="h6">
                            $50,343.12
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
