import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cardwidth:{
        width: 'inherit',
    },
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
        <Card className={classes.cardwidth}>
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
            </CardContent>
        </Card>
    );
}

export default CharacterCard;