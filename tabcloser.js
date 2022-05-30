let status;
let allowTime = 3600000
let closeTime = 300000

if(localStorage.getItem('status') === null) {
    status = true
  } else {
    status = JSON.parse(localStorage.getItem('status'));
  }
  
function allow(status) {
    let statusStr=JSON.stringify(status);
    localStorage.setItem('status', statusStr);
}

function getOut() {
    let reactRoot = document.getElementById("react-root")
    reactRoot.remove();
    const mydiv = document.createElement("div");
    const myP = document.createElement("p");
    myP.innerText = `I'll let you back 1 hour after closing or stop refreshing this fucking tab!`;
    myP.style.color = "green";
    mydiv.innerText = `You have work to do! \n So, get the fuck out of here!`;
    mydiv.style.cssText = "width : 100%; height : 100%; text-align : center; color :red; font-weight:bold; font-size:40px; padding-top: 100px; background-color:black;"
    document.body.appendChild(mydiv).appendChild(myP)
    document.body.style.backgroundColor = "black"
}
if(!status){ 
    getOut() 
}
setTimeout(() => {
    getOut()
    allow(false)
}, closeTime );


// allow again every XXX seconds
setInterval(() => {
    allow(true)
  }, allowTime);