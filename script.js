 var users = []  ;
 var curruser ;

 function loadJSON(callback,filename) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', filename, false) ;
    
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function getusers ( filename ) {

  
    loadJSON(function(response,filename) {
        // Parsing JSON string into object
       
           users = JSON.parse(response);
         
       },filename);

       

}

function finduser() {

    var tz = document.getElementById('uname').value ;
    var pass = document.getElementById( 'psw').value ;
        
    for ( var i = 0 ;i < users.length ; i++ ) {

        
        if ( users[i].usertz  === tz   &&  users[i].pass ===  pass ) {

             return tz ; 
        }

    }

    return "" ;   

}

function chkvalidity() {

    var isvalid = false ; 

    usertz =  finduser() ;

    isvalid = (usertz.length  > 0 )  ;
        
    return isvalid ;

} 

 function checkuser ()  {
       
     
    getusers("data\\users.json") ;
  
    if (chkvalidity())
     { window.open("main/main.html"); } 
    else {

        swal({
             
            text: "משתמש לא קיים / סיסמא לא נכונה" ,
            icon: "error" , 
            button: {
                text: "סגור",
              },
              
          });
           

    } ;

 }

 function rememverMy () {
  
        localStorage.removeItem('Name');
        localStorage.removeItem('RememberMe');
          
        if(document.getElementById("remember").checked){
            localStorage.Name =  document.getElementById('uname').value ;
            localStorage.RememberMe  =  "yes" ;
        }
 } 

 function getRemeber() {

    if ( localStorage.RememberMe ) {

            
        document.getElementById('uname').value = localStorage.Name ; 

        if  (localStorage.RememberMe)  {

            document.getElementById("remember").checked = true ; 
        }
    }
  
 }

 function checkdigit()
 {
      var isvalid = false  ; 

      var x = document.getElementById("uname").value;

      isvalid = !isNaN(x)  && x< 1000000000 ; 

      if  ( !isvalid  ) { 
        swal({
             
            text: "הכנס רק ספרות - עד 9 ספרות" ,
            icon: "warning" , 
            button: {
                text: "סגור",
              },
              
          });
          

        document.getElementById("uname").value = "" } ;

      return isvalid ;
 }