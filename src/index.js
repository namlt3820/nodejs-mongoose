/* eslint-disable no-unused-vars */
const {
    insertUser,
    deleteAllUser,
    findUserById,
    findSomeUsers,
    findOneAndUpdate,
    findByIdAndUpdate,
    deleteUser,
    populateUsers,
} = require('./database/userController');

const {
    populateCommentsOnBlogPost,
    populateCommentsOnProduct,
} = require('./database/commentController');

const {
    createSomeUserAndPosts,
    populateBlogPosts,
} = require('./database/blogpostController');

// insertUser('namlt', 27, "namlt@gmail.com")
// insertUser('hoa', 28, "hoa@gmail.com")
// insertUser('an', 29, "an@gmail.com")
// insertUser('binh', 30, "binh@gmail.com")
// insertUser('nghia', 31, "nghia@gmail.com")
// insertUser('van', 32, "van@gmail.com")
// insertUser('trang', 40, "trang@gmail.com")
// insertUser('hoa', 50, "hoa@gmail.com")
// insertUser('phong', 44, "phong@gmail.com")
// insertUser('vinh', 23, "vinh@gmail.com")
// insertUser('phuc', 89, "phuc@gmail.com")
// insertUser('truong', 70, "truong@gmail.com")

// deleteAllUser()

// findUserById("5da85d6c9d51d90279328d01")

// findSomeUsers()

// findOneAndUpdate("5da85d6c9jjd51d90279328cff", "vinh quy", 50, "vinhquy@gmail.com")

// findByIdAndUpdate("5da85d6c9d51d90279328cf9", "trung", 33, "trung@gmail.com")

// deleteUser("5da85d6c9d51d90279328cf6")

// createSomeUserAndPosts()

// populateUsers()

// populateBlogPosts();

// populateCommentsOnBlogPost();

// populateCommentsOnProduct();
