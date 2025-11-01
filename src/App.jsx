import React,{ useState} from 'react'
import './App.css'
// Written as a class component specifically for a portfolio
// написано классовым для портфолио 
class Cont extends React.Component{
  constructor(){
    super()
    this.state = {isabout: false}
  }

  about = () => {
    this.setState(prev=>({isabout: !prev.isabout}))
  }

  render=()=><div className='cont'>
    <header>
      <div className="namecont">
        <a className="name" href='https://www.behance.net/b40cfe62' target='_blank'>M.</a>
      </div>
      <nav>
        <ul>
             <li onClick={this.about}>
                <div className="licont"  aria-label='about me'>
                   about me
                </div>
             </li>
             <li>
                <div className="licont" aria-label='contacts'>contacts</div>
             </li >
        </ul>
      </nav>
      <div className={`aboutcont ${this.state.isabout && 'showabout'}`}
              //  onMouseLeave={this.state.isabout && this.about}
             >
               I'm studying frontend development and being interested in web design.{'\u00A0'}
               <br/>
               Sometimes I spend time searching for cool works by other{'\u00A0'}
               developers and designers to get inspiration.{'\u00A0'} <br />
               I also come up with logos.
             </div>
    </header>
    <div className="violet"></div>
    <div className="workcont">
      <div className="work"></div>
    </div>
    <div className="titlecont">
      <div className="texttitle description">*latest work</div>
      <a className="texttitle title" href='https://www.behance.net/gallery/237686227/latest-project' target='_blank'>eva digital</a>
    </div>

  </div>
}

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
    </div>
  )
}

export default App
