      let estampilla=0
      const MARGEN=3
      let elementos=[]
      let elem_seleccionado=null
      let mensajeTemporal='Vacío'
      let canvas = document.getElementById('canvas');
      let context = canvas.getContext('2d');
      const FONT_SIZE = 18//'18pt Calibri';
      const FONT_TYPE = 'Calibri';
      context.font = ''+FONT_SIZE +'pt '+FONT_TYPE;
      context.fillStyle = 'black';
      context.textBaseline='top'
      const MODO = 'mouse' //'touch' 
      const PASOS=10;
      let mspf=PASOS*1//velocidad




      
      function imprimirTodo() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText(mensajeTemporal, 10, 25);
        context.strokeRect(0,0,canvas.width,canvas.height-1)
        for (let i in elementos){
          elementos[i].imprimirse(context,0,0)
        }
      }
      
      function xy(evt){
        let rect = canvas.getBoundingClientRect()
        if (evt instanceof TouchEvent) return [evt.changedTouches[0].clientX - rect.left,evt.changedTouches[0].clientY - rect.top]
        else return [evt.clientX - rect.left,evt.clientY - rect.top]
      }

      function posEv(pos){
        let rect = canvas.getBoundingClientRect()
        console.log('posEv',rect.left,rect.top)
        return{clientX:pos.clientX+rect.left,clientY:pos.clientY+ rect.top}
      }

     canvas.addEventListener((MODO=='mouse')?'mousedown':'touchend',mouse_oprimiendo, false);
      //canvas.addEventListener('touchend', mouse_oprimiendo, false);
      //canvas.addEventListener('mousedown', mouse_oprimiendo, false);
      
      function mouse_oprimiendo(evt) {
        //console.log('mouse_oprimiendo',evt)
        estampilla++
        let punto=xy(evt)
        let x=punto[0]
        let y=punto[1]
        elem_seleccionado=elementos.find((e)=>e.esinterior(x,y))
        if (elem_seleccionado==null){
          e=new Contenedor(estampilla,x,y,elementos,''+estampilla,null)//[x-MARGEN,y-MARGEN,2*MARGEN,2*MARGEN])
          elementos.push(e)
          elem_seleccionado=e
        }
        //else if (evt.shiftKey!=true){
        //  let ele2=new 
        //}
        imprimirTodo();
      }

      canvas.addEventListener((MODO=='mouse')?'mousemove':'touchmove',mouse_moviendose, false);
      //canvas.addEventListener('mousemove',mouse_moviendose , false);
      //canvas.addEventListener('touchmove',mouse_moviendose , false);
      
      function mouse_moviendose(evt) {
        let punto=xy(evt)
        let x=punto[0]
        let y=punto[1]
        let ele=elementos.find((e)=>e.esinterior(x,y))
        console.log('mouse_moviendose1',ele)
        if (ele!=null)ele.color='red'
        mensajeTemporal = 'Mouse position2: ' + x + ',' + y+ele;//(ele==undefined)?'Elemento':
        if (elem_seleccionado!=null){
          elem_seleccionado.rectangulo[0]=x//+elem_seleccionado_dx
          elem_seleccionado.rectangulo[1]=y//+elem_seleccionado_dy
        }
        imprimirTodo();
        if (ele!=null)ele.color='black'
        
      }
      
      

      canvas.addEventListener((MODO=='mouse')?'mouseup':'touchstart',mouse_soltando, false);
      //canvas.addEventListener('touchstart',mouse_soltando, false);
      //canvas.addEventListener('mouseup',mouse_soltando, false);
      //canvas.addEventListener('mouseleave',mouse_soltando, false);
      
      function mouse_soltando(evt) {
        if (elem_seleccionado!=null){
        let punto=xy(evt)
        let x=punto[0]
        let y=punto[1]
        console.log('mouse_soltando',evt,x,y)
          let elem2=elementos.find((e)=>e.esinterior(x,y))
          if (elem2!=undefined) elem2.arrima(elem_seleccionado)
        }
        elem_seleccionado=null
      }

 


Cont_niv=document.getElementById("Niveles")
for (let i in Implicaciones){
  let boton=document.createElement('button');
  boton.innerHTML+=Implicaciones[i]['nombre'];
  boton.onclick= function (){actrualiza_implicaciones(i)}
  Cont_niv.appendChild(boton)
}

Cont_imp=document.getElementById("Implicaciones")
actrualiza_implicaciones=function(nivel){
  Cont_imp.textContent=''
  let Impl=Implicaciones[nivel]['valor']
  for (let i in Impl){
    let boton=document.createElement('button');
    boton.innerHTML+=''+Impl[i];
    Cont_imp.appendChild(boton)
  }
}


      function frame2(){
        //console.log('frame2',animacion)
        if(animacion.length==0){clearInterval(id);return}
        animacion[0]()
        imprimirTodo()
      }

        function mover_animado(origen,destino){// genera una funcion que se ejecuta cada frame
          //let origen=objeto.posAbs()
          let dx=(destino.clientX-origen.clientX)/PASOS
          let dy=(destino.clientY-origen.clientY)/PASOS
          let paso=1
          animacion.push(()=>{canvas.dispatchEvent(new MouseEvent("mousedown", posEv(origen)));animacion.shift()})
          animacion.push(()=>{
            canvas.dispatchEvent(new MouseEvent("mousemove", posEv({clientX:origen.clientX+dx*paso, clientY:origen.clientY+dy*paso})));
           if (paso>=PASOS)animacion.shift() ;
           paso+=1;
           })
          animacion.push(()=>{canvas.dispatchEvent(new MouseEvent("mouseup", posEv(destino)));animacion.shift()})
          console.log('mover_animado',posEv(origen), posEv({clientX:origen.clientX+dx*paso, clientY:origen.clientY+dy*paso}), posEv(destino),origen,destino)
          
        }



imprimirTodo()

let animacion=[]
animacion.push(()=>{elementos.push(new Contenedor('',200,50,elementos,'noventa',null));animacion.shift()})
animacion.push(()=>{elementos.push(new caracteres[2](80,200,0,elementos,'ochenta',null));animacion.shift()})
mover_animado({clientX:201, clientY:1},{clientX:201, clientY:51})
{
let cont_0=new Contenedor('',100,100,elementos,'Cont_0',null)
animacion.push(()=>{elementos.push(cont_0);animacion.shift()})
      {
        for(let i in caracteres){
          let car=new caracteres[i](i,0,0,elementos,i,null)
          elementos.push(car)
          console.log('anim',car.posInt(),cont_0.posInt())
          mover_animado(car.posInt(),cont_0.posInt())
        }
      }
}



let id=setInterval(frame2,mspf);

