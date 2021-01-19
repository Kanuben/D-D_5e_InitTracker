import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {red} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles (theme => ({
  cardwidth: {
    width: 'inherit',
  },
  root: {
    flexGrow: 1,
  },
  char: {
    display: 'flex',
    'align-items': 'center',
  },
  charname: {
    padding: '1em',
    'font-size': '2em',
  },
  col: {
    padding: theme.spacing (2),
    color: theme.palette.text.secondary,
    'align-items': 'center',
    display: 'inline-flex',
    'justify-items': 'center',
    'white-space': 'nowrap',
  },
  char_portrait: {
    width: theme.spacing (12),
    height: theme.spacing (12),
    'border-style': 'solid',
    'border-color': 'darkgrey',
    'border-width': '.25em',
  },
  paper_padding: {
    padding: '2em',
  },
}));

function CharacterCard () {
  const classes = useStyles ();

  return (
    <Card className={classes.cardwidth}>
      <CardContent>
        <div className={classes.align_center}>
          <Grid container spacing={5}>
            <Grid className={classes.col} item xs>
              <Avatar
                className={classes.char_portrait}
                src="https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/2/52e7c608-d224-472b-8736-273874211f24.jpg?1562912268"
              />
              <div className={classes.charname}>
                <Typography variant="h6" gutterBottom>
                  CHARACTER NAME
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  CHARACTER CLASS LEVEL
                </Typography>
              </div>

            </Grid>
            
            <Grid className={classes.col} item xs>
              <div>
                <Typography variant="h6" gutterBottom>
                  STATUS EFFECTS
                </Typography>
              </div>
            </Grid>
            
            <Grid className={classes.col} item xs>
              <div>
                <Typography variant="h6" gutterBottom>
                  AC
                </Typography>
              </div>
            </Grid>
            
            <Grid className={classes.col} item xs>
              <div>
                <Typography variant="h6" gutterBottom>
                  DAMAGE
                </Typography>
              </div>
            </Grid>

            <Grid className={classes.col} item xs>
              <div>
                <Typography variant="h6" gutterBottom>
                  INITIATIVE
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}

export default CharacterCard;
