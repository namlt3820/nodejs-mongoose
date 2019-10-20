/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// Connect MongoDB database
const connectDatabase = async () => {
    const uri = 'mongodb://namlt:123456@127.0.0.1:27018/fullstackNodejs2018';
    const options = {
        connectTimeoutMS: 10000,
        useNewUrlParser: true,
        useCreateIndex: true,
    };
    try {
        await mongoose.connect(uri, options);
        console.log('Connect mongodb successfully');
    } catch (error) {
        console.log(`Cannot connect to mongo: ${error}`);
    }
};

connectDatabase();

// Set Database schemas
const UserSchema = new Schema({
    name: {
        type: String,
        default: 'unknown',
    },
    age: {
        type: Number,
        min: 18,
        index: true,
    },
    email: {
        type: String,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    blogPosts: [
        {
            type: ObjectId,
            ref: 'BlogPost',
        },
    ],
});

const BlogPostSchema = new Schema({
    title: {
        type: String,
        default: 'Default title',
    },
    content: {
        type: String,
        default: 'Default content',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: ObjectId,
        ref: 'User',
    },
    comments: [
        {
            type: ObjectId,
            ref: 'Comment',
        },
    ],
});

const CommentSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    author: {
        type: ObjectId,
        ref: 'User',
    },
    commentOn: {
        type: ObjectId,
        required: true,
        refPath: 'onModel',
    },
    onModel: {
        type: String,
        required: true,
        enum: ['BlogPost', 'Product'],
    },
});

const ProductSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    yearOfProduction: {
        type: Number,
        min: 2000,
    },
    comments: [
        {
            type: ObjectId,
            ref: 'Comment',
        },
    ],
});

// Set Database Models
const User = mongoose.model('User', UserSchema, 'User');
const Comment = mongoose.model('Comment', CommentSchema, 'Comment');
const BlogPost = mongoose.model('BlogPost', BlogPostSchema, 'BlogPost');
const Product = mongoose.model('Product', ProductSchema, 'Product');

module.exports = {
    User,
    BlogPost,
    Comment,
    Product,
};
