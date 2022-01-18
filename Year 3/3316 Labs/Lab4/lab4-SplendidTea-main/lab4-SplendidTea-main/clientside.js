function getQuestions() {

    //'/qs'
    let xReq= new XMLHttpRequest();
    xReq.onreadystatechange=displayQuestions;

    xReq.open('GET','/qs',true);
    xReq.send();
}

function displayQuestions() {

    if(this.readyState==4 && this.status ==200)
    {
        let qArray=JSON.parse(this.responseText)
        let lbl1=document.getElementById('question1lbl');
        let lbl2=document.getElementById('question2lbl');
        let lbl3=document.getElementById('question3lbl');
        let lbl4=document.getElementById('question4lbl');
        let lbl5=document.getElementById('question5lbl');

        lbl1.innerHTML=qArray[0];
        lbl2.innerHTML=qArray[1];
        lbl3.innerHTML=qArray[2];
        lbl4.innerHTML=qArray[3];
        lbl5.innerHTML=qArray[4];
    }

}