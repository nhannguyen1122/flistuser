let mongoose=require("mongoose");
let schema=mongoose.Schema;
let user =new schema({
    username:String,
    password:String,
    email:String,
    playlists:Array,
});
let users1 =mongoose.model("User",user,"users");
module.exports=users1;