window.__EMMA_HD=[];
(function(){
  function loadEmma(){
    var img=document.getElementById('emma-feature-image');
    var card=document.getElementById('emma-card');
    if(!img||!card)return;
    var files=['emma-photo-1.txt','emma-photo-2.txt','emma-photo-3.txt','emma-photo-4.txt'];
    Promise.all(files.map(function(file){
      return fetch(file+'?v=20260829-1',{cache:'no-store'}).then(function(response){
        if(!response.ok)throw new Error('Unable to load '+file);
        return response.text();
      });
    })).then(function(parts){
      var b64=parts.join('').replace(/\s+/g,'');
      var binary=atob(b64);
      var bytes=new Uint8Array(binary.length);
      for(var i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
      var url=URL.createObjectURL(new Blob([bytes],{type:'image/jpeg'}));
      img.onload=function(){card.classList.add('image-ready');};
      img.onerror=function(){card.classList.remove('image-ready');};
      img.src=url;
    }).catch(function(error){console.error('Emma photo failed to load:',error);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadEmma);
  else loadEmma();
})();