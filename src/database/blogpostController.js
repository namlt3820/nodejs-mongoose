const { BlogPost, User } = require('./models');

const createSomeUserAndPosts = async () => {
    try {
        const newUser = new User({
            name: 'dung',
            age: 41,
            email: 'dung@gmail.com',
            blogPosts: [],
        });

        const newBlogPost1 = new BlogPost({
            title: 'title 1 by dung',
            content: 'content 1 by dung',
            date: Date.now(),
            author: newUser._id,
        });

        await newBlogPost1.save();
        await newUser.blogPosts.push(newBlogPost1);
        await newUser.save();

        const newBlogPost2 = new BlogPost({
            title: 'title 2 by dung',
            content: 'content 2 by dung',
            date: Date.now(),
            author: newUser._id,
        });

        await newBlogPost2.save();
        await newUser.blogPosts.push(newBlogPost2);
        await newUser.save();

        const newBlogPost3 = new BlogPost({
            title: 'title 3 by dung',
            content: 'content 3 by dung',
            date: Date.now(),
            author: newUser._id,
        });

        await newBlogPost3.save();
        await newUser.blogPosts.push(newBlogPost3);
        await newUser.save();

        const newBlogPost4 = new BlogPost({
            title: 'title 4 by dung',
            content: 'content 4 by dung',
            date: Date.now(),
            author: newUser._id,
        });

        await newBlogPost4.save();
        await newUser.blogPosts.push(newBlogPost4);
        await newUser.save();

        const newBlogPost5 = new BlogPost({
            title: 'title 5 by dung',
            content: 'content 5 by dung',
            date: Date.now(),
            author: newUser._id,
        });

        await newBlogPost5.save();
        await newUser.blogPosts.push(newBlogPost5);
        await newUser.save();

        console.log(`User and their posts created successfully: ${newUser}`);
    } catch (error) {
        console.log(`Cannot create user and posts: ${error}`);
    }
};

const populateBlogPosts = async () => {
    try {
        const foundBlogPosts = await BlogPost.find({}, ['title', 'content'])
            .populate({
                path: 'author',
                select: ['name', 'age', 'email'],
            })
            .exec();

        foundBlogPosts.forEach(blogpost => {
            console.log(`blogpost = ${JSON.stringify(blogpost)}`);
        });
    } catch (error) {
        console.log(`Populate blogposts failed: ${error}`);
    }
};

module.exports = {
    populateBlogPosts,
    createSomeUserAndPosts,
};
