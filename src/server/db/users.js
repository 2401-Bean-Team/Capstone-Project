const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name='first last', email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword]);

        return user;
    } catch (err) {
        throw err;
    }
}

const createAdminUser = async({ name='first last', password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [adminUsers ] } = await db.query(`
        INSERT INTO adminUsers(name, password)
        VALUES($1, $2)
        RETURNING *`, [name, hashedPassword]);

        return adminUsers;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserList = async () => {
    try{
      const { rows } = await db.query(`
        SELECT * FROM users;
      `)
        return rows;
    } catch (err) {
        throw err;
      }
    }



const getAdminUser = async({name, password}) => {
    if(!name || !password) {
        return;
    }
    try {
        const adminUser = await getAdminUserByName(name);
        if(!adminUser) return;
        const hashedPassword = adminUser.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete adminUser.password;
        return adminUser;
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT *
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserById = async(userId) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT *
        FROM users
        WHERE password = $1;`, [ userId ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const getAdminUserById = async(adminUserId) => {
    try {
        const { rows: [ adminUser ] } = await db.query(`
        SELECT *
        FROM adminUsers
        WHERE password = $1;`, [ adminUserId ]);

        if(!adminUser) {
            return;
        }
        return adminUser;
    } catch (err) {
        throw err;
    }
}

const getAdminUserByName = async(name) => {
    try {
        const { rows: [ adminUser ] } = await db.query(`
        SELECT *
        FROM adminUsers
        WHERE name=$1;`, [ name ]);

        if(!adminUser) {
            return;
        }
        return adminUser;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getUserById,
    createAdminUser,
    getAdminUserById,
    getAdminUserByName,
    getAdminUser,
    getUserList
};
