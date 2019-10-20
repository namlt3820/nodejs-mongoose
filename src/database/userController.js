const { ObjectId } = require('mongoose').Types;
const { User } = require('./models');

const insertUser = async (name, age, email) => {
    try {
        const newUser = new User({ name, age, email });
        await newUser.save();
        console.log(`User added successfully: ${JSON.stringify(newUser)}`);
    } catch (error) {
        console.log(`User added fail: ${error}`);
    }
};

const deleteAllUser = async () => {
    try {
        await User.deleteMany();
        console.log('Delete all users successfully');
    } catch (error) {
        console.log(`Delete all users fail: ${error}`);
    }
};

const deleteUser = async userId => {
    try {
        await User.deleteOne({ _id: ObjectId(userId) });
        console.log(`Deleted user successfully: ${userId}`);
    } catch (error) {
        console.log(`Cannot delete user with id ${userId}`);
    }
};

const findUserById = async userId => {
    try {
        const foundUser = await User.findById(userId);
        console.log(`foundUser = ${JSON.stringify(foundUser)}`);
    } catch (error) {
        console.log(`Cannot find user by id ${userId}: ${error}`);
    }
};

const findSomeUsers = async () => {
    try {
        const foundUsers = await User.find(
            {
                // example
                age: {
                    $lt: 40,
                },
                name: /a/i,
            },
            ['name', 'email', 'age'],
            {
                sort: {
                    name: -1,
                },
            },
        )
            .skip(0)
            .limit(3);
        foundUsers.forEach(user => {
            console.log(`user ${JSON.stringify(user)}`);
        });
        console.log(`Result length: ${foundUsers.length}`);
    } catch (error) {
        console.log(`Cannot find user: ${error}`);
    }
};

const findOneAndUpdate = async (userId, name, age, email) => {
    try {
        const newUser = {};
        if (name) newUser.name = name;
        if (age) newUser.age = age;
        if (email) newUser.email = email;

        const updatedUser = await User.findOneAndUpdate(
            { _id: ObjectId(userId) },
            newUser,
        );

        if (updatedUser) {
            console.log(`Updated user successfully: ${JSON.stringify(newUser)}`);
        } else {
            console.log(`Cannot find user with id ${userId}`);
        }
    } catch (error) {
        console.log(`Cannot find and update user ${userId}`);
    }
};

const findByIdAndUpdate = async (userId, name, age, email) => {
    try {
        const foundUser = await User.findById(userId);
        if (!foundUser) {
            console.log(`Cannot find user with id ${userId}`);
            return;
        }
        foundUser.name = name !== undefined ? name : foundUser.name;
        foundUser.age = age !== undefined ? age : foundUser.age;
        foundUser.email = email !== undefined ? email : foundUser.email;
        await foundUser.save();
        console.log(`Updated user successfully: ${JSON.stringify(foundUser)}`);
    } catch (error) {
        console.log(`Cannot find and update user ${userId}`);
    }
};

const populateUsers = async () => {
    try {
        const foundUsers = await User.find(
            {
                age: {
                    $gte: 32,
                },
            },
            ['name', 'blogPosts'],
        )
            .populate({
                path: 'blogPosts',
                select: ['title', 'content'],
                // match: {
                //     content: /2 by/i
                // }
                options: {
                    limit: 3,
                },
            })
            .exec();

        foundUsers.forEach(user => {
            console.log(`user = ${JSON.stringify(user)}`);
        });
    } catch (error) {
        console.log(`Populate users failed: ${error}`);
    }
};

module.exports = {
    insertUser,
    deleteAllUser,
    deleteUser,
    findUserById,
    findSomeUsers,
    findOneAndUpdate,
    findByIdAndUpdate,
    populateUsers,
};
