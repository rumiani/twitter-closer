let status;
let allowTime =7200000; //ms
let closeTime =600000; // ms
let leftTime = allowTime / 1000; //s
let showTime = 2 + "h "+ 0+"m "+ 0+ " s";
let myDiv;
let myP;
// save the status var in the browser local storage
if(localStorage.getItem('status') === null) {
    status = true
  } else {
    status = JSON.parse(localStorage.getItem('status'));
  }



// set the status
function allow(status) {
    let statusStr=JSON.stringify(status);
    localStorage.setItem('status', statusStr);
}


// get out
function getOut() {
    let reactRoot = document.getElementById("react-root")
    reactRoot?.remove();
    document.title = "Go Away"
    myDiv = document.createElement("div");
    myDiv.innerText = `You have work to do! \n You may leave here. NOW!`;
    myDiv.style.cssText = "width : 100%; height : 100%; text-align : center; color :red; font-weight:bold; font-size:40px; padding-top: 100px; background-color:black;"
    
    myP = document.createElement("p");
    myP.innerHTML =`I'll let you back <span id="showTime"></span> after closing or stop refreshing this tab!`;
    myP.style.color = "green";

    document.body.appendChild(myDiv).appendChild(myP)
    document.body.style.backgroundColor = "black"
    document.getElementById("showTime").style.color = "red"

}




//get out after a specific time
function showTimeEverySec() {
  allow(false)
  getOut()
  
    //show the initial time
    document.getElementById("showTime").innerText = showTime;

    //show time every second
  let eveySec =   setInterval(() => {    
                  let hours = Math.floor(leftTime / (60 * 60));
                  let minutes = Math.floor((leftTime % (60 * 60)) /  60);
                  let seconds = Math.floor(leftTime % 60);
                  showTime =  ((hours != 0)?(hours + "h "):"") + ((minutes !=0)?(minutes + "m "):"") + seconds + "s ";
                  if(leftTime == 0 ){
                    myP.innerText = `Now you can refresh the page and have fun for 10 min`
                  } 
                  else{
                    document.getElementById("showTime").innerText = showTime;
                    leftTime = leftTime - 1;
                  }
                }, 1000)
    setTimeout(() => {
      clearInterval(eveySec)
    }, (allowTime + 3000));
}

setTimeout(() => {
  showTimeEverySec()
}, closeTime );

// allow again every XXX seconds
setInterval(() => {
    allow(true)
  }, (allowTime + closeTime));

  // get out, if the status is false
  if(!status){ 
    showTimeEverySec()
  }

  // Hide the notification Number
  let checkNotificationsLoad = setInterval(hideIfExist, 100);
function hideIfExist() {
  let el = document.querySelector('[aria-live]')
  el.style.visibility = "hidden"
  document.title = "Twitter"
  if(el != null) clearInterval(checkNotificationsLoad)
}