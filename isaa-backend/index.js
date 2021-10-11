const express=require('express');
const cors=require('cors');
const app=express();
const mongo=require("./mongo")
const crypto = require('crypto-js');
// var AES = require("crypto-js/aes");


//working with POST and PUT requests
app.use(express.json()) //recognize incoming request as a JSON object
app.use(express.urlencoded({extended: true}));//recognize incoming requests as string or array
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors());

const User = require("./user.js");
const Sample = require("./sample.js");

app.get("/getuser",(req,res)=>{
    const response = [];
    User.find({},(err,data)=>{
        if(err) console.log(err);

        for(var i = 0; i<data.length; i++)
        {
            const currentUser = data[i];

            const encuser = {
                T_name: crypto.DES.decrypt(currentUser.T_name, 'isaa lab da').toString(crypto.enc.Utf8),
                T_email: crypto.DES.decrypt(currentUser.T_email, 'isaa lab da').toString(crypto.enc.Utf8),
                password: crypto.DES.decrypt(currentUser.password, 'isaa lab da').toString(crypto.enc.Utf8),
                T_dob: crypto.DES.decrypt(currentUser.T_dob, 'isaa lab da').toString(crypto.enc.Utf8),
                T_gender: crypto.DES.decrypt(currentUser.T_gender, 'isaa lab da').toString(crypto.enc.Utf8),
                T_phone: crypto.DES.decrypt(currentUser.T_phone, 'isaa lab da').toString(crypto.enc.Utf8)
            }
            console.log("decrypted:");
            console.log(encuser);
            res.render("view_user",{result:encuser,id:currentUser._id});
        }
    })
})

app.post("/adduser",(req,res)=>{
    
    //let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    console.log(req.body);
    // const encuser = {
    //         T_name: crypto.DES.encrypt(JSON.stringify(req.body.name), 'isaa lab da').toString(),
    //         T_email: crypto.DES.encrypt(JSON.stringify(req.body.email), 'isaa lab da').toString(),
    //         password: crypto.DES.encrypt(JSON.stringify(req.body.password), 'isaa lab da').toString(),
    //         T_dob: crypto.DES.encrypt(JSON.stringify(req.body.dob), 'isaa lab da').toString(),
    //         T_gender: crypto.DES.encrypt(JSON.stringify(req.body.gender), 'isaa lab da').toString(),
    //         T_phone: crypto.DES.encrypt(JSON.stringify(req.body.phone), 'isaa lab da').toString()
    // }
    const encuser = {
        T_name: crypto.DES.encrypt(JSON.stringify(req.body.T_name), 'isaa lab da').toString(),
        T_email: crypto.DES.encrypt(JSON.stringify(req.body.T_email), 'isaa lab da').toString(),
        password: crypto.DES.encrypt(JSON.stringify(req.body.password), 'isaa lab da').toString(),
        T_dob: crypto.DES.encrypt(JSON.stringify(req.body.T_dob), 'isaa lab da').toString(),
        T_gender: crypto.DES.encrypt(JSON.stringify(req.body.T_gender), 'isaa lab da').toString(),
        T_phone: crypto.DES.encrypt(JSON.stringify(req.body.T_phone), 'isaa lab da').toString()
    }
    const newuser = new User(encuser);
    const sampleUser=new Sample(req.body);
    sampleUser.save();
    newuser.save();
    // res.setHeader('Content-Type', 'application/json')
    // res.setHeader('Access-Control-Allow-Origin', '*')
})

app.get("/deleteuser/:id",(req,res)=>{
    const id = req.params.id;
    // const searchMail=crypto.DES.encrypt(JSON.stringify(email), 'isaa lab da').toString();
    // console.log(searchMail);
    User.findOneAndRemove({_id:id}, (err, user)=>{
        if(err) console.log(err);
        res.send("<h1>Deleted User</h1>");
    })
})

app.post("/modifyuser/:id",(req,res)=>{
    const id=req.params.id;
    console.log(req.body);
    const update={
        T_name:crypto.DES.encrypt(JSON.stringify(req.body.f_name+req.body.l_name), 'isaa lab da').toString(),
        T_email:crypto.DES.encrypt(JSON.stringify(req.body.email), 'isaa lab da').toString(),
        password:crypto.DES.encrypt(JSON.stringify(req.body.password), 'isaa lab da').toString(),
        T_dob:crypto.DES.encrypt(JSON.stringify(req.body.dob), 'isaa lab da').toString(),
        T_gender:crypto.DES.encrypt(JSON.stringify(req.body.gender), 'isaa lab da').toString(),
        T_phone:crypto.DES.encrypt(JSON.stringify(req.body.phone), 'isaa lab da').toString()
    }
    User.updateOne({_id:id}, 
        update, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            res.send("Details updated");
        }
    });
})

app.get('/edit/:id',(req,res)=>{
    res.render("edit_user",{id:req.params.id}); 
})

app.listen(5000,async ()=>{console.log(`Server is listening on port 5000`);await mongo()});




