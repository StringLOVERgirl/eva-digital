import React,{ useState} from 'react'
import './App.css'
// import threebg from './assets/actual-fullfilled.png'
// import * as THREE from 'three'
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// Written as a class component specifically for a portfolio
// написано классовым для портфолио 
import { Header } from './components/Header'


class Cont extends React.Component{
  constructor(){
    super()
    this.state = {isabout: false, iscontact: false, offset: false, isactie: {left: false, right: false}}
  }

  hide = () => {
    if(this.state.isabout || this.state.iscontact){
      this.setState(prev=>({...prev,iscontact: false ,isabout: false, offset: false}))
    }
  }

  // createWebGL1Context = () => {
  //   const canvas = document.createElement('canvas');
  //   const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  // if (!gl) {
  //   alert('WebGL не поддерживается даже в режиме 1.0');
  // }
  // // return gl;
  // }

  componentDidMount(){
    console.log(`Written as a class component specifically for a portfolio - 
    написано классовым для портфолио. код-стайл и комменатрии написаны с приоритетом 
    для удобства в разработке и не являеются примером прдакшн кода`)
  }


  about = (target) => {
    const isabout = target != 'link'
    const isMobile = window.innerWidth < 550
    
      this.setState(prev=>({
        ...prev,
        iscontact: isabout? false :!prev.iscontact ,
        isabout: isabout? !prev.isabout : false, 
        offset: isabout?!prev.isabout:false}))

    if (isMobile){
      this.setState(prev=>({
        ...prev, 
        isactie: isabout ?  {left: true, right: false}  : {left: false, right: true} })) 
        setTimeout(()=>this.setState(prev=>({...prev, isactie: {left: false, right: false} })),300)
    } 
  }

  render=()=><div className='cont'>
    <div className="hidetext" onClick={this.hide}></div>
    
   <Header about={this.about} state={this.state}></Header>
    {/* <div className="leftdecor">*</div> */}
    {/* <div className="violet"></div> */}
    <div className="textcont">
      <div className="tx design">design</div>
      <div className="and">&</div>
      <div className="tx frontend">frontend</div>
    </div>
    <div className={`workcont ${this.state.offset?'abouton':''}`}>
      <div className="work"></div>


    </div>
    <div className="titlecont">
      <div className="texttitle description">*latest work</div>
      <a className="texttitle title" href='https://www.behance.net/gallery/237735677/latest-project' target='_blank'>eva digital</a>
    </div>

    <div className="mockupcont">
      <div className="mockuptext">mockup</div>
      <div className="mockup"></div>
      <div className="copy copymob">2025© Meg. All rights reserved.</div>
    </div>
    <div className="copy">2025© Meg. All rights reserved.</div>

  </div>
}
// нужно ли всега вызывать супер с пропс?
function App() {
  // конструткор нужен чтобы натсрйоить начльное состояние и свойства комопнента
  // перед рендерингом; выполняется ОДИН раз перед первым рендером
  // в нем нужно привязать контекст (bind) к методам
  // this в классовых комп - ссылка на экз класса
  // это объкт - в нем хранятся свойства стейт и метода
  // В классах методы — это обычные функции, не "прикреплённые" жёстко к объекту.
  // Когда метод передаётся как callback (например, в onClick), 
  // JavaScript вызывает его в другом контексте
  // в конструторе писать мтоды this.increment = this.increment.bind(this); 
  // может быть только один стейт
  // (можно не писать если метод стрелочный)
  // ...
  // increment() {
    // this.setState({ count: this.state.count + 1 }); // Теперь работает
  // }

  // жизненный цикл делится на 3 этапа 
  // монториваное - изменение - размонтирование

  // монитрование - конструтор - рнедер - componentDidMount()
  // componentDidMount() - после первогоодин раз рендера аналог юс эффект
  // пишится как обыная функция вызыается реатком сам

  // обновление
  // shouldComponentUpdate - аналог юс эффект с массивом зависимсотей 
  // реакт вызывает перед рендером только 
  // реашет нужен ли рендер при изменении данных
  // регуляция рендера через возрващаемое значени фнукцие - тру или фолс
  // возварт вручную через ретерн 
  // т е shouldComponentUpdate работвт как мемо но с дпо логикой для контроля?

  // размонтирование - componentWillUnmount - очистка подписок
  // componentWillUnmount(): Вызывается перед удалением.

  return (
    <div className="App">
      {/* <div className="outouforder" style={{height:'100vh', width: '100vw', position: 'absolute', zIndex: 3}}>currently developing</div> */}
      <Cont></Cont>
    </div>
  )
}

export default App
