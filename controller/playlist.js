let playlists =require(".././model/playlistmodel");
let users=require("../model");
let jwt =require('jsonwebtoken');
const findIndex=(array,id)=>{
    let result=null;
    for(var i=0;i<array.length;i++){
        if(array[i]===id){
            result=i;
        }
    }
    return result;
}
const findIndex1=(array,id)=>{
    let result=null;
    for(var i=0;i<array.length;i++){
        if(array[i].id===id){
            result=i;
        }
        
    }
    return result;
}
module.exports ={
    getPlaylist:async(req, res)=>{
       try {
        const tokendecoded=req.headers.authorization.split(" ")[1];
        let decode=jwt.decode(tokendecoded);
        const {username}=decode;
        let result = await playlists.find({user:username});
        return res.status(200).json({
            "msg":"success",
            "result":result,
        })
       } catch (error) {
          return  res.status(500).json(error);
       }
     },

    addPlaylist:async(req, res)=>{
        // unique name
        //update name in user
        //add db
        
       try {
           const{name}=req.body;
           const tokendecoded=req.headers.authorization.split(" ")[1];
           let decode=jwt.decode(tokendecoded);
           const {username}=decode;
           const existplaylists=await playlists.findOne({name:name,user:username});
           
           if(existplaylists){
               res.status(500).json({
                   "msg":"this playlist has already existed"
               });

           }
           else{
           
            let Playlist=new playlists({
                name:name,
                movies:[],
                user:username,
                timeCreated: new Date(),
                timeUpdated: "",
            });
           let savedplaylists= await Playlist.save();
            
            const {id}=savedplaylists;
            let CurrentUser=await users.findOne({ username:username});
            const playlists1=CurrentUser.playlists;
            playlists1.push(id);
            await CurrentUser.updateOne({playlists:playlists1});
            res.status(201).json({
                "msg":" add success",
		"playlist":savedplaylists
                
            })
            }
          
       } catch (error) {
           return res.status(500).json(error);
       } 
    }, 
    updatePlaylist:async(req, res)=>{
       try {
        const{id}=req.params;
        
        const tokendecoded=req.headers.authorization.split(" ")[1];
        let decode=jwt.decode(tokendecoded);
        const {username}=decode;
        const{name}=req.body
        const updateplaylist =await playlists.findById(id);
        
        if(updateplaylist){
            const playlistname=await playlists.findOne({name,user:username});
             if(!playlistname){
                const result=await playlists.findOneAndUpdate({_id:id},{name:name,timeUpdated:new Date()},{new:true});
               
               return res.status(200).json({
                       "msg":"update playlist success",
                        "playlist":result
               })
             }
             else{
                 res.status(500).json({
                     'msg':"The list name hasn't been changed or it  existed"
                 })
             }
           
        }
        else{
            return res.status(500).json({
                "msg":"playlist does not exist"

            })
        }
       } catch (error) {
           return  res.status(500).json({
               error
           })
       }
     },
     deletePlaylist:async(req, res)=>{
        try {
            const{id}=req.params;
            const token=req.headers.authorization.split(" ")[1];
            
            const{ username}= jwt.decode(token);
           await playlists.findOneAndDelete({_id:id});
           let CurrentUser=await users.findOne({ username:username});
           const playlists1=CurrentUser.playlists;
           let index=findIndex(playlists1,id);
             playlists1.splice(index,1);
            await CurrentUser.updateOne({playlists:playlists1});
            return res.status(200).json({
                "msg":"delete success"
            });
        } catch (error) {
            return res.status(500).json(error)
        }
     },
     addmovie:async(req,res)=>{
       try {
        const {name}=req.params;
        const token=req.headers.authorization.split(" ")[1];
        
        const{ username}= jwt.decode(token);
        const{popularity,
            id,
            video,
            vote_count, 
            vote_average,
            title,
            release_date,
            original_language,
            original_title,
            genre_ids,   
            backdrop_path,
            adult,
            overview,
            poster_path,
           
            }=req.body.movie;
           //check exist of the movie
           // push to new array
           // update to db
          
        let existingplaylist=await playlists.findOne({name,user:username});
        
        let {movies}=existingplaylist;
        let index= findIndex1(movies,id);
        
        if(index!==null){
            return res.status(500).json({
                "msg":"this movie has already been added to this List",
            })
        }
        else{
        movies.push({
            popularity:popularity ,
            id: id,
            video:video,
            vote_count:vote_count, 
            vote_average:vote_average,
            title:title,
            release_date:release_date,
            original_language:original_language,
            original_title:original_title,
            genre_ids:genre_ids,   
            backdrop_path:backdrop_path,
            adult:adult,
            overview:overview,
            poster_path:poster_path,
          
        });
        
        await existingplaylist.updateOne({movies:movies});
      
        return res.status(200).json({
            "msg":"add successfully"
        })
     }
       } catch (error) {
           return  res.status(500).json(error);
       }
     },
    deletemovie:async(req,res)=>{
        try {
            const{id}=req.params;
           
                let arrayid=id.split("-");
                let playlist_id=arrayid[0];
                let deletemovie_id=arrayid[1];
                
                let existingplaylist=await playlists.findById(playlist_id);
                
                let movies1=existingplaylist.movies;
               let index= findIndex1(movies1,parseInt(deletemovie_id));
               
               movies1.splice(index,1);
        
               await existingplaylist.updateOne({movies:movies1});
              
               return res.status(200).json({"msg":"delete success"});
        } catch (error) {
            res.status(500).json(error)
        }

    }
     
}