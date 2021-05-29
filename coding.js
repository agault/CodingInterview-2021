
window.onload=async function sendApiRequest(){
    let response = await fetch('http://sandbox.bittsdevelopment.com/code1/fetchemployees.php');
    
    var data = await response.json();
    console.log(data)

    var IdArray = [];
    var arraySquared=[];
    //get the vaalues from the JSON
    for (var properties in data) {
        if (Object.prototype.hasOwnProperty.call(data, properties)) {
            var firstName=data[properties].employeefname;
            var lastName= data[properties].employeelname;
            var bio = data[properties].employeebio;
            var id= data[properties].employeeid;
            var roles =data[properties].roles;
            var feature =data[properties].employeeisfeatured;
            var details = [id, firstName, lastName, bio, feature, roles]//roles is an array
            //ARRAY OF IDS:
            IdArray.push(id);  
            arraySquared.push(details);   
        }
    }
    console.log(arraySquared);//ARRAY OF ARRAYS which contain employee info

    var content = document.getElementById("content");
    for(i=0; i<IdArray.length; i++){
       idEM= arraySquared[i][0];//Id of employee
       firstname= arraySquared[i][1];//List first names
       lastname=arraySquared[i][2];//List last names
       bioEM=arraySquared[i][3];//list bio
       featureEM=arraySquared[i][4]//Featured emplyee
       rolesEM = arraySquared[i][5];//produces array of roles

       let images = await fetch(`http://sandbox.bittsdevelopment.com/code1/employeepics/${idEM}.jpg`);
       
    //CARD
       var card =document.createElement("div");
       card.className = 'card';
       content.appendChild(card); 
    //FEATURED: if they are featured 1=true
    if(featureEM == true){
        var crown = document.createElement("p");
        crown.innerHTML= "&#128081;";
        crown.className = 'crown';
        card.appendChild(crown); 
    }
    //IMG
        imageEM = document.createElement("IMG");
        imageEM.setAttribute("src", images.url);
        imageEM.setAttribute("width", "100%");
        imageEM.className="images";
        imageEM.setAttribute("alt", "Employee Photo");
        card.appendChild(imageEM);

    //NAME
       var name = document.createElement("h4");
       name.textContent=firstname + " " +lastname;
       name.className = 'card-title';
       card.appendChild(name);  
    //BIO
        var description = document.createElement("p");
        description.textContent=bioEM;
        description.className = 'card-body';
        card.appendChild(description);  
    
    //ROLES
    // array housing arrays of roles
   
    for(j=0; j<=rolesEM.length-1; j++){
        
        rolenames=rolesEM[j].rolename;//Role names
        rolecolor=rolesEM[j].rolecolor;//Role colors
        console.log(rolenames);
        console.log(rolecolor);

    
        var rolesbutton=document.createElement("span");
        rolesbutton.className= "badge";
        rolesbutton.textContent=rolenames;
        rolesbutton.style.backgroundColor = rolecolor;
        card.appendChild(rolesbutton)

    }
    
    }
}