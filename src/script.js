var mainFrame = document.getElementById("box");
var userDetect = document.getElementById("userDetect");

var svg = document.getElementById("faceSVG");
var rect = svg.getBoundingClientRect();
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
var leftpupils = document.getElementById("leftpuplis");
var rightpupils = document.getElementById("rightpuplis");
var time = generateRandomNumber()

blink();
document.addEventListener("mousemove", function(event) {
  getCursorCoordinate(event);
});

function blink(){ 
  var left = d3.select(leftpupils);
  time  = generateRandomNumber();
  left.transition()
    .duration(1000)
    .attr("r", 0)
    .transition()
    .duration(1000)
    .attr("r", 10);
   var right = d3.select(rightpupils);
   right.transition()
    .duration(1000)
    .attr("r", 0)
    .transition()
    .duration(1000)
    .attr("r", 10);
  console.log(time);
  setTimeout(blink,time);


}


function movepupils(cx,cy){
  let x = 0;
  let y = 0;
  x = (cx / windowWidth * 1.0 - 0.5)* 40 + 100;
  y = (cy / windowHeight *1.0 - 0.5)* 40 + 150;
  leftpupils.setAttribute("cx", x);
  leftpupils.setAttribute("cy", y);
  x = (cx / windowWidth * 1.0 - 0.5)* 40 + 300;
  y = (cy / windowHeight *1.0 - 0.5)* 40 + 150;
  rightpupils.setAttribute("cx", x);
  rightpupils.setAttribute("cy", y);

}

function getCursorCoordinate(e){
  var x = e.clientX;
  var y = e.clientY;
  movepupils(x,y);
}

function generateRandomNumber(){
  return (Math.floor(Math.random() * 10) + 1 )*1000
}

/* -------------user detection ------------*/
/* This function checks and sets up the camera */
function startVideo() {
  if (navigator.mediaDevices && 
      navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true})
      .then(handleUserMediaSuccess)
      .catch(handleUserMediaError);
  }
}

function handleUserMediaError(error){
  console.log(error);
}

function handleUserMediaSuccess(stream){
  var video = document.getElementById("myVideo");
  video.srcObject = stream;
  // video.play();
  console.log("success");
  window.setInterval(captureImageFromVideo, 500);
}

// The variable that holds the detected face information, which will be updated through Firebase callbacks
var detection = null;

function captureImageFromVideo() {
  const canvas = document.getElementById("mainCanvas");
  const context = canvas.getContext("2d");
  
  const video = document.getElementById("myVideo");
  canvas.setAttribute("width", video.width);
  canvas.setAttribute("height", video.height);  
  // Draw video image onto Canvas
  context.drawImage(video, 0, 0, video.width, video.height);

  sendSnapshot();
  
  //var dataObj = context.getImageData(0, 0, canvas.width, canvas.height);

  // If a face detection has been received from the database, draw a rectangle around it on Canvas
  if (detection) {
    const face = detection[0];
    context.beginPath();
    context.moveTo(face.x, face.y);
    context.lineTo(face.x + face.w, face.y);
    context.lineTo(face.x + face.w, face.y + face.h);
    context.lineTo(face.x, face.y + face.h);
    context.lineTo(face.x, face.y);
    context.lineWidth = 5;
    context.strokeStyle = "#0F0";
    context.fillStyle = "#0F0";
    context.stroke();
    mainFrame.style.visibility = "visible";
    userName = face.name;
    userDetect.innerHTML = "user Detected! welcome user " + userName; 
  }else{
    mainFrame.style.visibility = "hidden";
    userDetect.innerHTML = "Can not detect user, lesson paused!"

  }
}
  
function sendSnapshot() {
  const canvas = document.getElementById("mainCanvas");
  // Convert the image into a a URL string with built0-in canvas function 
  const data = canvas.toDataURL();
  const commaIndex = data.indexOf(",");
  const imgString = data.substring(commaIndex+1,data.length);
  storeImage(imgString);
  console.log("photo sent;");
}

// Initialize Firebase
var config = {
   apiKey: "AIzaSyDKUFVcdDaZ2XIvLUtfZhmHWyBY6y1-GTE",
    authDomain: "peaceful-stock-259601.firebaseapp.com",
    databaseURL: "https://peaceful-stock-259601.firebaseio.com",
    projectId: "peaceful-stock-259601",
    storageBucket: "peaceful-stock-259601.appspot.com",
    messagingSenderId: "431653785240",
    appId: "1:431653785240:web:5fdcf06a499c450ab00aed",
    measurementId: "G-6B6EMBGGL2"
};
firebase.initializeApp(config);

function storeImage(imgContent)
{
    var dbRef = firebase.database().ref('/');
    dbRef.update({"image":imgContent});
}

// Register a callback for when a detection is updated in the database
var dbRef = firebase.database().ref('/detection/');
dbRef.on("value", newFaceDetected);

function newFaceDetected(snapshot) {
  detection = snapshot.val();
}
/* -------------user detection ------------*/


// ---------  varible inti 
var vacabBotton = document.getElementById("vocab");
var vacabSubBotton = document.createElement("button");
var speakingBotton = document.getElementById("speaking");
var speakingSubButton = document.createElement("button");
var speakingStopButton = document.createElement("button");
var speakingAgainButton = document.createElement("button");
var mainblock = document.getElementById("mainBlock");
var subTitle = document.getElementById("subTitle");
var buttonBlock = document.getElementById("buttonBlock");
var targetLanguage = "zh-CN";

var questionList = [
  ["不客气", "再见", "你好", "请", "what is you are welcome in chinese","不客气"],
  ["不客气", "再见", "你好", "请", "what is goodbye in chinese","再见"],
  ["不客气", "再见", "你好", "请", "what is hello in chinese","你好"],
  ["不客气", "再见", "你好", "请", "what is please in chinese","请"],
  ["坐", "听", "说", "读", "what is listen in chinese","听"],
  ["坐", "听", "说", "读", "what is sit in chinese","坐"],
  ["坐", "听", "说", "读", "what is speak in chinese","说"],
  ["坐", "听", "说", "读", "what is read in chinese","读"],
  ["咖啡", "水", "牛奶", "啤酒", "what is milk in chinese","牛奶"],
  ["咖啡", "水", "牛奶", "啤酒", "what is coffee in chinese","咖啡"],
  ["咖啡", "水", "牛奶", "啤酒", "what is water in chinese","水"],
  ["咖啡", "水", "牛奶", "啤酒", "what is beer in chinese","啤酒"],
  ["邮局", "银行", "医院", "超市", "what is bank in chinese","银行"],
  ["邮局", "银行", "医院", "超市", "what is post office in chinese","邮局"],
  ["邮局", "银行", "医院", "超市", "what is hospital in chinese","医院"],
  ["邮局", "银行", "医院", "超市", "what is supermarket in chinese","超市"],
  ["父亲", "母亲", "儿子", "女儿", "what is father in chinese","父亲"],
  ["父亲", "母亲", "儿子", "女儿", "what is mother in chinese","母亲"],
  ["父亲", "母亲", "儿子", "女儿", "what is son in chinese","儿子"],
  ["父亲", "母亲", "儿子", "女儿", "what is daughter in chinese","女儿"],
  ["东", "西", "南", "北", "what is east in chinese","东"],
  ["东", "西", "南", "北", "what is west in chinese","西"],
  ["东", "西", "南", "北", "what is south in chinese","南"],
  ["东", "西", "南", "北", "what is north in chinese","北"],


];
var speakingList = [
  ["你叫什么名字?","what is your name?"],
  ["你好","hello"],
  ["现在几点了?","what time is it now?"],
  [" 早上好","good morning"],
  ["你是谁 ","who are you?"],
  ["再见","good bye"],
  ["谢谢","thank you"],
  ["你干什么呢?","what are you doing?"],
  ["你要去哪儿","where are you going?"],
  ["今天天气怎么样?","how is the weather today?"],
  ["很高兴认识你","nice to meet you"],
  ["妈妈，我想吃烤山药","mom, i want to eat roasted Chinese yam."],
  ["谢谢妈妈，妈妈真好","Thank you mom, you are so nice."],

  ["你今年多大了","How old are you?"]

];
// ---------  varible inti 



//--onclick call back-----
speakingSubButton.onclick = voiceReconigtion 
vacabSubBotton.onclick = showAnswer;
speakingAgainButton.onclick = speakAgain;
speakingStopButton.onclick = recognitionEnded;
//--onclick call back-----

// ---------  setup voice recongition 
var grammar =
  "#JSGF V1.0; grammar emar; public <greeting> = hello | hi; <person> = maya | alisa;";
var recognition = new window.webkitSpeechRecognition();
var speechRecognitionList = new window.webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "zh-CN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
// ---------  setup voice recongition 

//voice recongition -------------------
function voiceReconigtion() {
  recognition.start();
};

recognition.onresult = processSpeech;

function processSpeech(event) {
  var inputSpeech = event.results[0][0].transcript;
  subTitle.innerHTML = "you said: " + inputSpeech
  recognition.stop();
}

recognition.onend = recognitionEnded;

function recognitionEnded() {
  console.log("onend happened");
  recognition.stop();
}
//voice recongition -------------------


// speaking Practice ----------------------------------
function speakingPratice(){
    clear();
    shuffleContent(speakingList);
    mainblock.appendChild(createNewSpeakingTest(speakingList[0]));
}

function createNewSpeakingTest(array){
  var div = document.createElement("div");
  var targetp = document.createElement("p");
  var sourcep = document.createElement("p");

  var targetText = array[0];
  var sourceText = array[1];
  targetp.innerHTML = targetText;
  targetp.id = "targetText";
  div.appendChild(targetp);
  sourcep.innerHTML = sourceText;
  sourcep.id = "sourceText";
  div.appendChild(sourcep);
  speak(targetText,targetLanguage);
  speakingSubButton.setAttribute("id","speakingSubButton");
  speakingSubButton.innerHTML = "click me to say";
  buttonBlock.appendChild(speakingSubButton);
  speakingStopButton.setAttribute("id","speakingStopButton");
  speakingStopButton.innerHTML = "click me to stop voice detect";
  buttonBlock.appendChild(speakingStopButton);
  speakingAgainButton.setAttribute("id","speakingAgainButton");
  speakingAgainButton.innerHTML = "click me to listen again";
  buttonBlock.appendChild(speakingAgainButton);
  


return div;
}

function speakAgain(){
  var text = document.getElementById("targetText").innerHTML;
  console.log(text);
  speak(text,targetLanguage);

}
// speaking Pratice ----------------------------------


// vocabPratice ----------------------------------
function vocabPratice() {
  clear();
  console.log(questionList[0]);
  shuffleContent(questionList);
  mainblock.appendChild(createForm(questionList[0]));
}

function createForm(questionList) {
  var form = document.createElement("Form");
  // form.setAttribute("name",array[0]);
  // form.setAttribute("class","option");
  var question = document.createElement("div");
  question.innerHTML = questionList[4];
  speak(questionList[4],"en-US");
  form.appendChild(question);

  for (var i = 0; i < 4; i++) {
    var radioButton = document.createElement("input");
    radioButton.setAttribute("type", "radio");
    radioButton.setAttribute("name", "question");
    radioButton.setAttribute("value", questionList[i]);
    radioButton.setAttribute("id", i);

    var label = document.createElement("label");
    //-- we add the input to its text label.  ( put it insdie of it )
    label.appendChild(radioButton);
    label.innerHTML += "<span> " + questionList[i] + "</span><br>";
    //--we add the label to the form.
    form.appendChild(label);
  }

  vacabSubBotton.id = "showAnswer";
  vacabSubBotton.innerHTML = "show Answer";
  buttonBlock.appendChild(vacabSubBotton);
  return form;
}

function showAnswer(choiceList){
  subTitle.innerHTML = "the answer is " + questionList[0][5];
  speak("the answer is ","en-US");
  speak(questionList[0][5],"zh-CN");
}

// vocabPratice ----------------------------------



// helper method ----------------------------------
function shuffleContent(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}



/*Function that makes the browser speak a text in a given language*/
function speak(text, lang) {
  /*Check that your browser supports test to speech*/
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance();
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      console.log("Your browser supports " + voices.length + " voices");
      console.log(voices);
      msg.voice = voices.filter(function(voice) { return voice.lang == lang; })[1];
    }
    msg.voiceURI = 'native';
    msg.volume = 0.8; // 0 to 1
    msg.rate = 0.6; // 0.1 to 10
    msg.pitch = 0.6; //0 to 2
    msg.text = text;
    msg.lang = lang;
    msg.onend = function(e) {
      console.log('Finished in ' + e.elapsedTime + ' milliseconds.');
    };
    speechSynthesis.speak(msg);
  }
}

function clear(){
    mainblock.innerHTML = " ";
    subTitle.innerHTML = "";
    buttonBlock.innerHTML = "";
}

// helper method ----------------------------------
