
var divisor = 2;


var runRule;
var dalist = document.getElementById("dalist")
var startbar = document.getElementById("bobo")
var wider = 40;
var higher = 20;

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var canvHigh = c.getAttribute("height")
var canvWide = c.getAttribute("width")

//Input Variables
var hightimes = canvHigh/divisor;
var stripLength = canvWide/divisor;


//Dont touch, will make better
var starter = []
var ruleList=[]

var canvColor = c.style.background

//Start array square builder
class DivSquare {
    constructor(height_,width_,color_,index_){
        this.height = height_
        this.width = width_
        this.color = color_
        this.index = index_
    }

    build(){
        this.tmp = document.createElement("BUTTON")
        // this.tmp.style.height = this.height + "px"
        this.tmp.style.width = this.width + "px"
        this.tmp.innerHTML = this.index
    };

    coloring(){
        if (this.color == "black"){
            this.tmp.setAttribute("class", "startpartB")
        }
        else {
            this.tmp.setAttribute("class", "startpartW")
        }
        this.tmp.setAttribute("id", String(this.index)+"a")
        this.tmp.setAttribute("onClick", "daftArrayClicker(this.innerHTML, this.id)" )
    }

    addon(){
        startbar.appendChild(this.tmp)
    }
}

//Canvas Square builder
class Square {
    constructor(top_, left_, height_, width_, color_){
        this.top = top_
        this.left = left_
        this.height = height_
        this.width = width_
        this.color = color_
    }

    build(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.top, this.left, this.width, this.height);
    }
}

//Takes the previous, current and next values in the pattern, returns string
function daftConcat(a,b,c){
    let tmp = String(a)+String(b)+String(c)
    return tmp
}

//Takes in the current array and builds a new one based on the ruleset provided
function daftWriter(inArr, rules){
    let outArr = []
    for (let i = 0; i < inArr.length; i++){
        if (i == 0){
            let j = 0;
            outArr.push(j)
        }
        else if (i == inArr.length-1){
            let j = 0;
            outArr.push(j)
        }
        else {
            let j;
            // console.log(daftConcat(inArr[i-1],inArr[i],inArr[i+1]))
            switch (daftConcat(inArr[i-1],inArr[i],inArr[i+1])){
                case "000":
                    j = rules[0];
                    break;
                case "001":
                    j = rules[1];
                    break;
                case "010":
                    j = rules[2];
                    break; 
                case "011":
                    j = rules[3];
                    break;
                case "100":
                    j = rules[4];
                    break;
                case "101":
                    j = rules[5];
                    break;
                case "110":
                    j = rules[6];
                    break;
                case "111":
                    j = rules[7];
                    break;
            }
            outArr.push(j)
        }
    }
    return outArr
}

//Takes in the freshly made array and prints it to the screen
function daftReader(inArr, lvl){
    for (let i = 0; i < stripLength; i++){
        if (inArr[i] == 1){
            let tomp = new Square(i*divisor,lvl*divisor,divisor,divisor, "#000000")
            tomp.build()
        }
        else {
            continue;
        }
    }
}

//DEPRECATED
//Basic draw to screen, alternates color everytime to see each block
function doDraw(){
    let bob = true;
    for (let y = 0; y < hightimes; y++){
        for (let x = 0; x < stripLength; x++){
            if (bob){
                let tomp = new Square(x*divisor,y*divisor,divisor,divisor, "#FF0000")
                tomp.build()
                bob = false;
            } else {
                let tomp = new Square(x*divisor,y*divisor,divisor,divisor, "#0000FF")
                tomp.build()
                bob = true;
            }
        }
    }
}

//Generates the rule list for n variable types
function daftRules(n, prev){
    if (n==0){
        ruleList.push(prev)
        return;
    }
    let x;
    x = prev+"0";
    daftRules(n-1, x)
    x = prev+"1";
    daftRules(n-1, x)
}

//Takes each member of the ruleList and turns it into an array of integers
function daftRuleParser(inStr){
    let a = parseInt(inStr.charAt(0))
    let b = parseInt(inStr.charAt(1))
    let c = parseInt(inStr.charAt(2))
    let d = parseInt(inStr.charAt(3))
    let e = parseInt(inStr.charAt(4))
    let f = parseInt(inStr.charAt(5))
    let g = parseInt(inStr.charAt(6))
    let h = parseInt(inStr.charAt(7))
    let outArr = [a,b,c,d,e,f,g,h]
    return outArr
}

//Clears the canvas
function daftClear(){
    ctx.clearRect(0, 0, canvWide, canvHigh);
}

//Combined everything
function daftAllmighty(starter, rules){
    let initial = starter
    for (let k = 0; k < hightimes; k++){
        daftReader(initial, k)
        let second = daftWriter(initial, rules)
        initial = second
    }
    
}

//Watches the starter array and changes both the onscreen color and the backend array values
function daftArrayClicker(index, selfid){
    let tmp = document.getElementById(selfid)
    if (starter[index] == 0){
        starter[index] = 1
    }
    else {
        starter[index] = 0
    }
    if (tmp.getAttribute("class") == "startpartW"){
        tmp.setAttribute("class", "startpartB")
    }
    else {
        tmp.setAttribute("class", "startpartW")
    }
}

//Build the start array
function daftArrayStarter(){
    let tmp = document.getElementById("bobo")
    tmp.style.width = (stripLength*wider)
    for (let i = 0; i < stripLength; i++){
        let temp = new DivSquare(wider,wider,"bob",i)
        temp.build()
        temp.coloring()
        temp.addon()
        starter.push(0)
    }
}

//Builds the scrolling list for the rules
function daftRulesBuild(){
    for (let i = 0; i < ruleList.length; i++){
        let tmp = document.createElement("BUTTON")
        tmp.setAttribute("class", "ruleclass")
        tmp.setAttribute("id", String(i)+"b")
        tmp.setAttribute("onClick", "daftRulesRead(this.id)")
        tmp.innerHTML = ("Rule "+ String(i))
        dalist.appendChild(tmp)
    }
}

//Takes the selected rule and prints out the binary form and the combos
function daftRulesRead(selfid){
    let rdex = selfid.replace("b","");
    let rulestring = ruleList[rdex];
    let combolist = daftRuleParser(rulestring);
    runRule = combolist
    console.log(combolist[0])
    document.getElementById("ruleNum").innerHTML = "Rule: " + String(rdex)
    document.getElementById("ruleBin").innerHTML = "||  Binary: " + rulestring
    document.getElementById("000").innerHTML = combolist[0]
    document.getElementById("001").innerHTML = combolist[1]
    document.getElementById("010").innerHTML = combolist[2]
    document.getElementById("011").innerHTML = combolist[3]
    document.getElementById("100").innerHTML = combolist[4]
    document.getElementById("101").innerHTML = combolist[5]
    document.getElementById("110").innerHTML = combolist[6]
    document.getElementById("111").innerHTML = combolist[7]
}

//Final function, called on submit presss
function daftRunThatShit(){
    daftClear()
    daftAllmighty(starter, runRule)
}

//Running stuff
daftRules(8,"")
daftArrayStarter()
daftRulesBuild()
daftRulesRead("90b")



//DEPRECATED
//Initial function, generates the design from the starting array and a given ruleset
var count = 0;

function daftA(){
    daftAllmighty(starter, daftRuleParser(ruleList[count]))
    count++;
    if (count >= 256){
        count = 0;
    }
    setTimeout(daftB, 1000)
}


//Middle function, fades in rectangles of background color to fade out the design
function daftB(){
    let trent = setInterval(fadeAway, 50)
    let counter = 0;
    function fadeAway(){
        ctx.globalAlpha = counter;
        ctx.fillRect(0,0,canvWide,canvHigh)
        ctx.fillStyle = canvColor
        counter += 0.1
        if (counter >= 1){
            setTimeout(daftC,400)
            counter = 0;
            clearInterval(trent)
        }
    }

}

//End function, clears the canvas and resets rule list
function daftC(){
    daftClear()
    if (count >= 256){
        count = 0;
    }
    setTimeout(daftA, 100)
}
