import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CloseIcon from "@material-ui/icons/Close";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect } from "react";
import { ajax } from "rxjs/ajax";
import { loadConditions } from "../../../services/ConditionService";
import { loadSpells } from "../../../services/SpellService";
import MonsterTemplate from "../../templates/monsterTemplate.json";
import AddSpell from "../AddSpell";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Popover from "@material-ui/core/Popover";
import SkillSelect from "../Modals/SkillSelect";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  root: {
    flexGrow: 1,
  },
  padding16: {
    padding: "16px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  placeholder: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-direction": "column",
  },
  dialogSize: {
    minHeight: "65%",
    minWidth: "40%",
    maxWidth: "40%",
    maxHeight: "65%",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CreateChar(props) {
  const classes = useStyles();
  const open = props.openCreateMonster;
  const onClose = props.onClose;

  const [damageTypes, setDamageTypes] = React.useState([]);
  const [conditions, setConditions] = React.useState([]);
  const [spells, setSpells] = React.useState([]);
  const [isSpellCaster, setIsSpellCaster] = React.useState(false);
  const [isLegendary, setIsLegendary] = React.useState(false);
  const [hasLair, setHasLair] = React.useState(false);
  const [anchorSkills, setAnchorSkills] = React.useState(null);

  useEffect(() => {
    ajax
      .getJSON("https://www.dnd5eapi.co/api/damage-types")
      .subscribe((types) => {
        setDamageTypes(types.results);
      });
    loadConditions().subscribe((conditions) => {
      setConditions(conditions.results);
    });
    loadSpells().subscribe((spells) => {
      setSpells(spells.results);
    });
  }, []);

  let monster = { ...MonsterTemplate };
  const handleSkillsClick = (event) => {
    setAnchorSkills(event.currentTarget);
  };

  const handleSkillsClose = () => {
    setAnchorSkills(null);
  };

  const openSkills = Boolean(anchorSkills);
  const idSkills = openSkills ? "simple-popover" : undefined;

  let monsterTypes = [];
  let monsterSubtypes = [];
  let monsterSizes = [];
  let monsterAlignments = [];
  let monsterCRs = [];
  let monsterHitDiceValues = ["d4", "d6", "d8", "d10", "d12", "d20"];
  let monsterStatTypes = ["CHA", "CON", "DEX", "INT", "STR", "WIS"];

  props.monsterList.forEach((element) => {
    if (!monsterTypes.includes(element.type)) monsterTypes.push(element.type);
    if (!monsterSubtypes.includes(element.subtype) && element.subtype !== null)
      monsterSubtypes.push(element.subtype);
    if (!monsterSizes.includes(element.size) && element.size !== null)
      monsterSizes.push(element.size);
    if (
      !monsterAlignments.includes(element.alignment) &&
      element.alignment !== null
    )
      monsterAlignments.push(element.alignment);
    if (
      !monsterCRs.includes(element.challenge_rating.toString()) &&
      element.challenge_rating !== null
    )
      monsterCRs.push(element.challenge_rating.toString());
  });

  const handleCreateMonsterClicked = (e) => {
    document.getElementById("submitButton").click();
  };

  const handleSpellCheckbox = (e) => {
    setIsSpellCaster(e.target.checked);
  };

  const handleLegendaryCheckbox = (e) => {
    setIsLegendary(e.target.checked);
  };

  const handleLairCheckbox = (e) => {
    setHasLair(e.target.checked);
  };

  const handleSubtypeSelected = (e, value) => {
    monster.subtype = value.toString();
  };

  const handleSavingThrowSelected = (e, value) => {
    monster.saving_throws = value;
  };

  const handleSubmit = (e) => {
    if (e.target) {
      monster.name = e.target.elements.name.value.toString();
      monster.type = e.target.elements.type.value;
      monster.size = e.target.elements.size.value;
      monster.alignment = e.target.elements.alignment.value;
      monster.challenge_rating = e.target.elements.challenge_rating.value;
      if (e.target.elements.reactions_description.value.length !== 0) {
        monster.reactions = parseTextDescription(
          e.target.elements.reactions_description.value
        );
      }
      if (e.target.elements.actions_description.value.length !== 0) {
        monster.actions = parseTextDescription(
          e.target.elements.actions_description.value
        );
      }
      if (e.target.elements.special_traits_description.value.length !== 0) {
        monster.special_abilities = parseTextDescription(
          e.target.elements.special_traits_description.value
        );
      }
      if (e.target.elements.legendary_actions_description && e.target.elements.legendary_actions_description.value.length !== 0) {
        monster.legendary_actions.actions = parseTextDescription(
          e.target.elements.legendary_actions_description.value
        );
      }
      // if (e.target.elements.lair_actions_description.value.length !== 0) {
      //   monster.lair_actions = parseTextDescription(
      //     e.target.elements.lair_actions_description.value
      //   );
      // }
      monster.armor_class = e.target.elements.armor_class.value;
      monster.hit_points = e.target.elements.hit_points.value;
      monster.hit_dice =
        e.target.elements.hit_dice_count.value +
        e.target.elements.hit_dice_value.value;
      monster.stats.strength = e.target.elements.strength.value;
      monster.stats.dexterity = e.target.elements.dexterity.value;
      monster.stats.constitution = e.target.elements.constitution.value;
      monster.stats.intelligence = e.target.elements.intelligence.value;
      monster.stats.wisdom = e.target.elements.wisdom.value;
      monster.stats.charisma = e.target.elements.charisma.value;
      props.handleAppendMonsterList([monster]);
    }
    e.preventDefault();
    handleClose();
  };

  //Reset states on close
  const handleClose = () => {
    monster = { ...MonsterTemplate };
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      classes={{ paper: classes.dialogSize }}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Create Monster
      </DialogTitle>
      <DialogContent>
        <form className={classes.root} onSubmit={handleSubmit}>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Monster Name*"
                  variant="outlined"
                  name="name"
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  freeSolo
                  id="combo-box-demo"
                  options={monsterTypes}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Monster Type*"
                      variant="outlined"
                      name="type"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  freeSolo
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  options={monsterSubtypes}
                  getOptionLabel={(option) => option}
                  onChange={handleSubtypeSelected}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Monster Sub-Type(s)"
                      name="sub_types"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Autocomplete
                  freeSolo
                  id="combo-box-demo"
                  options={monsterSizes}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Size*"
                      variant="outlined"
                      name="size"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  freeSolo
                  id="combo-box-demo"
                  options={monsterAlignments}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Alignment"
                      variant="outlined"
                      name="alignment"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  freeSolo
                  id="combo-box-demo"
                  options={monsterCRs}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Challenge Rating*"
                      variant="outlined"
                      name="challenge_rating"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  className={classes.textField}
                  id="outlined-multiline-static"
                  label="REACTIONS DESCRIPTION"
                  multiline
                  rows={6}
                  variant="outlined"
                  name="reactions_description"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.textField}
                  id="outlined-multiline-static"
                  label="ACTIONS DESCRIPTION"
                  multiline
                  rows={6}
                  variant="outlined"
                  name="actions_description"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  id="outlined-multiline-static"
                  label="SPECIAL TRAITS DESCRIPTION"
                  multiline
                  rows={6}
                  variant="outlined"
                  name="special_traits_description"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  <Checkbox
                    checked={isLegendary}
                    onChange={handleLegendaryCheckbox}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  <Typography>LEGENDARY?</Typography>
                </div>
                {isLegendary === true && (
                  <TextField
                    className={classes.textField}
                    id="outlined-multiline-static"
                    label="LEGENDARY ACTIONS DESCRIPTION"
                    multiline
                    rows={6}
                    variant="outlined"
                    disabled={!isLegendary}
                    name="legendary_actions_description"
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  <Checkbox
                    checked={hasLair}
                    onChange={handleLairCheckbox}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  <Typography>LAIR?</Typography>
                </div>
                {hasLair === true && (
                  <TextField
                    className={classes.textField}
                    id="outlined-multiline-static"
                    label="LAIR AND LAIR ACTIONS DESCRIPTION"
                    multiline
                    rows={6}
                    variant="outlined"
                    disabled={!hasLair}
                    name="lair_actions_description"
                  />
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  <Checkbox
                    checked={isSpellCaster}
                    onChange={handleSpellCheckbox}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  <Typography>SPELLCASTING?</Typography>
                </div>
                {isSpellCaster === true && (
                  <Card>
                    <CardContent>
                      <AddSpell spells={spells}></AddSpell>
                      <Grid className={classes.padding16} container spacing={3}>
                        <Grid item xs>
                          <Typography>Spell Slots</Typography>
                        </Grid>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="LVL 1"
                            variant="outlined"
                            name="lvl1_slots"
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="LVL 2"
                            variant="outlined"
                            name="lvl2_slots"
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="LVL 3"
                            variant="outlined"
                            name="lvl3_slots"
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="LVL 4"
                            variant="outlined"
                            name="lvl4_slots"
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="LVL 5"
                            variant="outlined"
                            name="lvl5_slots"
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="LVL 6"
                            variant="outlined"
                            name="lvl6_slots"
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="LVL 7"
                            variant="outlined"
                            name="lvl7_slots"
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="LVL 8"
                            variant="outlined"
                            name="lvl8_slots"
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="LVL 9"
                            variant="outlined"
                            name="lvl9_slots"
                          />
                        </Grid>
                      </Grid>
                      <Grid className={classes.padding16} container spacing={3}>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="Spell Casting Ability"
                            variant="outlined"
                            name="spell_casting_ability"
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="Spell Save DC"
                            variant="outlined"
                            name="spell_save_dc"
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            className={classes.textField}
                            id="outlined-basic"
                            label="Spell Attack Bonus"
                            variant="outlined"
                            name="spell_attack_bonus"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Armor Class*"
                  variant="outlined"
                  name="armor_class"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Speed*"
                  variant="outlined"
                  name="speed"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Hit Points Die Count*"
                  variant="outlined"
                  name="hit_dice_count"
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  id="combo-box-demo"
                  options={monsterHitDiceValues}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Hit Points Die Value*"
                      variant="outlined"
                      name="hit_dice_value"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Senses"
                  variant="outlined"
                  name="senses"
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  options={monsterStatTypes}
                  getOptionLabel={(option) => option}
                  onChange={handleSavingThrowSelected}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Saving Throws"
                      name="saving_throws"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="STR Score*"
                  variant="outlined"
                  name="strength"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="DEX Score*"
                  variant="outlined"
                  name="dexterity"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="CON Score*"
                  variant="outlined"
                  name="constitution"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="INT Score*"
                  variant="outlined"
                  name="intelligence"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="WIS Score*"
                  variant="outlined"
                  name="wisdom"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="CHA Score*"
                  variant="outlined"
                  name="charisma"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Average Hit Points*"
                  variant="outlined"
                  name="hit_points"
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  options={damageTypes}
                  getOptionLabel={(option) => option.name}
                  //onChange={handleConditionSelected}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Damage Immunities"
                      name="damage_immunities"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  options={damageTypes}
                  getOptionLabel={(option) => option.name}
                  //onChange={handleConditionSelected}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Damage Vulnerabilities"
                      name="damage_vulnerabilities"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  options={damageTypes}
                  getOptionLabel={(option) => option.name}
                  //onChange={handleConditionSelected}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Damage Resistances"
                      name="damage_resistances"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  options={conditions}
                  getOptionLabel={(option) => option.name}
                  //onChange={handleConditionSelected}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Condition Immunities"
                      name="condition_immunities"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Languages"
                  variant="outlined"
                  name="languages"
                />
              </Grid>
              <Grid item xs={4} style={{ height: "150%!", display: "grid" }}>
                <Button
                  aria-describedby={idSkills}
                  variant="outlined"
                  onClick={handleSkillsClick}
                >
                  Select Skills
                </Button>
                <Popover
                  id={idSkills}
                  open={openSkills}
                  anchorEl={anchorSkills}
                  onClose={handleSkillsClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <SkillSelect />
                </Popover>
              </Grid>
            </Grid>
          </div>
          <Button
            id="submitButton"
            style={{ display: "none" }}
            type="submit"
          ></Button>
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleCreateMonsterClicked}
          variant="contained"
          autoFocus
          color="primary"
        >
          Create Monster
        </Button>
      </DialogActions>
    </Dialog>
  );

  function parseTextDescription(text) {
    let sections = text.split(/[\r\n]+/);
    let parsedSections = [];
    sections.forEach((section) => {
      let sectionObject = {
        name: "",
        desc: "",
      };
      sectionObject.name = section.substring(0, section.indexOf("."));
      sectionObject.desc = section.substring(section.indexOf(".") + 1);
      parsedSections.push(sectionObject);
    });
    return parsedSections;
  }
}
