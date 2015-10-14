// JavaScript Document
function cssX(elem){//直接得到宽度
   if(elem.style.width){return elem.style.width;}    
   if(elem.currentStyle)return elem.currentStyle.width;    
   if(document.defaultView && document.defaultView.getComputedStyle)    
      {return document.defaultView.getComputedStyle(elem,"").getPropertyValue("width");}
}

function cssY(elem){//直接得到高度
   if(elem.style.height){return elem.style.height;}    
   if(elem.currentStyle)return elem.currentStyle.height;    
   if(document.defaultView && document.defaultView.getComputedStyle)    
      {return document.defaultView.getComputedStyle(elem,"").getPropertyValue("height");      }
} 

var resetCSS=function(elem,prop){    
    var old ={};
    for (var i in prop){ 
         old[i] =elem.style[i];    
         elem.style[i] = prop[i];    
     }    
    return old;    
}
     
var restoreCSS=function(elem,prop){    
    for (var i in prop)    
      {elem.style[i]=prop[i];}   
}    

function getWidth(elem){    
   if(elem.style.display!="none"){    
        return elem.offsetWidth || parseInt(cssX(elem));    
     }    
    var old = resetCSS(elem,{    
         display: '',    
         visibility: 'hidden',    
         position: 'absolute'   
     });
    var w = elem.clientWidth || parseInt(cssX(elem));    
     restoreCSS(elem,old);    
    return w;
}   
function getHeight(elem){    
   if(elem.style.display!="none"){    
        return elem.offsetWidth || parseInt(cssY(elem));    
     }    
    var old = resetCSS(elem,{    
         display: '',
         visibility: 'hidden',    
         position: 'absolute'
     });
    var w = elem.clientHeight || parseInt(cssY(elem));    
     restoreCSS(elem,old); 
    return w;
}
function autoimg(obj,width,height)
{
   if(obj==undefined)
   { //得到触发事件的元素
   var evt= window.event;
      var obj = evt.target||evt.srcElement;
}
width=width||getWidth(obj.parentElement); //若不指定宽度则得到其父元素的宽度
height=height||getHeight(obj.parentElement);

    myImage = new Image(); 
myImage.src = obj.src; 

if (myImage.width>0 && myImage.height>0) 
{ 
   var rate = 1; 
   if (myImage.width>width || myImage.height>height) 
   { 
    if (width/myImage.width<height/myImage.height) 
    { 
       rate = width/myImage.width; 
    } 
    else 
    { 
       rate = height/myImage.height; 
    } 
   
   } 
    obj.width = myImage.width*rate; 
    obj.height = myImage.height*rate; 
  
} 
}