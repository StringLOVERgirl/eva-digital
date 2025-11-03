import React,{ useState} from 'react'
import './App.css'
import threebg from './assets/actual_scaled_fullfilled.png'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// Written as a class component specifically for a portfolio
// написано классовым для портфолио 
class Cont extends React.Component{
  constructor(){
    super()
    this.state = {isabout: false, iscontact: false, offset: false, isactie: {left: false, right: false}}
    this.mountRef = React.createRef();
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.textMesh = null;
    this.animation = null
  }

  hide = () => {
    if(this.state.isabout || this.state.iscontact){
      this.setState(prev=>({...prev,iscontact: false ,isabout: false, offset: false}))
    }
  }

  createWebGL1Context = () => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    alert('WebGL не поддерживается даже в режиме 1.0');
  }
  // return gl;
  }

  componentDidMount(){
    
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    const width = 200;   // ← ШИРИНА!
    const height = 200 // ← ВЫСОТА!

  console.log(FontLoader)

  this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1/1, 0.1, 1000);
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({ 
      canvas: canvas,
      antialias: true,
      context: gl, // Ручной WebGL1
    });
    this.renderer.setSize(width,height);
    this.mountRef.current.appendChild(this.renderer.domElement);


    new THREE.TextureLoader().load(
      threebg,
      (texture) => {
        this.scene.background = texture;
      }
    );

    this.scene.add(new THREE.AmbientLight(0x404040));
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7);
  this.scene.add(light);

  const loader = new FontLoader();
  loader.load(
    'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
    (font) => {
      console.log('FONT LOADED, creating text');
      const geometry = new TextGeometry('KEEP CALM', {
        font: font,
        size: 2,
        height: 0.5, // вместо depth
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        
      });

      geometry.computeBoundingBox();
      const center = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(center, 0, 0);

      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x555555,
        shininess: 30,
      });

      this.textMesh = new THREE.Mesh(geometry, material);
      // this.scene.add(this.textMesh);
    }
  );

  this.animate = () => {
    this.animation = requestAnimationFrame(this.animate);
    if (this.textMesh) this.textMesh.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  };
  this.animate();
  
}

componentWillUnmount(){
  
  this.mountRef.current.removeChild(this.renderer.domElement);
cancelAnimationFrame(this.animation)
this.textMesh = null
this.renderer = null
this.scene=null
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
    <header>
      <div className="namecont">
        <div className="name">M.</div>
        <div className="threed" ref={this.mountRef}></div>
      </div>
      <nav>
        <ul>
             <li onClick={this.about} className={this.state.isactie.left ? 'liactive' :''}>
                <div className="licont"  aria-label='/about me'>
                   /about me
                </div>
             </li>
             <li onClick={()=>this.about('link')} className={this.state.isactie.right ? 'liactive' : ''}>
                <div className="licont" aria-label='/contact'>/contact</div>
             </li >
        </ul>
      </nav>
      <div className="behance">
        <a target='_blank' href="https://www.behance.net/megsoft" className={`link ${this.state.iscontact && 'showcontact'}`}>me on Behance</a>
        <a className={`email ${this.state.iscontact && 'showcontact'}`} href='mailto:megsoft007@gmail.com'>megsoft007@gmail.com</a>
      </div>
      <div className={`aboutcont ${this.state.isabout && 'showabout'}`}
             > I'm Meg.
              I'm learning front-end development. Besides that, I enjoy web design{'\u00A0'}—{'\u00A0'}
              I spend time exploring projects by other designers and developers 
              to learn and get inspired by their work. I also like creating 
              logos and plan to share my designs on Behance.{'\u00A0'}
              <br />
              {window.innerWidth>550?<br/>:0}
              I'm open to opportunities to collaborate on your projects.
             </div>
    </header>
    <div className="violet"></div>
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
      <Cont></Cont>
      {/* <div className="copy copymob">2025© Meg. All rights reserved.</div> */}
    </div>
  )
}

export default App
