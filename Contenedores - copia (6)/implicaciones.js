      class Contenedor extends Array{
        constructor(v,x,y,s,n,a){
          super()
          this.valor=v
          this.color='black'
          this.superior=s
          this.anteriror=a
          this.nombre=n
          this.inicio='['
          this.intermedio=',' 
          this.fin=']'
          this.rectangulo=[x,y,0, 2*FONT_SIZE]
          this.recalculaAncho()
          //this.inicio_ancho=context.measureText( this.inicio).width//+MARGEN*2
          //this.intermedio_ancho=context.measureText( this.intermedio).width//+MARGEN*2 
          //this.fin_ancho=context.measureText(this.fin).width//+MARGEN*2
          //this.valor_ancho=context.measureText(this.valor).width
          //let ancho=this.valor_ancho+MARGEN*2+this.inicio_ancho+ this.fin_ancho      
          //console.log('Contenedor',v,ancho,this.valor_ancho,MARGEN*2,this.inicio_ancho, this.fin_ancho)      
          this.imp_val=true
          this.imp_ini=true
          this.imp_fin=true
          this.imp_array=true
        }
        recalculaAncho(){
          this.inicio_ancho=context.measureText( this.inicio).width//+MARGEN*2
          this.intermedio_ancho=context.measureText( this.intermedio).width//+MARGEN*2 
          this.fin_ancho=context.measureText(this.fin).width//+MARGEN*2
          this.valor_ancho=context.measureText(this.valor).width
          let ancho=this.valor_ancho+MARGEN*2+this.inicio_ancho+ this.fin_ancho      
          console.log('Contenedor',this.valor,ancho,this.valor_ancho,MARGEN*2,this.inicio_ancho, this.fin_ancho)      
          this.rectangulo[2]=ancho
        }
        esSinArray(){
          this.inicio=''
          this.intermedio='' 
          this.fin=''
          this.recalculaAncho()
        }
        
        esinterior(x,y){
          let x1=x-this.rectangulo[0]
          let y1=y-this.rectangulo[1]
          return (0<x1)&&(x1<this.rectangulo[2])&&(0<y1)&&(y1<this.rectangulo[3])
          
        }
        arrima(e){
          if (this instanceof Contenedor && this != e) 
          {
            this.push(e)
            elementos.splice(elementos.indexOf(e),1)
            if(this.length==1)e.rectangulo[0]= this.rectangulo[2]-this.fin_ancho
            else e.rectangulo[0]= this.rectangulo[2]-this.fin_ancho+this.intermedio_ancho+MARGEN
            e.rectangulo[1]=MARGEN
            this.rectangulo[2]=e.rectangulo[0]+e.rectangulo[2]+this.fin_ancho+MARGEN//this.rectangulo[2]+e.rectangulo[2]
            this.rectangulo[3]=Math.max(this.rectangulo[3],e.rectangulo[3]+2*MARGEN)
            e.superior=this
          }
        }
        
        
        imprimirse(context,x,y)
        { 
          context.strokeStyle=this.color
            let anterior_x=x+this.rectangulo[0]+MARGEN  
            let anterior_y= y+this.rectangulo[1] 
            if (this.imp_val==true){
              context.strokeText(this.valor,anterior_x,anterior_y);
              anterior_x=this.valor_ancho+anterior_x;
            }
            if (this.imp_ini==true){
              context.strokeText(this.inicio,anterior_x,anterior_y) 
              anterior_x=anterior_x+this.inicio_ancho   
            }
            if (this.imp_array==true){              
              for (let i=0;i<this.length;i++){
                let siguiente_x=this[i].rectangulo[0]//+this[0].rectangulo[2]//anterior_x+this.inicio_ancho     
                let siguiente_y=this[i].rectangulo[1]//+this[0].rectangulo[3]//anterior_x+this.inicio_ancho     
                if (i!=0)context.strokeText(this.intermedio,x+this.rectangulo[0]+anterior_x+MARGEN,y+this.rectangulo[1])  
                anterior_x=siguiente_x+this[i].rectangulo[2]//anterior_x+this.inicio_ancho     
                anterior_y=siguiente_y+this[i].rectangulo[3]//anterior_x+this.inicio_ancho     
                this[i].imprimirse(context,x+this.rectangulo[0],y+this.rectangulo[1])
              }
            }
            if (this.imp_fin==true){
            context.strokeText(this.fin,x+this.rectangulo[0]+this.rectangulo[2]-this.fin_ancho,y+this.rectangulo[1])
            }        
          context.strokeRect(this.rectangulo[0]+x,this.rectangulo[1]+y,this.rectangulo[2],this.rectangulo[3])
        }
        posAbs(){
          let x=this.rectangulo[0]
          let y=this.rectangulo[1]
          let sup=this.superior
          while(!(sup instanceof Array)){
            x+=sup.rectangulo[0]
            y+=sup.rectangulo[1]
            sup=sup.suprior
          }
          //if MODO!='touch'{
          return {clientX:x, clientY:y}

        }
        
        posInt(){
          return {clientX:this.rectangulo[0]+1, clientY:this.rectangulo[1]+1}        
        }
             
      }





class Expresion extends Contenedor{}
class TerminalTx extends Expresion{
  constructor(v,x,y,s,n,a){
    super(v,x,y,s,n,a)
    this.esSinArray()
  }
}
class Variable extends TerminalTx{}
class Doble extends TerminalTx {}
class Natural extends Doble {}
class Digito extends Natural{}

class TerminalNoExp extends Contenedor{
  constructor(v,x,y,s,n,a){
    super(v,x,y,s,n,a)
    this.esSinArray()
  }
}
class Espacio extends TerminalNoExp{}
class Simbolo extends TerminalNoExp{}
class Menos extends Simbolo{}
class Mas extends Simbolo{}
class Por extends Simbolo{}
class Sobre extends Simbolo{}
class ParentesisAbierto extends Simbolo{}
class ParentesisCerrado extends Simbolo{}
class Igual extends Simbolo{}

class Unaria extends Expresion{
  constructor(v,x,y,s,n,a){
    super(v,x,y,s,n,a)
    this.esSinArray()
  }
}
class Inverso extends Unaria {}

class eNearia extends Expresion{}
class Ecuacion extends eNearia {}
class Parentesis extends eNearia {}
class Multiplicacion extends eNearia {}
class Suma extends eNearia {}
class Fraccion extends eNearia{}
class Opuesto extends Fraccion {}

class Borde extends Contenedor {
  constructor(v,x,y,s,n,a){
    super(v,x,y,s,n,a)
    this.esSinArray()
  }
}


clases={Expresion,Simbolo,Unaria,eNearia,TerminalTx,Digito,Espacio,Menos,Mas,Por,Sobre,ParentesisAbierto,ParentesisCerrado,Igual,Variable,Natural,Parentesis,Multiplicacion,Inverso,Suma,Ecuacion,Opuesto,Borde}


let caracteres ={ 
  ' ' : Espacio, 
  '0' : Digito, 
  '1' : Digito, 
  '2' : Digito, 
  '3' : Digito, 
  '4' : Digito, 
  '5' : Digito, 
  '6' : Digito, 
  '7' : Digito, 
  '8' : Digito, 
  '9' : Digito, 
  '+' : Mas, 
  '-' : Menos, 
  '*' : Por, 
  '/' : Sobre, 
  '(' : ParentesisAbierto, 
  ')' : ParentesisCerrado, 
  '=' : Igual, 
  'x' : Variable,
  'y' : Variable,
  'z' : Variable,
}

Implicaciones=[
{
nombre:'Im_Natural',
valor:[
  ['Digito','Digito',(d1,d2,s)=>s.nuevo=[new Natural(Number(d1.caracter+d2.caracter),s,null,'0DD'+ci)]],
  ['Natural','Digito',(n,d,s)=>{n.valor=n.valor*10+Number(d.caracter);s.nuevo= [n]}],
  ['Object','Digito',(o,d,s)=>s.nuevo=[o,new Natural(Number(d.caracter),s,null,'0OD'+ci)]],
]},
{nombre:'Im_Parentesis',
valor:[
  ['Object','Digito',()=>{debugger;}],
  ['ParentesisAbierto','ParentesisAbierto',(pa1,pa2,s)=>{pa2.superior=pa1;s.nuevo= [pa1,pa2]}] ,
  ['ParentesisAbierto','ParentesisCerrado',(pa,pc,s)=> pa.superior.nuevo=[new Parentesis(pa.objetos,pa.superior,null,'1PaPc'+ci)]],
  ['ParentesisAbierto','Object',(pa,o,s)=>{pa.objetos.push(o);s.nuevo=[pa]}] ,
  ['Object','ParentesisAbierto',(o,pa,s)=>{pa.superior=s;s.nuevo=[o,pa]} ],
]}]
