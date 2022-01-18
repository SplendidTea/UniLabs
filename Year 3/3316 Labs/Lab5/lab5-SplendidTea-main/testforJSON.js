let jobs = require('./jobs');


let sta=[]
for(j in jobs){
    {
        
        if(jobs[j].title.includes("Cyberjaya, Malaysia"))
        {
            sta.push(jobs[j].title)
        }

  
    }
}

let g=new Object();

g=sta
console.log(g)




