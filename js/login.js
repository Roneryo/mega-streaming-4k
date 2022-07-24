let login = document.querySelector ("#Login")
login.addEventListener("click",(event)=>{
    event.preventDefault();
    let email = document.querySelector ("[name='email']").value
    let password = document.querySelector ("[name='password']").value
    if (email==="" && password===""){
        console.log("campos vacios")
        }
})