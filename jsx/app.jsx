class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.questions=[
      {"pregunta":"El caballo: Es la única pieza que puede saltar sobre cualquier otra",
      "respuesta":"verdadero",
      "src":"img/caballo.png"
      },
      {
        "pregunta":"La Torre puede jugar en columnas y filas",
        "respuesta":"verdadero",
        "src":"img/torre.png"
      },
      {
        "pregunta":"El tablero de ajedrez tiene 64 casillas",
        "respuesta":"verdadero",
        "src":"img/tablero.png"
      },
      {
        "pregunta":"En el Ajedrez hay tres Torres cuando se inicia el juego",
        "respuesta":"falso",
        "src":"img/torre.png"
      },{
        "pregunta":"El Peón puede avanzar uno o dos espacios hacia adelante en la primera jugada",
        "respuesta":"verdadero",
        "src":"img/peon.png"
      },{
        "pregunta":"En el inicio del juego cada jugador cuenta con 16 piezas",
        "respuesta":"verdadero",
        "src":"img/tablero.png"
      },{
        "pregunta":"Cuando el Rey está ahogado, el juego quedará declarado tablas",
        "respuesta":"verdadero",
        "src":"img/rey.png"
      },{
        "pregunta":"En el Ajedrez Gana el jugador que tenga más cantidad de piezas",
        "respuesta":"falso",
        "src":"img/rey.png"
      },{
        "pregunta":"El Alfil es la pieza que juega en columnas, filas y diagonales",
        "respuesta":"falso",
        "src":"img/alfil.png"
      },{
        "pregunta":"La Dama puede jugar en L y saltar por las demás piezas",
        "respuesta":"falso",
        "src":"img/dama.png"
      },{
        "pregunta":"El Peón al llegar al otro extremo del tablero corona y se puede cambiar por cualquiera de las piezas que están detrás de los Peones",
        "respuesta":"verdadero",
        "src":"img/peon.png"
      },{
        "pregunta":"El Mate Pastor es uno de los Jaque Mate más cortos",
        "respuesta":"verdadero",
        "src":"img/rey.png"
      },{
        "pregunta":"El juego de Ajedrez aumenta la concentración, memoria, creatividad y el razonamiento lógico",
        "respuesta":"verdadero",
        "src":"img/todo.png"
      },{
        "pregunta":"A la Reina se le dice Dama para no confundir los movimientos al anotar las jugadas  R3 o D3",
        "respuesta":"verdadero",
        "src":"img/dama.png"
      },{
        "pregunta":"Si cada jugador se queda con el Rey no se puede dar Mate",
        "respuesta":"verdadero",
        "src":"img/rey.png"
      },{
        "pregunta":"Ahogado es cuando al jugador que le toca jugar no tiene jugadas legales, y el Rey no se encuentra en Jaque",
        "respuesta":"verdadero",
        "src":"img/rey.png"
      }

    ];

    this.jugador=0;
    this.preguntas=[];
    this.state={
      tiempo:0,
      pregunta:1,
      puntos:0,
      bien:"Excelente",
      mal:"ohh no!",
      oportunidad:3, 
      pA:"",
      srcActual:"",
      tiempoGlobal:0,
      record:0, 
      puntosAcu:0,
    };
    this.cambiarEstado = this.cambiarEstado.bind(this);
  }
  preguntaActual=()=>{
    let al = Math.floor(Math.random() * this.questions.length);
    return al;
  }
  reiniciarJuego=()=>{
    localStorage.clear();
  };
  componentDidMount() {
    if(localStorage.length == 0){
      localStorage.setItem("jugador",JSON.stringify({
        "puntos":0,
        "tiempo":2000
      }));
    }
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    this.cargarPregunta();
    this.mostrarPartida();
  }  
  tick(){
    this.setState({
      tiempo: this.state.tiempo + 1,
      tiempoGlobal: this.state.tiempoGlobal + 1
    });
  }
  manSonido=()=>{
    // let audio = document.getElementById("audio");
    // audio.volume=0.1;
    // audio.play();
  };  
  almacenarPartida=()=>{ 
    // localStorage.setItem("puntos",this.state.puntos,"record",this.state.tiempoGlobal);
    //verfico si es mayor el puntaje y menor el tiempo
    let todo =localStorage.getItem("jugador");
    let obj = JSON.parse(todo);

    if((obj.tiempo > this.state.tiempoGlobal) && (obj.puntos < this.state.puntos)){
      localStorage.setItem("jugador",JSON.stringify({
        "puntos":this.state.puntos,
        "tiempo":this.state.tiempoGlobal
      }));
    }else{
      return false;
    }
  };
  mostrarPartida=()=>{
    let todo =localStorage.getItem("jugador");
    let obj = JSON.parse(todo);
    // console.log(obj.tiempo, obj.puntos);
    this.setState({record:obj.tiempo,puntosAcu:obj.puntos});
  };
  cambiarEstado(e){
   //carga el text del elemento anterior del input
    // if(e.target.previousSibling.value==this.questions[0].respuesta){
      if(e.target.value==this.questions[this.state.index].respuesta){
      this.setState({puntos:this.state.puntos + 10 / this.state.tiempo *100});
      clearInterval(this.timerID);
      this.setState({tiempo:0});
      this.componentDidMount();
      this.cargarPregunta();
      this.setState({
        pregunta:this.state.pregunta + 1
      });
    }else{
      this.setState({puntos:this.state.puntos - 5});
      clearInterval(this.timerID);
      this.setState({tiempo:0});
      this.componentDidMount();
      this.cargarPregunta();
      this.setState({
        pregunta:this.state.pregunta + 1
      });
    }
  }
  cargarPregunta=()=>{
    let index = this.preguntaActual();
    this.setState({index:index});
    this.setState({pA:this.questions[index].pregunta});
    this.setState({srcActual:this.questions[index].src});
    document.querySelector(".selector").innerHTML=`
    <option class="text-info" value="">Elige tu respuesta</option>
    <option class="text-success" value="verdadero">Verdadero</option>
    <option class="text-danger" value="falso">Falso</option>`;
  };
  render() {
    const nuevo = this.questions[0].pregunta;
    return (
      <>
      <h2 className="col-7 text-white" onLoad={this.manSonido}>Tiempo: {this.state.tiempo} segundos</h2>
      <h2 className="col-5 text-white">Puntos: {this.state.puntos}</h2>
      <div className="col-7">
        <div className="card imgIzquierda" style={{width: 18 + 'rem'}}>
          <img src={this.state.srcActual} alt="" width="300px"/>
        </div>
      </div> 
      <div className="col-5">
      <div className="card bg-light" style={{width: 22 + 'rem'}}>
        <div className="card-body">
          <h5 className="card-title text-center">Pregunta N {this.state.pregunta}</h5>
          <p className="card-text text-left">{this.state.pA}</p>
          <select className="text-center selector" onChange={this.cambiarEstado}>   
          </select>
        </div>
      </div>
    </div>
    <h2 className="col-7 text-white">Tiempo Global: {this.state.tiempoGlobal} segundos</h2>
    <p className=" col-5 text-white">Puntuación mayor : {this.state.puntosAcu}</p>
    <p className="text-white" onClick={this.almacenarPartida}>Tiempo Menor : {this.state.record}</p>
    </>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);