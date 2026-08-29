(function(){
  function loadEmmaJpeg(){
    var img=document.getElementById('emma-feature-image');
    var card=document.getElementById('emma-card');
    if(!img||!card)return;
    Promise.all(['emma-photo-1.txt','emma-photo-2.txt','emma-photo-3.txt','emma-photo-4.txt'].map(function(p){
      return fetch(p+'?v=20260829-1',{cache:'no-store'}).then(function(r){
        if(!r.ok)throw new Error('Emma photo part failed: '+p);
        return r.text();
      });
    })).then(function(parts){
      var b64=parts.join('').replace(/\s+/g,'');
      var raw=atob(b64);
      var bytes=new Uint8Array(raw.length);
      for(var i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
      var blob=new Blob([bytes],{type:'image/jpeg'});
      var url=URL.createObjectURL(blob);
      img.onload=function(){card.classList.add('image-ready');};
      img.onerror=function(){card.classList.remove('image-ready');};
      img.src=url;
    }).catch(function(e){console.error(e);});
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){setTimeout(loadEmmaJpeg,100);},{once:true});
  }else{
    setTimeout(loadEmmaJpeg,100);
  }
})();
window.__EMMA_HD=[];