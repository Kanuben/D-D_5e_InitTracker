import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    char: {
        display: 'flex',
        'align-items': 'center',
    },
    charname:{
        padding: '1em'
    },
    col: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


function CharacterCard() {
    const classes = useStyles();

    return (
        <Card className="CharacterCard">
            <CardContent>
                <div className={classes.root}>

                    <Grid container spacing={4}>
                        <Grid item xs>
                            <div>  <Avatar >H</Avatar></div>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.col}>Human</div>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.col}>Humanator</div>
                        </Grid>
                        <Grid item xs>
                            <div className={classes.col}>14</div>
                        </Grid>
                    </Grid>
                </div>
                {/* <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Character Name</TableCell>
                                <TableCell align="right">Race</TableCell>
                                <TableCell align="right">Initiative</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key='Humanator'>
                                <TableCell component="th" scope="row">
                                    <div className={classes.char}>
                                        <Avatar >H</Avatar>
                                        <span className={classes.charname}>Humanator</span>
                                    </div>
                                </TableCell>
                                <TableCell align="right">Human</TableCell>
                                <TableCell align="right">14</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer> */}
            </CardContent>
        </Card>
    );
}

export default CharacterCard;