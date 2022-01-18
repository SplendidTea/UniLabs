const express= require("express");
let questions = require('./questions');
const bodyParser = require('body-parser')
const app=express();

app.use(express.static(__dirname+'/static'));
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json()
app.get('/',(req,res,next)=> {
    console.log("Was Request AT" + Date.now());
    next();
},
    (req,res)=>{
   



});

let ansarry=[];
app.get('/qs',(req,res) =>
    { //iterates through the questions and sends them to the client

        let i=0;
        let questionsstring=[];
        for(p of questions)
        {
            questionsstring[i]=p.stem;
            i++;
        }

res.send(questionsstring);

    }


);

app.post('/a1',urlencodedParser,(req,res) =>{
//iterates through the answerIndex, selects the appropriate answerIndex and compares it to the value recived, if its the same it sends a correct response else it will send an incorrect response
    let ans1=req.body.value;
    let answer=[]
    let i=0;
    for(p of questions) //iterating
    {
        answer[i]=p.answerIndex;
        i++
    }
    let x= ans1.toString();
    let y=answer[0].toString();

    //^to strings both

if(x==y) //check for correct
{
    let data="Correct";
    res.send(data);
}
else
{
    let data="inCorrect";
    res.send(data);
}

});

app.post('/a2',urlencodedParser,(req,res)=>{//iterates through the answerIndex, selects the appropriate answerIndex and compares it to the value recived, if its the same it sends a correct response else it will send an incorrect response, it functions exactly like /a1
    let ans2=req.body.value;
    let answer=[];
    let i=0;
    for(p of questions)
    {
        answer[i]=p.answerIndex;
        i++
    }
    let x= ans2.toString();
    let y=answer[1].toString();

    if(x==y)
    {
        let data="Correct";
        res.send(data);
    }
    else
    {
        let data="inCorrect";
        res.send(data);
    }


});

app.post('/a3',urlencodedParser,(req,res)=>{//iterates through the answerIndex, selects the appropriate answerIndex and compares it to the value recived, if its the same it sends a correct response else it will send an incorrect response it functions exactly like /a1
    let ans3=req.body.value;
    let answer=[];
    let i=0;
    for(p of questions)
    {
        answer[i]=p.answerIndex;
        i++
    }
    let x= ans3.toString();
    let y=answer[2].toString();

    if(x==y)
    {
        let data="Correct";
        res.send(data);
    }
    else
    {
        let data="inCorrect";
        res.send(data);
    }


});

app.post('/a4',urlencodedParser,(req,res) =>{//iterates through the answerIndex, selects the appropriate answerIndex and compares it to the value recived, if its the same it sends a correct response else it will send an incorrect response it functions exactly like /a1

    let ans4=req.body.value;
    let answer=[]
    let i=0;
    for(p of questions)
    {
        answer[i]=p.answerIndex;
        i++
    }
    let x= ans4.toString();
    let y=answer[3].toString();

    if(x==y)
    {
        let data="Correct";
        res.send(data);
    }
    else
    {
        let data="inCorrect";
        res.send(data);
    }

});

app.post('/a5',urlencodedParser,(req,res) =>{//iterates through the answerIndex, selects the appropriate answerIndex and compares it to the value recived, if its the same it sends a correct response else it will send an incorrect response it functions exactly like /a1

    let ans5=req.body.value;
    let answer=[];
    let i=0;
    for(p of questions)
    {
        answer[i]=p.answerIndex;
        i++
    }
    let x= ans5.toString();
    let y=answer[4].toString();

    if(x==y)
    {
        let data="Correct";
        res.send(data);
    }
    else
    {
        let data="inCorrect";
        res.send(data);
    }

});

app.post('/final', jsonParser,(req,res)=>
{ //this recives thee final answers in an array format
    let finalanswers =req.body.value;
    console.log(finalanswers);
let mark=0;
let i=0;
let answer=[];

//from there it iterates through the answerIndex
for(p of questions)
{

    answer[i]=p.answerIndex;
    if(finalanswers[i]==answer[i]) //it will check if the answer is that same as the one in the json and increase the mark
    {
        console.log(" START");
        console.log(finalanswers[i]);
        console.log(answer[i]);    ///these lines are debug to check if the values are the same
        console.log(" END");
        mark++; //increases mark
    }
    i++
}
console.log(mark); //prints out final mark in console

res.send(mark.toString()); //sends the mark as a string as a response




});





app.listen(80);
