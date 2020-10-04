
let express=require('express');
let router=express.Router();
let playlists=require('../controller/playlist');
router.get('/',playlists.getPlaylist);
router.post('/add',playlists.addPlaylist);
router.patch('/update/:id',playlists.updatePlaylist);
router.delete('/delete/:id',playlists.deletePlaylist);
router.post('/addmovie',playlists.addmovie);
router.delete('/deletemovie/:id',playlists.deletemovie);
module.exports=router;