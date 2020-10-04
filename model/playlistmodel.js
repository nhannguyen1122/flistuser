let mongoose=require('mongoose');
let schema=mongoose.Schema;

let playlist =new schema({
   name:String,
   movies:Array,
   timeCreated: Date,
   timeUpdated:Date,
});
let playlists =mongoose.model("playlists",playlist,"playlists");
module.exports=playlists;