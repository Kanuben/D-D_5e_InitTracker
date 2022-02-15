import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
import { Monster } from "../../templates/monster";
import AddSpell from "../AddSpell";

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
    minHeight: "600px",
    minWidth: "800px",
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
  const [selectedSpells, setSelectedSpells] = React.useState([]);
  const [isSpellCaster, setIsSpellCaster] = React.useState(false);
  const [isLegendary, setIsLegendary] = React.useState(false);
  const [hasLair, setHasLair] = React.useState(false);
  const [anchorSkills, setAnchorSkills] = React.useState(null);
  const [subtype, setSubtype] = React.useState("");
  const [savingThrows, setSavingThrows] = React.useState([]);
  const [damageImmunities, setDamageImmunities] = React.useState([]);
  const [damageVulnerabilties, setDamageVulnerabilties] = React.useState([]);
  const [damageResistances, setDamageResistances] = React.useState([]);
  const [condidtionImmunities, setCondidtionImmunities] = React.useState([]);

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

  // const handleSkillsClick = (event) => {
  //   setAnchorSkills(event.currentTarget);
  // };

  // const handleSkillsClose = () => {
  //   setAnchorSkills(null);
  // };

  // const openSkills = Boolean(anchorSkills);
  // const idSkills = openSkills ? "simple-popover" : undefined;

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
    setSubtype(value.toString());
  };

  const handleSavingThrowSelected = (e, value) => {
    setSavingThrows(value);
  };

  const handleDamageImmunSelected = (e, value) => {
    let nameArray = value.map(item => item.name);
    setDamageImmunities(nameArray);
  };

  const handleDamageVulnSelected = (e, value) => {
    let nameArray = value.map(item => item.name);
    setDamageVulnerabilties(nameArray);
  };

  const handleDamageResSelected = (e, value) => {
    let nameArray = value.map(item => item.name);
    setDamageResistances(nameArray);
  };

  const handleConditionImmunSelected = (e, value) => {
    let nameArray = value.map(item => item.name);
    setCondidtionImmunities(nameArray);
  };

  const handleSubmit = (e) => {
    let monster = new Monster();

    if (e.target) {
      monster.name = e.target.elements.name.value.toString();
      monster.type = e.target.elements.type.value;
      monster.subtype = subtype;
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
      if (selectedSpells.length > 0) {
        let maxSpellLevel = Math.max(...selectedSpells.map(spell => spell.level));
        let sortedSpells = selectedSpells.sort((a, b) => {
          return a.level - b.level
        })
        monster.spell_casting.spells = sortedSpells
        monster.special_abilities.push({
          "name": "Spell Casting",
          "desc": `The ${monster.name} is a ${getNumberWithOrdinal(maxSpellLevel)}-level spellcaster. Its spellcasting ability is ${e.target.elements.spell_casting_ability.value} (spell save DC ${e.target.elements.spell_save_dc.value}, ${e.target.elements.spell_attack_bonus.value} to hit with spell attacks).`
        })
      }
      monster.armor_class = e.target.elements.armor_class.value;
      monster.speed = e.target.elements.speed.value;
      monster.hit_points = e.target.elements.hit_points.value;
      monster.hit_dice =
        e.target.elements.hit_dice_count.value +
        e.target.elements.hit_dice_value.value;
      monster.senses = e.target.elements.senses.value;
      monster.saving_throws = savingThrows;
      monster.stats.strength = e.target.elements.strength.value;
      monster.stats.dexterity = e.target.elements.dexterity.value;
      monster.stats.constitution = e.target.elements.constitution.value;
      monster.stats.intelligence = e.target.elements.intelligence.value;
      monster.stats.wisdom = e.target.elements.wisdom.value;
      monster.stats.charisma = e.target.elements.charisma.value;
      monster.languages = e.target.elements.languages.value
      monster.proficiencies = parseSkillsDescription(e.target.elements.skills.value);
      monster.damage_immunities = damageImmunities;
      monster.damage_resistances = damageResistances;
      monster.damage_vulnerabilities = damageVulnerabilties;
      monster.condition_immunities = condidtionImmunities;
      props.handleAppendMonsterList([monster]);
    }
    e.preventDefault();
    handleClose();
  };

  //Reset states on close
  const handleClose = () => {
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
                  label="Monster Name"
                  variant="outlined"
                  name="name"
                  required
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
                      label="Monster Type"
                      variant="outlined"
                      name="type"
                      required
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
                      label="Size"
                      variant="outlined"
                      name="size"
                      required
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
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Challenge Rating"
                  variant="outlined"
                  name="challenge_rating"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Armor Class"
                  variant="outlined"
                  name="armor_class"
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Average HP"
                  variant="outlined"
                  name="hit_points"
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Hit Points Die Count"
                  variant="outlined"
                  name="hit_dice_count"
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <Autocomplete
                  id="combo-box-demo"
                  options={monsterHitDiceValues}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Hit Points Die Value"
                      variant="outlined"
                      name="hit_dice_value"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Speed"
                  variant="outlined"
                  name="speed"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="STR Score"
                  variant="outlined"
                  name="strength"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="DEX Score"
                  variant="outlined"
                  name="dexterity"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="CON Score"
                  variant="outlined"
                  name="constitution"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="INT Score"
                  variant="outlined"
                  name="intelligence"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="WIS Score"
                  variant="outlined"
                  name="wisdom"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="CHA Score"
                  variant="outlined"
                  name="charisma"
                  required
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
              <Grid item xs={6}>
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Skills"
                  variant="outlined"
                  name="skills"
                />
              </Grid>
              {/* <Grid item xs={4}>
                <Button
                  aria-describedby={idSkills}
                  variant="outlined"
                  onClick={handleSkillsClick}
                  disabled
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
              </Grid> */}
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
                <TextField
                  className={classes.textField}
                  id="outlined-basic"
                  label="Languages"
                  variant="outlined"
                  name="languages"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  options={damageTypes}
                  getOptionLabel={(option) => option.name}
                  onChange={handleDamageImmunSelected}
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
                      label="Damage Immun."
                      name="damage_immunities"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  options={damageTypes}
                  getOptionLabel={(option) => option.name}
                  onChange={handleDamageVulnSelected}
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
                      label="Damage Vuln."
                      name="damage_vulnerabilities"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  options={damageTypes}
                  getOptionLabel={(option) => option.name}
                  onChange={handleDamageResSelected}
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
                      label="Damage Res."
                      name="damage_resistances"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="combo-box-demo"
                  multiple
                  disableCloseOnSelect
                  options={conditions}
                  getOptionLabel={(option) => option.name}
                  onChange={handleConditionImmunSelected}
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
                      label="Condition Immun."
                      name="condition_immunities"
                    />
                  )}
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
                      <AddSpell setSelectedSpells={setSelectedSpells} spells={spells}></AddSpell>
                      {/* <Grid className={classes.padding16} container spacing={3}>
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
                      </Grid> */}
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
          Create
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

  function parseSkillsDescription(text) {
    let sections = text.split(',')
    let parsedSections = [];
    sections.forEach((section) => {
      section = section.trim();
      let sectionObject = {
        name: "",
        value: ""
      };
      sectionObject.name = section.substring(0, section.indexOf(' '))
      sectionObject.value = section.substring(section.indexOf(' ') + 2);
      parsedSections.push(sectionObject);
    })
    return parsedSections;
  }

  function getNumberWithOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

}
