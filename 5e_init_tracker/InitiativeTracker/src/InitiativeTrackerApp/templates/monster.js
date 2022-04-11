export class Monster {
  name = "";
  index = "";
  size = "";
  type = "";
  subtype = [];
  alignment = "";
  armor_class = 0;
  hit_points = 0;
  hit_dice_count = 0;
  hit_die = "";
  speed = "";
  stats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };
  saving_throws = [];
  proficiencies = [];
  damage_resistances = [];
  damage_immunities = [];
  damage_vulnerabilities = [];
  condition_immunities = [];
  senses = "";
  languages = "";
  challenge_rating = 0;
  xp = 0;
  special_abilities = [];
  spell_casting = {
    spells: [],
    slots: [],
  };
  actions = [];
  reactions = [];
  legendary_actions = {
    actions: [],
  };
  lair_actions = "";
  bg_color = "";
  user_created = false;
  isPlayer = false;
  damage = 0;
  initiative = 0;
  statuses = [];
  source = "";
}
