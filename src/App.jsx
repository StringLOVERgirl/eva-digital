import React,{ useState} from 'react'
import './App.css'
import threebg from './assets/actual-fullfilled.png'
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
    this.animation = null;
    this.size = 2.3
    this.scale = 5,
    this.prevwidth = window.innerWidth
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

  setsize = () => {
    if (Math.abs((window.innerWidth - this.prevwidth) < 50 ) && (window.innerWidth - this.prevwidth) != 0 ){
      this.prevwidth = window.innerWidth
      return
    }
    alert()
    let width = window.innerWidth / this.scale;
    let height = window.innerHeight / this.scale;
    let size 
    if(window.innerWidth<550){
       size = 2.5
       width = window.innerWidth / 3;
       height = window.innerHeight / 8;
    } else if (window.innerWidth>1350){
      size = 4
    }
      else {size=this.size}
    const aspect = width / height;

    this.camera.left = -size * aspect;
    this.camera.right = size * aspect;
    this.camera.top = size;
    this.camera.bottom = -size;
    this.camera.updateProjectionMatrix();
    // Обновляем рендерер
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  componentDidMount(){

    window.addEventListener('resize', this.setsize)
    
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    // const scale = 5
    // const width = window.innerWidth/this.scale;   // ← ШИРИНА!
    // const height = window.innerHeight/this.scale // ← ВЫСОТА!
    // const aspect = width/height
    // const size = 2

  console.log(FontLoader)

  this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(0,0,0,0, 0.1, 1000);
    this.camera.position.z = 5

    this.renderer = new THREE.WebGLRenderer({ 
      canvas: canvas,
      antialias: true,
      context: gl, // Ручной WebGL1
    });
    this.setsize()
    
    // this.renderer.setSize(width,height);
    this.mountRef.current.appendChild(this.renderer.domElement);


    // new THREE.TextureLoader().load(
    //   threebg,
    //   (texture) => {
    //     this.scene.background = texture;
    //   }
    // );

    // this.scene.add(new THREE.AmbientLight(0x404040));
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7);
  // this.scene.add(light);

  const loader = new FontLoader();
  loader.load(
    'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
    (font) => {
      const geometry = new TextGeometry('EVA*', {
        font: font,
        size: 1.5,
        height: 0.2, // вместо depth
        bevelEnabled: false,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        
      });
      geometry.center();

      geometry.computeBoundingBox();
// геометрия - набор точке3 мерном пространстве их которых состоят объекты
// Текстура — это изображение. Например, 512×512 пикселей.
// каждая точка - вершина 
//  у каждой вершины есть uv кооординаты
// U — горизонтальная координата (0…1) на картинке
// V — вертикальная координата (0…1) на картинке
// U = 0 → слева на картинке
// U = 1 → справа на картинке
// V = 0 → внизу
// V = 1 → вверху

// ounding Box — это прямоугольник, который «оборачивает» весь объект.
// Он знает минимальные и максимальные координаты по X, Y и Z.

// Часто центр объекта (например, текста) ставят в точку (0, 0, 0) для удобства
//  — это как нулевая точка на координатной плоскости.
// Простой пример: Представьте слово "Hello" в 3D. 
// Если весь текст занимает 10 единиц по ширине (скажем, от левого края буквы H до правого края O), то:
// Центр текста может быть в 0 по X.
// Тогда левая граница (minX) = -5 (5 единиц влево от центра).
// Правая граница (maxX) = +5 (5 единиц вправо от центра).
// Ширина = maxX - minX = 5 - (-5) = 10.

// Например, если у тебя текст «Hi», его bounding box может быть:
// minX = 0, maxX = 5
// minY = 0, maxY = 2
// Мы берём координаты углов ящика. Например:
// minX — самая левая точка текста.
// maxX — самая правая.
// minY — самая нижняя.
// maxY — самая верхняя.
// Зачем? Чтобы вычислить ширину (maxX - minX) и высоту (maxY - minY).
// Это нужно для нормализации в следующем шаге. 

// geometry.attributes — это коллекция данных о геометрии. uv — это атрибут, 
// хранящий UV-координаты для каждой вершины (точки) объекта.


    // пересчёт UV для растяжения текстуры по всей ширине текста
    const bbox = geometry.boundingBox;
    const maxX = bbox.max.x;
    const minX = bbox.min.x;
    const maxY = bbox.max.y;
    const minY = bbox.min.y;

    const uvAttribute = geometry.attributes.uv;
    // цикл проходи по каждой веришне
    for (let i = 0; i < uvAttribute.count; i++) {
      const x = geometry.attributes.position.getX(i);
      const y = geometry.attributes.position.getY(i);
      // берем координаты вершины в оригинальных значениях

      // далее приводим релаьны координаты в систему юв (от 0 до 1)
      const u = (x - minX) / (maxX - minX); // нормализуем X в 0..1
      const v = (y - minY) / (maxY - minY); // нормализуем Y в 0..1
      // Реальные координаты вершин (x) могут быть любыми числами, например, от -5 до +5 (как в примере 1 где 5 крайняя точка справа)
      // Вычитаем minX (чтобы сдвинуть к 0): Если minX = -5, а x вершины = -5 (левая точка), то (x - minX) = -5 - (-5) = 0. Теперь левая точка в 0!
      // далее делим на ширину 
      uvAttribute.setXY(i, u, v);
      // но пересчитывает для каждой веришины нет нкиакх букв только вершины
      // До кода (UV)После кода (UV)
      // H: 0→1H: 0→0.2e:  
      // e: 0→1e: 0.2→0.4l
      // l: 0→1l: - после 0.4→0.6
      // т е изначально к каждой букве относят некотрые веришны
      // и для вершин каждой буквы юи от 0 до 1 поэтому 
      // картинка дублируется просто а сама она накалдывается в диапазон от 0 до 1 
      //  но т к координаты вершин повторя/тся то картинка налкадывается по вершинам 
      // если вершина 1 то накалдывается край правый а след буква начинается точнее вершина ее
      // с 0 а это начало картинки ее конец 1 эт оконец кратинки и тд 
    }
    uvAttribute.needsUpdate = true;

      // const center = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      // geometry.translate(center, 0, 0);
      const bg = new THREE.TextureLoader().load(threebg)
      bg.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({
        // color: 'springgreen',
        // specular: 0x555555,
        // shininess: 30,
        transparent: true,
        // wireframe: true,
        map: bg
      });
      this.textMesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.textMesh);
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
  cancelAnimationFrame(this.animation)
  this.mountRef.current.removeChild(this.renderer.domElement);
  window.removeEventListener('resize', this.setsize)
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
              {window.innerWidth>550?<br/>:''}
              I'm open to opportunities to collaborate on your projects.
             </div>
    </header>
    <div className="violet"></div>
    <div className={`workcont ${this.state.offset?'abouton':''}`}>
      <div className="work"></div>
{/* 
      <div className="colorscont">
        <div className="color top">
          <div className="percent">15%</div>
          <div className="colorname redname">#fc202099</div>
        </div>
        <div className="color bottom">
           <div className="percent">85%</div>
           <div className="colorname violetname">#f1ebff</div>
        </div>
      </div> */}

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
      {/* <div className="copy copymob">2025© Meg. All rights reserved.</div> */}
    </div>
  )
}

export default App
