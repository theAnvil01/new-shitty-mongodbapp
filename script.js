

function getinfo(){
    const name = document.getElementById("name").value
    const clas = document.getElementById("class").value
    const age = document.getElementById("age").value
    const username = document.getElementById("username").value
    
    

    
        //data type 
         const userdata = { 
            username: username,
            name: name,
            classes: clas,
            age: age
         }
    
         fetch("http://127.0.0.1:4000/final_request",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userdata)
            
         }).then(response => response.text())
         .then(response => {
             alert(response)
             /*const html=` 
             <p><b>Your name : </b> ${name}</p>
             <p><b>Your class : </b> ${clas}</p>
             <p><b>Your age : </b> ${age}</p>
             <p><b>Your Username : </b> ${username}</p>
             `
             document.getElementById("result").innerHTML = html;*/

})
}
function searchuser(){
    const username = document.getElementById("username").value
    
    const user = {
        user : username
    }
    fetch("http://127.0.0.1:4000/search",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json"},

            body:  
                JSON.stringify(user)
                
            }    
        
    ).then(response => response.json())
    .then(data =>{
        const username = data.username
        const classes = data.class
        const age = data.age
        const error = data.error
        

        if (error === undefined){
            alert("User Found")
        const html= `
         <p><b>Your username: </b> ${username} </p>
         <p><b>Your class: </b> ${classes} </p>
         <p><b>Your age: </b> ${age} </p>
         `

         document.getElementById("result").innerHTML = html;
        }   
        else { 
            alert(error)
        }

    })
}