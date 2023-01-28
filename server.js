const express = require("express");
const passport = require("passport");
const ejs = require("ejs");
require("./passportConfig")(passport);

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index")  
});


app.post(
      "/auth/signup",
      passport.authenticate("local-signup", { session: false }),
      (req, res, next) => {
        res.json({
        user: req.user,
        });
      }
);
    
app.post(
        "/auth/login",
      passport.authenticate("local-login", { session: false }),
      (req, res, next) => {
        res.json({ user: req.user });
      }
);




app.listen(3000, () => console.log("Listening on port 3000"));