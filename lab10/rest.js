var request;
var objJSON;
var id_mongo;
const xhr = new XMLHttpRequest();
// http://localhost:4010/~1sieklinski/lab10/stud/
// http://pascal.fis.agh.edu.pl/~1sieklinski/lab10/stud/
// Lista rekordow w bazie
function _list() {    
   xhr.open("GET", "http://localhost:4010/~1sieklinski/lab10/stud/list", true);   
   xhr.responseType = 'json';
   xhr.addEventListener("load", e => {
      if (xhr.status == 200)    {
         //objJSON = JSON.parse(request.response);
         objJSON = xhr.response ;
         var txt = "";
         for ( var id in objJSON )  {
             txt +=  id+": {" ;
             for ( var prop in objJSON[id] ) {             
                 if ( prop !== 'id')
                   { txt += prop+":"+objJSON[id][prop]+",";  }
                 else
                   { txt += "id:" + objJSON[id][prop]+"," ; } 
             }
             txt +="}<br/>";
         }
         document.getElementById('data').innerHTML = '';
         document.getElementById('result').innerHTML = txt;
      }
   })
   xhr.send(null);
}

// Wstawianie rekordow do bazy
function _ins_form() {
   var form1 = "<form name='add'><table>" ;
   form1    += "<tr><td>fname</td><td><input type='text' name='fname' value='fname' ></input></td></tr>";
   form1    += "<tr><td>lname</td><td><input type='text' name='lname' value='lname' ></input></td></tr>";  
   form1    += "<tr><td>faculty</td><td><input type='text' name='faculty' value='faculty' ></input></td></tr>";
   form1    += "<tr><td>year</td><td><input type='text' name='year' value='year' ></input></td></tr>";
   form1    += "<tr><td></td><td><input type='button' value='wyslij' onclick='_insert(this.form)' ></input></td></tr>";
   form1    += "</table></form>";
   document.getElementById('data').innerHTML = form1;
   document.getElementById('result').innerHTML = ''; 
}
 
function _insert(form)  {
    var user = {};
    user.fname = form.fname.value;
    user.lname = form.lname.value;
    user.faculty = form.faculty.value;
    user.year = form.year.value;
    txt = JSON.stringify(user);
    xhr.open("POST", "http://localhost:4010/~1sieklinski/lab10/stud/save", true);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.addEventListener("load", e => {
       if ( xhr.status == 200 )    {
          document.getElementById('data').innerHTML = ''; 
          document.getElementById('result').innerHTML = JSON.stringify(xhr.response);
       }
    })   
    xhr.send(txt);
}
 
// Usuwanie rekordow z bazy danych
function _del_list() { 
    xhr.open("GET", "http://localhost:4010/~1sieklinski/lab10/stud/list", true);   
    xhr.responseType = 'json';  
    xhr.addEventListener("load", e => {
       if ( xhr.status == 200 ) { 
          // objJSON = JSON.parse(request.response);
          objJSON = xhr.response ;
          var txt = "<form name='data'><select name='del' size='10'>";
          for ( var id in objJSON ) {
              txt +=  "<option value="+id+" >"+id+": {" ;
              for ( var prop in objJSON[id] ) {             
                 if ( prop !== 'id')
                   { txt += prop+":"+objJSON[id][prop]+",";  }
                 else
                   { txt += "id:"+ objJSON[id][prop]+"," ;  }
              }     
              txt +="}</option>";
          }
          txt += "</select><br/><input type='button' value='usun' onclick='_delete(this.form)'/></form>";
          document.getElementById('data').innerHTML = txt;
          document.getElementById('result').innerHTML = ''; 
       }
    })
    xhr.send(null);
}
 
function _delete(form) {
   var rec = form.del.selectedIndex;
   var id = document.getElementsByTagName('option')[rec].value;
   var id_mongo = objJSON[id]['id'];     
   xhr.open("DELETE", "http://localhost:4010/~1sieklinski/lab10/stud/delete1/"+id_mongo, true);
   xhr.addEventListener( "load", e => {
      if (xhr.status  == 200 )    {
          document.getElementById('data').innerHTML = '';
          document.getElementById('result').innerHTML = JSON.stringify(xhr.response);
      }
   }) 
   xhr.send(null);
}
 
// Poprawa rekordow w bazie danych
function _upd_list() { 
       xhr.open("GET", "http://localhost:4010/~1sieklinski/lab10/stud/list", true);
       xhr.responseType = 'json';          
       xhr.addEventListener("load", e => {
         if ( xhr.status == 200 )    { 
           //objJSON = JSON.parse(request.response);
           objJSON = xhr.response ;
           var txt = "<form name='data'><select name='del' size='10'>";
           for ( var id in objJSON )  {
              txt +=  "<option value="+id+" >"+id+": {" ;
              for ( var prop in objJSON[id] ) {             
                 if ( prop !== 'id')
                   { txt += prop+":"+objJSON[id][prop]+",";  }
                 else
                   { txt += "id:" + objJSON[id][prop]+"," ;  }
              }    
              txt +="}</option>";
           }
           txt += "</select><br/><input type='button' value='popraw' onclick='_upd_form(this.form)'/></form>";
           document.getElementById('data').innerHTML = txt;
           document.getElementById('result').innerHTML = ''; 
          }
       })
 
       xhr.send(null);
  }
 
  function _upd_form(form) {
   var rec = form.del.selectedIndex;
   id_rec = document.getElementsByTagName('option')[rec].value;
   id_mongo = objJSON[id_rec]['id'];
   console.log(id_mongo); 
   var form1 = "<form name='add'><table>" ;
   form1    += "<tr><td>ident</td><td><input type='text' name='ident' value='"+objJSON[id_rec]['ident']+"' ></input></td></tr>";
   form1    += "<tr><td>fname</td><td><input type='text' name='fname' value='"+objJSON[id_rec]['fname']+"' ></input></td></tr>";
   form1    += "<tr><td>lname</td><td><input type='text' name='lname' value='"+objJSON[id_rec]['lname']+"' ></input></td></tr>";  
   form1    += "<tr><td>faculty</td><td><input type='text' name='faculty' value='"+objJSON[id_rec]['faculty']+"' ></input></td></tr>";
   form1    += "<tr><td>year</td><td><input type='text' name='year' value='"+objJSON[id_rec]['year']+"' ></input></td></tr>";
   form1    += "<tr><td></td><td><input type='button' value='wyslij' onclick='_update(this.form)' ></input></td></tr>";
   form1    += "</table></form>";
   document.getElementById('data').innerHTML = form1;
   document.getElementById('result').innerHTML = ''; 
}
 
function _update(form) {
   var user = {};
   user.fname = form.fname.value;
   user.lname = form.lname.value;
   user.faculty = form.faculty.value;
   user.year = form.year.value;
   txt = JSON.stringify(user);
   xhr.open("PUT", "http://localhost:4010/~1sieklinski/lab10/stud/update1/"+id_mongo, true);
   xhr.setRequestHeader('Content-Type', 'application/json')    
   xhr.addEventListener("load", e => {
        if ( xhr.status == 200 )    {
           document.getElementById('data').innerHTML = ''; 
           document.getElementById('result').innerHTML = JSON.stringify(xhr.response);
         }
   })
   xhr.send(txt);
}