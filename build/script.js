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

function copyListContent(){
    var html = document.getElementById('pane-user-list').innerHTML; 
    document.getElementById('pane-user-star').innerHTML = html.replace(/toggleEmptyClass\(this,\'selected\'\)/g, "window.location = '#/user'"); 
}


function addMsgTag(div){
    var msg = document.getElementById('chatmsg');
    msg.value = div.innerText + ' ';
    mui.tabs.activate('pane-user-chat');
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
        window.location.href='#/users/star';
    });
    Path.map('#/users/star').to(function(){
        showPage('main');
        copyListContent();
        mui.tabs.activate('pane-user-star');
    });
    Path.map('#/users/list').to(function(){
        showPage('main');
        mui.tabs.activate('pane-user-list');
    });
 
    Path.map('#/user').to(function(){
        window.location.href='#/user/info';
    });
    Path.map('#/user/info').to(function(){
        showPage('user');
        mui.tabs.activate('pane-user-info');
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
