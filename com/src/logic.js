function xhrRequest(url, fn){
    /*var xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            fn(eval('('+xhr.responseText+')'));
        }
    }
    xhr.send();*/

    if(url=='full_data.json'){ fn(full); }
    if(url=='S1234567A.json'){ fn(patient); }
}

function ele(name){
    return document.createElement(name);
}

function eleTxt(txt){
    var div = document.createElement('div');
    div.innerText = txt;

    return div;
}

function loadUserList(obj){
    var html = ele('div');
    
    for(i in obj['patients']){
        var patient = obj['patients'][i];
        var phtml = ele('div');
        
        phtml.className = 'person';
        if(!patient['selected']){
            continue;
        }

        phtml.setAttribute('onclick', 'window.location="#/user";');

        var details = document.createElement('div');
        details.className = 'details';
        
        var gender = patient['gender'].toUpperCase()[0];
        var temp = eleTxt(patient['name']+' ('+gender+')');
        temp.className = 'name';
        details.appendChild(temp);

        temp = eleTxt(patient['nric']);
        temp.className = 'nric';
        details.appendChild(temp);
        
        phtml.appendChild(details);
        
        if(patient['alert']){
            temp = document.createElement('i');
            temp.className = 'alert';
            temp.innerHTML = '&#xf071;';
            phtml.appendChild(temp);
        }
        
        html.appendChild(phtml);
    }
    
    $('pane-user-star').innerHTML = html.innerHTML;
}

function loadUser(obj){
    // Loading info
    var html = ele('div');
    
    for(key in obj['info']){
        var bigtemp = ele('div');
        bigtemp.className = 'detail hidden';
        
        var temp = eleTxt(key);
        temp.className = 'label';
        bigtemp.appendChild(temp);
        
        var temp = eleTxt(obj['info'][key]);
        temp.className = 'value';
        bigtemp.appendChild(temp);

        html.appendChild(bigtemp);
    }
    $('detailsContent').innerHTML = html.innerHTML;
    
    // upcoming visits
    html = ele('div');
    for(i in obj['visits']){
        var upcoming = obj['visits'][i];
        bigtemp = ele('div');
        bigtemp.className = 'upcoming';
        if(upcoming['state']){
            bigtemp.className += ' '+upcoming['state'];
        }

        temp = eleTxt(upcoming['date']+' ('+upcoming['time']+')');
        temp.className = 'time';
        bigtemp.appendChild(temp);

        temp = eleTxt(upcoming['place']);
        temp.className = 'location';
        bigtemp.appendChild(temp);

        html.appendChild(bigtemp);
    }
    $('upcomingsContent').innerHTML = html.innerHTML;

    //doctor
    html = ele('div');
    for(i in obj['doctors']){
        temp = eleTxt('@'+obj['doctors'][i]);
        temp.className = 'doctor';
        temp.setAttribute('onclick', "addMsgTag(this);");
        html.appendChild(temp);
    }
    $('doctors').innerHTML = html.innerHTML;
    
    chat = obj['chat']; 
    loadChat();

    docs = obj['docs'];
    loadDocs();
}

var chat = [];
var docs = [];

function loadChat(){
    var html = ele('div');
    var lastName = '';
    var nameTag = '@'+ownName.split(' ').join('');

    for(i in chat){
        var msg = chat[i];
        
        bigtemp = ele('div');
        bigtemp.setAttribute('onclick', "clrMsgTag(this,"+i+");");
        bigtemp.className = 'msg';
        if(msg['from']==ownName){
            bigtemp.className += ' self';
        }
        if(msg['text'].split(' ')[0]==nameTag){
            bigtemp.className += ' highlighted';
        }

        
        if(msg['from']!=lastName){
            temp = eleTxt(msg['from']);
            temp.className = 'name';
            bigtemp.appendChild(temp);

            lastName = msg['from'];
        }else{
            bigtemp.className += ' continued';
        }

        temp = eleTxt(msg['text']);
        temp.className = 'text';
        bigtemp.appendChild(temp);

        html.appendChild(bigtemp);
    }
 
    $('msgs').innerHTML = html.innerHTML;
    window.scrollTo(0,$('msgs').scrollHeight);
}

function addMsg(){
    var div = document.getElementById('chatmsg');
    
    if(div.value){ 
        chat.push({'from':ownName,'text':div.value});
        div.value = '';

        loadChat();
    } 
}

function clrMsgTag(div, id){
    var txt = div.getElementsByClassName('text')[0];
    var nameTag = '@'+ownName.split(' ').join('');

    if(txt.innerText.split(' ')[0]==nameTag){
        var res = '_'+txt.innerText.substring(1);
        txt.innerText = res; 
        chat[id]['text'] = res; 
        toggleEmptyClass(div, 'highlighted');
    }
}

function loadDocs(){
    var html = ele('div');
    
    for(d in docs){
        var doc = docs[d];

        var dhtml = ele('div');
        dhtml.className = 'doc';
        if(doc['edit']){
            dhtml.className += ' edit';
        }

        var bigtemp = ele('div');
        bigtemp.className = 'info';
        
        var temp = eleTxt(doc['name']);
        temp.className = 'name';
        bigtemp.appendChild(temp);

        temp = eleTxt(doc['date']);
        temp.className = 'date';
        bigtemp.appendChild(temp);

        dhtml.appendChild(bigtemp);

        var text = doc['text'].split('\n');
        var sub = '';
        for(i in text){
            if(text[i].length+sub.length > 140){
                sub += '...';
                break;
            }
            sub += text[i]+' ';
        }
        temp = eleTxt(sub);
        temp.className = 'text';
        dhtml.appendChild(temp);
        
        temp = ele('a');
        temp.setAttribute('href', '#/user/doc/'+d);
        temp.appendChild(dhtml);

        html.insertBefore(temp, html.firstChild);
    }
    $('docsContent').innerHTML = html.innerHTML;
}

function loadDoc(id){
    var doc = docs[id];
    if(!doc){
        window.location.href='#/user/docs';
    }
    var html = ele('div');

    var bigtemp = ele('div');
    bigtemp.className = 'info';
    
    var temp = eleTxt(doc['name']);
    temp.className = 'name';
    bigtemp.appendChild(temp);

    temp = eleTxt(doc['date']);
    temp.className = 'date';
    bigtemp.appendChild(temp);
    
    html.appendChild(bigtemp);

    if(!doc['edit']){
        temp = eleTxt(doc['text']);
        temp.className = 'text';
        html.appendChild(temp);
    }else{
        temp = ele('textarea');
        temp.innerHTML = doc['text'];
        temp.className = 'text';
        temp.id = 'docEdit';
        html.appendChild(temp);

        temp = ele('button');
        temp.innerText = 'Save';
        temp.setAttribute('onclick', 'saveDoc('+id+');');
        html.appendChild(temp);
    }

    $('docContent').innerHTML = html.innerHTML;
}

function saveDoc(id){
    if(id>=docs.length){
        alert('Unable to save documentation.');
        window.location.href = '#/user/docs';
    }

    docs[id]['text'] = $('docEdit').value;
    loadDocs();
    
    window.location.href='#/user/docs';
}
