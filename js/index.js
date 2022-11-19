document.querySelector("div.container").style = "display: none";

setTimeout(function () { 
    document.querySelector("div.page-loading-status").style = "display: none";
    
    document.querySelector("div.container").style = "display: block";
}, 2000);


function startMyTime() { 
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    
    // prepend 0
    if (m < 10) { 
        m = "0" + m;
    }
    if (s < 10) { 
        s = "0" + s;
    }
    

    let regular = new formatHours(h, m, s);
    let chosenFormat = document.getElementById('hourFormat').value;
    if(chosenFormat == "regular"){
        let regularHrs = regular.format12();
        let amOrPm = regular.amPm();
        document.getElementById("display-time").innerHTML = `${regularHrs}:${m}:${s}`;
        document.getElementById('ampm').innerHTML = `${amOrPm}`;
        t = setTimeout('startMyTime()', 500);
    }
    else{
        document.getElementById("display-time").innerHTML = `${h}:${m}:${s}`;
        document.getElementById('ampm').innerHTML = ``;
        t = setTimeout('startMyTime()', 500);
    }
}

let calculator = new Calculator();

function keypress(event){
    let op = event.key;
    document.getElementById('screen').focus();
    // console.log(keys);
        switch (op){
            case '+':
                document.getElementsByTagName('button')[0].focus();
                document.getElementsByTagName('button')[0].click();
                break;
            case '-':
                document.getElementsByTagName('button')[1].focus();
                document.getElementsByTagName('button')[1].click();
                break;
            case '*':
                document.getElementsByTagName('button')[2].focus();
                document.getElementsByTagName('button')[2].click();
                break;
            case '/':
                document.getElementsByTagName('button')[3].focus();
                document.getElementsByTagName('button')[3].click();
                break;
            case 'Enter':
                document.getElementsByTagName('button')[5].click();
                break;
            case 'c':
                document.getElementsByTagName('button')[4].focus();
                document.getElementsByTagName('button')[4].click();
                break
        }
}