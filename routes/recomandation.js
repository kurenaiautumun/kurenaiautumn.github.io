const express = require("express");
const { User, Blog } = require("../models");
const router = express.Router();

router.post("/recommandation/:userId", async (req, res) => {
  const _id = req.params.userId;
  const { recommandation } = req.body;
  User.updateOne({ _id }, { $push: { recommandation } }, function (err, docs) {
    if (!err) {
      res.status(201).json({ message: "update succesfully", docs });
    }
  });
});

router.get("/recommandation/:userId", async (req, res) => {
    let _id = req.params.userId;
    let {recommandation} = await User.findOne({_id});
    var allBlog={};
    recommandation.forEach(async element => {
        let blog = await Blog.find({
            $or: [{ title: { $regex: element, $options: "i" } }],
        }).exec();
        allBlog = { ...allBlog, ...blog };
        console.log(allBlog)
    });
    res.status(201).send({allBlog})
});

// router.get("/recommandation/:userId", async (req, res) => {
//     let _id = req.params.userId;
//     try {
//         const user = await User.findOne({ _id });
//         let { recommandation } = user;
//         let allBlog = {};
//         for (const element of recommandation) {
//             const posts = await Blog.find({
//                 $or: [{ title: { $regex: element, $options: "i" } }],
//             }).exec();
//             allBlog = { ...allBlog, ...posts };
//         }
//         const uniqueBlogs = Object.values(
//             allBlog.reduce((acc, cur) => {
//                 if (!acc[cur._id]) {
//                     acc[cur._id] = cur;
//                 }
//                 return acc;
//             }, {})
//         );
//         console.log(uniqueBlogs);
//     } catch (err) {
//         console.error(err);
//     }
// });



module.exports = router;
