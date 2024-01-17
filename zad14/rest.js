var request;
var objJSON;
var id_mongo;
const xhr = new XMLHttpRequest();
// http://localhost:4010/~1sieklinski/zad12/stud/
// http://pascal.fis.agh.edu.pl/~1sieklinski/zad12/stud/
// Lista rekordow w bazie
function _list() {    
   xhr.open("GET", "http://pascal.fis.agh.edu.pl/~1sieklinski/zad12/stud/list", true);   
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
    form1    += "<tr><td>title</td><td><input type='text' name='title' value='title' ></input></td></tr>";
    form1    += "<tr><td>description</td><td><input type='text' name='description' value='description' ></input></td></tr>"; 
    form1    += "<tr><td>category</td><td><select name='category'><option value='fizyka'>fizyka</option><option value='chemia'>chemia</option><option value='matematyka'>matematyka</option><option value='informatyka'>informatyka</option></select></td></tr>";
    form1    += "<tr><td>state</td><td><select name='state'><option value='wysłane'>wysłane</option><option value='w trakcie realizacji'>w trakcie realizacji</option><option value='wykonane'>wykonane</option></select></td></tr>";
    form1    += "<tr><td></td><td><input type='button' value='wyslij' onclick='_insert(this.form)' ></input></td></tr>";
    form1    += "</table></form>";
    document.getElementById('data').innerHTML = form1;
    document.getElementById('result').innerHTML = ''; 
 }
 
function _insert(form)  {
    var user = {};
    user.title = form.title.value;
    user.description = form.description.value;
    user.category = form.category.value;
    user.state = form.state.value;
    txt = JSON.stringify(user);
    xhr.open("POST", "http://pascal.fis.agh.edu.pl/~1sieklinski/zad12/stud/save", true);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.addEventListener("load", e => {
       if ( xhr.status == 200 )    {
          document.getElementById('data').innerHTML = ''; 
          document.getElementById('result').innerHTML = JSON.stringify(xhr.response);
       }
    })   
    xhr.send(txt);
}
 
// Poprawa rekordow w bazie danych
function _upd_list() { 
       xhr.open("GET", "http://pascal.fis.agh.edu.pl/~1sieklinski/zad12/stud/list", true);
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
    form1    += "<tr><td>state</td><td><select name='state'><option value='wysłane'>wysłane</option><option value='w trakcie realizacji'>w trakcie realizacji</option><option value='wykonane'>wykonane</option></select></td></tr>";
    form1    += "<tr><td></td><td><input type='button' value='wyslij' onclick='_update(this.form)' ></input></td></tr>";
    form1    += "</table></form>";
    document.getElementById('data').innerHTML = form1;
    document.getElementById('result').innerHTML = ''; 
 }
 
function _update(form) {
   var user = {};
   user.state = form.state.value;
   txt = JSON.stringify(user);
   xhr.open("PUT", "http://pascal.fis.agh.edu.pl/~1sieklinski/zad12/stud/update1/"+id_mongo, true);
   xhr.setRequestHeader('Content-Type', 'application/json')    
   xhr.addEventListener("load", e => {
        if ( xhr.status == 200 )    {
           document.getElementById('data').innerHTML = ''; 
           document.getElementById('result').innerHTML = JSON.stringify(xhr.response);
         }
   })
   xhr.send(txt);
}

function _list_state() {    
    var stateSelect = document.createElement('select');
    stateSelect.id = 'stateSelect';
    ['wysłane', 'w trakcie realizacji', 'wykonane'].forEach(function(state) {
        var option = document.createElement('option');
        option.value = state;
        option.text = state;
        stateSelect.appendChild(option);
    });
    var submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.onclick = function() {
        var state = document.getElementById('stateSelect').value;
        xhr.open("GET", `http://pascal.fis.agh.edu.pl/~1sieklinski/zad12/stud/list?state=${state}`, true);   
        xhr.responseType = 'json';
        xhr.addEventListener("load", e => {
            if (xhr.status == 200)    {
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
    };
    document.getElementById('data').innerHTML = '';
    document.getElementById('data').appendChild(stateSelect);
    document.getElementById('data').appendChild(submitButton);
}

function _list_category() {    
    var categorySelect = document.createElement('select');
    categorySelect.id = 'categorySelect';
    ['matematyka', 'fizyka', 'informatyka'].forEach(function(category) {
        var option = document.createElement('option');
        option.value = category;
        option.text = category;
        categorySelect.appendChild(option);
    });
    var submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.onclick = function() {
        var category = document.getElementById('categorySelect').value;
        xhr.open("GET", `http://pascal.fis.agh.edu.pl/~1sieklinski/zad12/stud/list?category=${category}`, true);   
        xhr.responseType = 'json';
        xhr.addEventListener("load", e => {
            if (xhr.status == 200)    {
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
    };
    document.getElementById('data').innerHTML = '';
    document.getElementById('data').appendChild(categorySelect);
    document.getElementById('data').appendChild(submitButton);
}