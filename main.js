song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

leftWristScore = 0;
rightWristScore = 0;

rightWristX = 0;
rightWristY = 0;

songStatus = "";

function preload() {
    harryPotterThemeSong = loadSound("music.mp3");
    PeterPansong = loadSound("music2.mp3")
}

function setup() {

    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    PeterPansong.play();
}






function modelLoaded() {
    console.log("PoseNet Model is Inatialized.");
}

function gotPoses(results)
 {
 
    

    if (results.length > 0) {
        

        console.log(results);

        songStatus = PeterPansong.isPlaying();

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "  Right Wrist Y = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);

        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score = " + leftWristScore);
          
        rightWristScore = results[0].pose.keypoints[10].score;
    }

  


  
  
}

function draw() {
    image(video, 0, 0, 600, 500);

    stroke("red");


    if(leftWristScore > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        PeterPansong.stop();

        if( songStatus ==  false){
            harryPotterThemeSong.play();
            document.getElementById("songName").innerHTML = "Song : Harry Potter Theme Song"
           
         }
        
    }



}
