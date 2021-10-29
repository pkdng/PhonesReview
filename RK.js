const elBtnComment = document.querySelector('#btn-comment');
      const elCommentList = document.querySelector('#comment-list');

      const elCommentSection = document.querySelector('#comment-form-section');
      const elCommentForm = document.querySelector('#comment-form');
      const elInputUsername = document.querySelector('#input-username');
      const elInputComment = document.querySelector('#input-comment');
      const elBtnSubmit = document.querySelector('#btn-submit');
      const elBtnCancel = document.querySelector('#btn-cancel');



       let divHead = document.createElement("div")
       divHead.setAttribute("class", "ms-2 me-auto")
 
       let bold = document.createElement("div")
       bold.setAttribute("class", "fw-bold text-capitalize")

       let baris = document.createElement("li")
       baris.setAttribute("class", "list-group-item d-flex justify-content-between align-items-start")


elBtnComment.addEventListener("click", function(event){

    event.preventDefault(); 
    elCommentSection.removeAttribute("class") 
    elBtnComment.setAttribute("class", "d-none") 
  
  })



  elBtnSubmit.addEventListener("click", function(event){

    event.preventDefault(); 

    bold.innerText = elInputUsername.value 

    divHead.append(bold) 
    divHead.append(elInputComment.value) 

    baris.append(divHead) 
    elCommentList.prepend(baris) 

    elInputComment.value = "" 
    elInputUsername.value = "" 

    
  })



  elBtnCancel.addEventListener("click", function(event){
    
    elInputComment.value = "" 
    elInputUsername.value = "" 

    elCommentSection.setAttribute("class", "d-none")

    elBtnComment.setAttribute("class", "btn btn-primary w-100 text-capitalize")

  })