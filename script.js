// console.log("Hello");
showNotes();

let addBtn=document.getElementById("addBtn");
addBtn.addEventListener("click",function(e){
    let addTxt=document.getElementById("addTxt");
    let notes=localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);  //convert to array
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes",JSON.stringify(notesObj));   //convert to strings
    addTxt.value="";
    console.log(notesObj);

    showNotes();
})


//function to show elements from local storage
function showNotes(){
    let notes=localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);  //convert to array
    }

    let html="";
    notesObj.forEach(function(element,index){
        html+=`
          <div class="notesCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${index+1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
          </div>`;
    })

    let notesElm=document.getElementById("notes");
    if(notesObj.length!=0)
    {
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML=`Nothing To Show! Use "Add A Note" Section Above To Add Notes.`;
    }
}

//function to delete a note

function deleteNote(index){
    console.log("I AM Deleting",index)

    let notes=localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);  //convert to array
    }

    notesObj.splice(index,1); //for deleting the note
    localStorage.setItem("notes",JSON.stringify(notesObj));   //convert to string
    showNotes();
}


let search=document.getElementById("searchTxt");

search.addEventListener("input",function(){
    

    let inputVal=search.value.toLowerCase();
    // console.log("Input is Working",inputVal);

    let noteCards=document.getElementsByClassName("notesCard");

    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })

})