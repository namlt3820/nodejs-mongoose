const { Comment, User, BlogPost, Product } = require('./models');

const populateCommentsOnBlogPost = async () => {
    try {
        const user = await User.findById('5da8fd7b0083fe0554b3aef8');
        const blogpost = await BlogPost.findById('5da8fd7b0083fe0554b3aef9');
        const comment = await Comment.create({
            body: 'comment 1',
            author: user,
            commentOn: blogpost,
            onModel: 'BlogPost',
        });
        blogpost.comments.push(comment);
        await comment.save();
        await blogpost.save();
        console.log('Populate comment successfully');
    } catch (error) {
        console.log(`Populate comments failed ${error}`);
    }
};

const populateCommentsOnProduct = async () => {
    try {
        const user = await User.findById('5da8fd7b0083fe0554b3aef8');
        const book = await Product.create({
            name: 'Book 1',
            yearOfProduction: 2010,
        });
        const comment = await Comment.create({
            body: 'comment 2',
            author: user,
            commentOn: book,
            onModel: 'Product',
        });
        book.comments.push(comment);
        await comment.save();
        await book.save();
        console.log('Populate comment successfully');
    } catch (error) {
        console.log(`Populate comments failed ${error}`);
    }
};

module.exports = {
    populateCommentsOnBlogPost,
    populateCommentsOnProduct,
};
