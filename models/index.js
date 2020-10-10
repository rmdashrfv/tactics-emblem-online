const {
  Sequelize,
  DataTypes: {
    STRING,
    INTEGER,
    DATEONLY,
    ENUM,
    JSONB,
    ARRAY,
    BOOLEAN,
    DECIMAL
  }
} = require('sequelize')
const sequelize = new Sequelize('postgres://mlaw:cjiaang11@localhost/tacticsemblemonline')

const User = sequelize.define('Users', {
  username: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  },
  birthday: {
    type: DATEONLY
  },
  bio: {
    type: STRING
  },
  rank: {
    type: INTEGER,
    defaultValue: 1
  },
  globalScore: {
    type: INTEGER,
    defaultValue: 0
  },
  gold: {
    type: INTEGER,
    defaultValue: 3000
  },
  zodiac: {
    type: ENUM,
    values: ['Capricorn', 'Cancer', 'Libra', 'Saggitarius']
  },
  exp: {
    type: INTEGER,
    defaultValue: 0
  },
  metadata: { // data about data "meta"
    type: JSONB,
    defaultValue: {}
  }
})

const Unit = sequelize.define('Units', {
  name: {
    type: STRING,
    allowNull: false
  },
  gender: {
    type: ENUM,
    values: ['Male', 'Female', 'None']
  },
  zodiac: {
    type: ENUM,
    values: ['Capricorn', 'Cancer', 'Libra', 'Saggitarius']
  },
  maxHp: {
    type: INTEGER,
    defaultValue: 100
  },
  maxMp: {
    type: INTEGER,
    defaultValue: 10
  },
  physicalAtk: {
    type: INTEGER,
    defaultValue: 10
  },
  magicAtk: {
    type: INTEGER,
    defaultValue: 8
  },
  equipment: {
    type: JSONB,
    defaultValue: {
      right: null, left: null, helmet: null, body: null, shoes: null, accessory: null
    }
  },
  level: {
    type: INTEGER,
    defaultValue: 1
  },
  moveRange: {
    type: INTEGER,
    defaultValue: 3
  },
  evasion: {
    type: DECIMAL,
    defaultValue: 0.0
  },
  bravery: {
    type: INTEGER,
    default: 85
  },
  faith: {
    type: INTEGER,
    default: 75
  },
  exp: {
    type: INTEGER,
    default: 0
  },
  jp: {
    type: JSONB,
    default: {Squire: 0}
  }
})

const Discipline = sequelize.define('Disciplines', {
  name: {
    type: STRING,
    allowNull: false
  },
  abilities: {
    type: JSONB
  }
})

const Ability = sequelize.define('Abilities', {
  name: {
    type: STRING,
    allowNull: false
  },
  damage: {
    type: INTEGER,
    defaultValue: 0
  },
  range: {
    type: INTEGER,
    defaultValue: 1
  },
  jpCost: { // how much to learn this skill
    type: INTEGER,
    defaultValue: 0
  },
  mpCost: {
    type: INTEGER,
    defaultValue: 0
  },
  ctCost: {
    type: INTEGER,
    defaultValue: 0
  },
  healing: {
    type: BOOLEAN,
    default: false
  },
  unitIds: {
    type: ARRAY(INTEGER),
    defaultValue: []
  }
})

const Job = sequelize.define('Jobs', {
  name: {
    type: STRING,
    allowNull: false
  },
  discipline: {
    type: STRING,
    allowNull: false
  },
  baseStats: {
    type: JSONB,
    defaultValue: {
      maxHp: 0,
      atk: 0,
      speed: 0,
      moveRange: 0
    }
  }
})

const Equipment = sequelize.define('Equipment', {
  name: {
    type: STRING,
    allowNull: false
  },
  metadata: {
    type: JSONB,
    defaultValue: {
      type: 'Armor'
    }
  },
  atk: {
    type: INTEGER
  },
  hp: {
    type: INTEGER
  },
  speed: {
    type: INTEGER
  },
  moveRange: {
    type: INTEGER
  },
  jobIds: { // Jobs that can equip this item
    type: ARRAY(INTEGER),
    defaultValue: []
  },
  status: { // determines things like auto-haste, auto-revive, auto-reflect, etc)
    type: JSONB,
    defaultValue: null
  }
})

const Region = sequelize.define('Regions', {
  name: {
    type: STRING,
    allowNull: false
  }
})

const Battle = sequelize.define('Battles', {
  battleId: {
    type: STRING,
    allowNull: false
  },
  participantIds: {
    type: ARRAY(INTEGER),
    defaultValue: []
  },
  timeLength: { // in milliseconds
    type: INTEGER,
    allowNull: false
  },
  ledger: { // list of actions that took place in a battle and the timestamp at when they happened. Ex: unitName-action-timestamp
    type: ARRAY(STRING),
    defaultValue: []
  },
  metadata: { // who won, who killed who, turns taken
    type: JSONB,
    defaultValue: {}
  }
}, {
  instanceMethods: {
    findParticipant: async function(username) {
      return await User.findOne({where: {username: username}})
    }
  },
  indexes: [{unique: true, fields: ['battleId']}]
})

module.exports = {
  User: User,
  Unit: Unit,
  Equipment: Equipment,
  Discipline: Discipline,
  Ability: Ability,
  Job: Job,
  Region: Region,
  Battle: Battle
}