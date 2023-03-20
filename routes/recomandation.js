const express = require("express");
const { User, Blog } = require("../models");
const router = express.Router();

router.post("/recommendation/:userId", async (req, res) => {
  const _id = req.params.userId;
  const { recommendation } = req.body;
  User.updateOne({ _id }, { $push: { recommendation } }, function (err, docs) {
    if (!err) {
      res.status(201).json({ message: "update succesfully", docs });
    }
  });
});

router.get("/recommendation/:userId", async (req, res) => {
    let _id = req.params.userId;
    let {recommendation} = await User.findOne({_id});
    var allBlog={};
    recommendation.forEach(async element => {
        let blog = await Blog.find({
            $or: [{ title: { $regex: element, $options: "i" } }],
        }).exec();
        allBlog = { ...allBlog, ...blog };
        console.log(allBlog)
    });
    res.status(201).send({allBlog})
});

// router.get("/recommendation/:userId", async (req, res) => {
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

const exclusionList = ["a","an","and","as","at","be","but","by","for","from","he","her","his","in","is","it","its","of","on","or","that","the","this","to","was","with","about","above","after","all","also","am","any","are","aren't","because","been","before","being","between","both","can","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","even","every","few","finally","first","further","had","hadn't","has","hasn't","have","haven't","having","he'd","he'll","he's","here","here's","hers","herself","him","himself","how","how's","however","i","i'd","i'll","i'm","i've","if","into","isn't","it's","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","off","once","only","other","ought","our","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that's","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","those","through","too","under","until","up","very","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself"]



module.exports = router;
