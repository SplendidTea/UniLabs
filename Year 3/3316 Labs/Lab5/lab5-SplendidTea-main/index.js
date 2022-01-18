const express= require("express");
let jobs = require('./jobs');
const bodyParser = require('body-parser');
const app=express();

let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json()

app.get('/',(req,res,next)=> {
        console.log("Was Request AT" + Date.now());
        next();
    },
    (req,res)=>{

res.send("DO THE THINGS IN THE URL BAR PLEASE")


    });

app.get('/allCatagories',(req,res) =>
{
    //finds and returns all the categories with a count of how many times they appear

    let count= new Object();
    let sta=[]
    for(j in jobs){
        
        for(c of jobs[j].categories){
            if(c in count)
            {
                count[c]++
            }
            else
            {
                count[c] = 1;
            }
            
    
        }
        
      
        
    }
    
    res.send(count)









    
});
app.get('/Everything',(req,res)=>{

    res.json(jobs);

})

app.get('/cats/:categories',(req,res)=>{

//finds all the jobs in a given category, and returns the job title
    let sta=[]


let search=req.params.categories;


for(j in jobs){
    
    for(c of jobs[j].categories){
        
            if(c==search)
            {
                sta.push({title:jobs[j].title})
            }
    }

}

res.json(sta);
})


app.get('/locations',(req,res)=>{
   
   //fins the location from the query string and returns the job title
    let sta=[]
    for(j in jobs)
    {
        
        if(jobs[j].title.includes(req.query.location))
        {
            sta.push(jobs[j].title)
        }

  
    }

res.json(sta);

})



app.listen(2000);


