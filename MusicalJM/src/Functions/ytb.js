const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

const videoFinder = async(query)=>{
    console.log(query);
    const videoResult = await ytSearch(query);

    return(videoResult.videos.length > 1)? videoResult.videos[0] : null;
};

const playVideo = async (args)=>{
    const video = await videoFinder(args[1]);
    if(video){
        const stream = ytdl(video.url, {filter: 'audioonly'});
        return stream;
    }
}
module.exports = {
    playVideo,
    videoFinder
};