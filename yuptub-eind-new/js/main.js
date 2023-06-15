
class API {
  dataFromAPI = [];  
  async getData() { 
      await fetch("../data/data.json").then(response => {     
          return response.json();     
      }).then(data => {   
          this.dataFromAPI = data.videos; 
      });
      return this.dataFromAPI;   
  }
}


class App {
  switcher;
  dataFromAPI = [];
  videoPlayerContainer;

  constructor() {
    this.getDataAndRenderVideos();
    this.switcher = new Switcher(this, this.dataFromAPI);
    this.videoPlayerContainer = document.createElement("div");
    document.body.appendChild(this.videoPlayerContainer);
  }

  async getDataAndRenderVideos() {
    const api = new API();
    api.getData().then(data => {
      this.dataFromAPI = data;
      this.renderVideos(this.dataFromAPI);
    });
  }
  

  renderVideos(videos) {
    const videoContainer = document.createElement("div");
    videoContainer.id = "video-container";
    videoContainer.classList.add("video-container");
  
    videos.forEach((videoData) => {
      const videoDiv = document.createElement("div");
      videoDiv.classList.add("video");
  
      const videoLink = document.createElement("a");
      videoLink.href = "#";
      videoLink.addEventListener("click", () => this.playVideo(videoData.video));
  
      const videoImg = document.createElement("video");
      videoImg.src = videoData.video;
      videoImg.controls = false;
      videoImg.classList.add("video-thumbnail");
  
      videoLink.appendChild(videoImg);
      videoDiv.appendChild(videoLink);
      videoContainer.appendChild(videoDiv);
    });
  
    document.body.appendChild(videoContainer);
  }
  

  playVideo(videoUrl) {
    this.videoPlayerContainer.innerHTML = "";
    const videoPlayer = new VideoPlayer(videoUrl);
    this.videoPlayerContainer.appendChild(videoPlayer.render());
  }

  getVideoIdFromUrl(url) {
    const videoIdMatch = url.match(
      /(?:\?v=|&v=|\/embed\/|\/v\/|youtu\.be\/|\/embed\?vi?=|\/watch\?v=|\/watch\?vi=|https?:\/\/(?:www\.)?youtube\.com\/embed\/|https?:\/\/(?:www\.)?youtube\.com\/v\/|https?:\/\/(?:www\.)?youtube\.com\/watch\?v=)([^#\&\?\/\s]{11})/
    );
    return (videoIdMatch && videoIdMatch[1]) || null;
  }
}

class VideoPlayer {
  constructor(videoUrl) {
    this.videoUrl = videoUrl;
  }

  render() {
    const videoElement = document.createElement("video");
    videoElement.src = this.videoUrl;
    videoElement.controls = true;
    videoElement.classList.add("video-player__video");

    return videoElement;
  }
}




class Switcher {
  yubtub;
  cleaner;
  app;
  default = 0;

  constructor(app, data) {
    this.app = app;
    this.data = data;
    //this.yubtub = new Yubtub(this.app, data[this.default]);
    this.cleaner = new Cleaner();
  }

  switch(link) {
    this.cleaner.clean("body");
    this.yubtub = new Yubtub(this.app, this.data[link]);
  }
}

class Cleaner {
  clean(whereToClean) {
    document.querySelector(whereToClean).innerHTML = "";
  }
}



    //    class Yubtub{
    //     aside;
    //     renderer;
    //     app;
    //     constructor(app,data){
    //         this.app = app;
    //         //this.renderer = new Renderer();
    //         this.aside = new Aside(this, data);
    //     }
    // }

// class Comments {
//     commentsList = [];
  
//     constructor() {
//       this.loadComments();
//     }
  
//     loadComments() {
 
//       this.commentsList = [
//         { id: 1, author: "Gebruiker1", text: "Dit is een geweldige video!" },
//         { id: 2, author: "Gebruiker2", text: "Bedankt voor het delen." },
//       ];
//     }
  
//     addComment(author, text) {
//       const newComment = { id: this.generateCommentId(), author, text };
//       this.commentsList.push(newComment);
//       this.renderComment(newComment);
//     }
  
//     generateCommentId() {
    
//       return Date.now();
//     }
  
//     renderComment(comment) {
//         let commentsContainer = document.querySelector(".comments__container");
        
    
//         if (!commentsContainer) {
//           commentsContainer = document.createElement("div");
//           commentsContainer.classList.add("comments__container");
//           document.body.appendChild(commentsContainer);
//         }
        
   
//         const commentContainer = document.createElement("div");
//         commentContainer.classList.add("comment");
        
       
//         const authorElement = document.createElement("div");
//         authorElement.classList.add("comment__author");
//         authorElement.textContent = `Author: ${comment.author}`;
//         commentContainer.appendChild(authorElement);
        

//         const textElement = document.createElement("div");
//         textElement.classList.add("comment__text");
//         textElement.textContent = comment.text;
//         commentContainer.appendChild(textElement);
        

//         commentsContainer.appendChild(commentContainer);
//       }
      
// }
  

// const comments = new Comments();
// comments.addComment("John", "Leuke video!");
// comments.addComment("Jane", "Bedankt voor het delen!");

  
  
  const app = new App();
  console.log(app);
  