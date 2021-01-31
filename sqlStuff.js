const Discord = require('discord.js');
const Sequelize = require('sequelize');
const currency = new Discord.Collection();
const { Users, CurrencyShop } = require('./dbObjects');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
})

Reflect.defineProperty(currency, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount, name) {
        const user = currency.get(id);
        if (user) {
            user.balance += Number(amount);
            user.user_name = name;
            return user.save();
        }
        const newUser = await Users.create({ user_id: id, user_name: name, balance: amount });
        currency.set(id, newUser);
        return newUser;
    },
})
Reflect.defineProperty(currency, 'getBalance', {
    /* eslint-disable-next-line func-name-matching */
    value: function getBalance(id) {
        const user = currency.get(id);
        return user ? user.balance : 0;
    },
})

const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

const Disabled = sequelize.define('disabled', {
    guild_id: {
        type: Sequelize.STRING,
    },
    guild_name: {
        type: Sequelize.STRING,
    },
    command: {
        type: Sequelize.STRING,
    },
});

const Perms = sequelize.define('permisions', {
    guild_id: {
        type: Sequelize.STRING,
    },
    user_id: {
        type: Sequelize.STRING,
    },
    power: {
        type: Sequelize.STRING,
    },
});

const Moderation = sequelize.define('moderate', {
    guild_id: {
        type: Sequelize.STRING,
    },
    user_id: {
        type: Sequelize.STRING,
    },
    mod_id: {
        type: Sequelize.STRING,
    },
    points: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.STRING,
    },
    reason: {
        type: Sequelize.STRING,
    },
    time: {
        type: Sequelize.STRING,
    },
    embed: {
        type: Sequelize.STRING,
    },
    resolved: {
        type: Sequelize.BOOLEAN,
    },
});

const Storage = sequelize.define('storage', {
    guild_id: {
        type: Sequelize.STRING,
    },
    value1key: {
        type: Sequelize.STRING,
    },
    value1: {
        type: Sequelize.STRING,
    },
    value2key: {
        type: Sequelize.STRING,
    },
    value2: {
        type: Sequelize.STRING,
    },
    value3key: {
        type: Sequelize.STRING,
    },
    value3: {
        type: Sequelize.STRING,
    },
    value4key: {
        type: Sequelize.STRING,
    },
    value4: {
        type: Sequelize.STRING,
    },
    value5key: {
        type: Sequelize.STRING,
    },
    value5: {
        type: Sequelize.STRING,
    },
    value6key: {
        type: Sequelize.STRING,
    },
    value6: {
        type: Sequelize.STRING,
    },
    value7key: {
        type: Sequelize.STRING,
    },
    value7: {
        type: Sequelize.STRING,
    },
    value8key: {
        type: Sequelize.STRING,
    },
    value8: {
        type: Sequelize.STRING,
    },
    value9key: {
        type: Sequelize.STRING,
    },
    value9: {
        type: Sequelize.STRING,
    },
    value10key: {
        type: Sequelize.STRING,
    },
    value10: {
        type: Sequelize.STRING,
    },
});

const MafiaGame = sequelize.define('mafiaGame', {
    guild_id: {
        type: Sequelize.STRING,
    },
    user_id: {
        type: Sequelize.STRING,
    },
    user_name: {
        type: Sequelize.STRING,
    },
    game_admin: {
        type: Sequelize.STRING,
    },
    role: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
    },
    game_channel: {
        type: Sequelize.STRING,
    },
    game_status: {
        type: Sequelize.STRING,
    },
});

const Desc = sequelize.define('desc', {
    term: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.STRING,
    },
    value: {
        type: Sequelize.STRING,
    },
    uses: {
        type: Sequelize.INTEGER,
    },
});

function SyncAllSQL(){
    Tags.sync();
	Disabled.sync();
	MafiaGame.sync();
	Moderation.sync();
    Perms.sync();
    Storage.sync();
    Desc.sync();
}
module.exports = {
    async SyncAllSQL(){
        Tags.sync();
        Disabled.sync();
        MafiaGame.sync();
        Moderation.sync();
        Perms.sync();
        Storage.sync();
        Desc.sync();
    }, 
    AceStorage: Storage,
    currency: currency, 
    Users: Users, 
    sequelize: sequelize, 
    Tags: Tags, 
    Disabled: Disabled, 
    Perms: Perms, 
    Moderation: Moderation, 
    MafiaGame: MafiaGame, 
    Desc: Desc
}