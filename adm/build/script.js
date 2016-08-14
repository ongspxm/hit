function toggleEmptyClass(div, className){
    var classes = div.className.split(' ');
    var idx = classes.indexOf(className);
    
    if(idx<0){
        classes.push(className);
    }
    else{
        classes.splice(idx, 1);
    }
    
    div.className = classes.join(' ');

    return true;
}

function toggleDisplayClasses(className){
    var divs = document.getElementsByClassName(className);
    for(var i=0; i<divs.length; i++){
        toggleEmptyClass(divs[i], 'hidden');
    }

    return 0;
}

function toggleDisplayClasses_show(className){
    var divs = document.getElementsByClassName(className);
    for(var i=0; i<divs.length; i++){
        if(divs[i].className.indexOf('hidden') != -1){
            toggleEmptyClass(divs[i], 'hidden');
        }
    }

    return 0; 
}

function toggleDisplayClasses_hide(className){
    var divs = document.getElementsByClassName(className);
    for(var i=0; i<divs.length; i++){
        if(divs[i].className.indexOf('hidden') == -1){
            divs[i].className += ' hidden'; 
        }
    }

    return 0; 
}

function copyListContent(){
    return false;
}


function addMsgTag(div){
    var msg = document.getElementById('chatmsg');
    msg.value = div.innerText + ' ';
    window.location.href='#/user/chat'; 
}

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join('')
};

var docWritten = false;
function addMedDoc(){
    var d = (new Date()).yyyymmdd();
    $('medDate').innerText = d;
    $('medName').innerText = ownName;
    
    if(!docWritten){
        docs.push({
            'name':ownName,
            'date':d,
            'edit':true,
            'text':'Medical reconcilation done on Healthcare Coordinators App, on '+d+'.'
        });
        loadDocs();


        alert('Document recorded');
    }else{
        alert('Documentation already submitted.');
    }
    docWritten = true;
}

function addMseDoc(){
    var form = document.forms['mse'];
    var text = [];

    text.push('appearance');
    text.push('- '+form['appearances'].value);
    if(form['appearancesText'].value){
        text.push(form['appearancesText'].value);
    }
    text.push('');

    text.push('speech');
    text.push('- '+form['speech'].value);
    if(form['speechText'].value){
        text.push(form['speechText'].value);
    }
    text.push('');
 
    text.push('mood');
    text.push('- '+form['mood'].value);
    if(form['moodText'].value){
        text.push(form['moodText'].value);
    }
    text.push('');   
  
    text.push('thoughts');
    text.push('- '+form['thoughts'].value);
    if(form['thoughtsText'].value){
        text.push(form['thoughtsText'].value);
    }
    text.push('');

    text.push('suicide/agression');
    text.push('- '+form['aggression'].value);
    if(form['aggressionText'].value){
        text.push(form['aggressionText'].value);
    }
    text.push('');

    text.push('insight');
    text.push('- '+form['insight'].value);
    if(form['insightText'].value){
        text.push(form['insightText'].value);
    }

    form['appearances'].value = 'kempt'; 
    form['appearancesText'].value = '';
    form['speech'].value = 'normal'; 
    form['speechText'].value = '';
    form['mood'].value = 'normal'; 
    form['moodText'].value = '';
    form['thoughts'].value = 'normal'; 
    form['thoughtsText'].value = '';
    form['aggression'].value = 'absent'; 
    form['aggressionText'].value = '';
    form['insight'].value = 'none'; 
    form['insightText'].value = '';
   
    var d = (new Date()).yyyymmdd();
    docs.push({
        'name':ownName,
        'date':d,
        'edit':true,
        'text':'Mental state examination done on Healthcare Coordinators App, on '+d+'.\n\n'+text.join('\n')
    });
    loadDocs();
    
    window.location.href = '#/user/docs';
}

function addDoc(){
    var i = docs.length;
    docs.push({
        'name':ownName,
        'date':(new Date()).yyyymmdd(),
        'text':'Details of diagnosis',
        'edit':true
    });
    loadDocs();

    window.location.href='#/user/doc/'+i;
}

function clearAll(){
    var divs = document.getElementsByClassName('page');
    for(var i=0; i<divs.length; i++){
        divs[i].className = 'page hidden';
    }
}

function $(id){
    return document.getElementById(id);
}

function showPage(id){
    clearAll();
    $(id).className = 'page';
}

function defineRoutes(){
    Path.rescue(function(){showPage('login')});
    Path.map('#/login').to(function(){showPage('login');});
    Path.map('#/auth').to(function(){showPage('auth');});
    
    Path.map('#/users').to(function(){
        showPage('main');
    });
 
    Path.map('#/user').to(function(){
        window.location.href='#/user/info';
    });
    Path.map('#/user/info').to(function(){
        showPage('user');
        mui.tabs.activate('pane-user-info');
    });
    Path.map('#/user/exam').to(function(){
        showPage('user');
        mui.tabs.activate('pane-user-exam');
    });
    Path.map('#/user/docs').to(function(){
        showPage('user');
        mui.tabs.activate('pane-user-docs');
    });
    Path.map('#/user/meds').to(function(){
        showPage('user');
        mui.tabs.activate('pane-user-meds');
    });
    Path.map('#/user/chat').to(function(){
        showPage('user');
        loadChat();
        mui.tabs.activate('pane-user-chat');
    });
    //scroll to end of chat
    var div = document.querySelector('[data-mui-controls="pane-user-chat"]');
    div.addEventListener('mui.tabs.showend', function(){
        window.scrollTo(0,$('msgs').scrollHeight);
    });
    
    Path.map('#/user/doc/:id').to(function(){
        loadDoc(this.params['id']);
        showPage('doc');
    });

    Path.root('#/login');
    Path.listen();
}

window.onload = function(){
    xhrRequest('full_data.json', loadUserList); 
    xhrRequest('S1234567A.json', loadUser);
    defineRoutes();
};
