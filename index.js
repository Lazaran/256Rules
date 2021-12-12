
var divisor = 2;

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
console.log(canvColor)


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


//Basic draw to screen, alternates color everytime to see each block
function doDraw(){
    let bob = true;
    for (let y = 0; y < hightimes; y++){
        for (let x = 0; x < stripLength; x++){
            console.log(x)
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

function daftDefault(){
    for (let u = 0; u < stripLength; u++){
        let tmp = 0;
        if (u == Math.ceil(stripLength/2)){
            tmp = 1
        }
        starter.push(tmp)
    }
}


//Clears the canvas
function daftClear(){
    ctx.clearRect(0, 0, canvWide, canvHigh);
}


function daftAllmighty(starter, rules){
    let initial = starter
    for (let k = 0; k < hightimes; k++){
        daftReader(initial, k)
        let second = daftWriter(initial, rules)
        initial = second
    }
    
}

//Running stuff
daftDefault()
daftRules(8,"")
var count = 0;

//Initial function, generates the design from the starting array and a given ruleset
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

daftA()
