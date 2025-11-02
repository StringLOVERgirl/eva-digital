import React,{ useState} from 'react'
import './App.css'
// Written as a class component specifically for a portfolio
// написано классовым для портфолио 
class Cont extends React.Component{
  constructor(){
    super()
    this.state = {isabout: false, iscontact: false}
  }

  about = (target) => {
    if (target != 'link'){
      this.setState(prev=>({iscontact: false ,isabout: !prev.isabout}))
    } else {
      this.setState(prev=>({isabout: false ,iscontact: !prev.iscontact}))
    }
  }

  render=()=><div className='cont'>
    <header>
      <div className="namecont">
        <div className="name">M.</div>
      </div>
      <nav>
        <ul>
             <li onClick={this.about}>
                <div className="licont"  aria-label='about me'>
                   about me
                </div>
             </li>
             <li onClick={()=>this.about('link')}>
                <div className="licont" aria-label='contacts'>contact</div>
             </li >
        </ul>
      </nav>
      <div className="behance">
        <a target='_blank' href="https://www.behance.net/b40cfe62" className={`link ${this.state.iscontact && 'showcontact'}`}>me on Behance</a>
        <a className={`email ${this.state.iscontact && 'showcontact'}`} href='mailto:megsoft007@gmail.com'>megsoft007@gmail.com</a>
      </div>
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
  return (
    <div className="App">
      <Cont></Cont>
    </div>
  )
}

export default App
