import React,{ useState} from 'react'
import './App.css'
// Written as a class component specifically for a portfolio
// написано классовым для портфолио 
class Cont extends React.Component{
  constructor(){
    super()
    this.state = {isabout: false, iscontact: false, offset: false}
  }

  hide = () => {
    if(this.state.isabout || this.state.iscontact){
      this.setState(_=>({iscontact: false ,isabout: false, offset: false}))
    }
  }


  about = (target) => {
    if (target != 'link'){
      this.setState(prev=>({iscontact: false ,isabout: !prev.isabout, offset: !prev.offset}))
    } else {
      this.setState(prev=>({isabout: false ,iscontact: !prev.iscontact, offset: false }))
    }
  }

  render=()=><div className='cont'>
    <div className="hidetext" onClick={this.hide}></div>
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
                <div className="licont" aria-label='contact'>contact</div>
             </li >
        </ul>
      </nav>
      <div className="behance">
        <a target='_blank' href="https://www.behance.net/megsoft" className={`link ${this.state.iscontact && 'showcontact'}`}>me on Behance</a>
        <a className={`email ${this.state.iscontact && 'showcontact'}`} href='mailto:megsoft007@gmail.com'>megsoft007@gmail.com</a>
      </div>
      <div className={`aboutcont ${this.state.isabout && 'showabout'}`}
              //  onMouseLeave={this.state.isabout && this.about}
             > I'm Meg.
              I'm learning front-end development. Besides that, I enjoy web design{'\u00A0'}—{'\u00A0'}
              I spend time exploring projects by other designers and developers 
              to learn and get inspired by their work. I also like creating 
              logos and plan to share my designs on Behance.{'\u00A0'}
              <br />
              I'm open to opportunities to collaborate on your projects.
               {/* I'm studying frontend development and being interested in web design.{'\u00A0'}
               <br/>
               Sometimes I spend time searching for cool works by other{'\u00A0'}
               developers and designers to get inspiration.{'\u00A0'} 
               { window.innerWidth<550?'' : <br />}
               I also come up with logos. */}
             </div>
    </header>
    <div className="violet"></div>
    <div className={`workcont ${this.state.offset?'abouton':''}`}>
      <div className="work"></div>
    </div>
    <div className="titlecont">
      <div className="texttitle description">*latest work</div>
      <a className="texttitle title" href='https://www.behance.net/gallery/237686227/latest-project' target='_blank'>eva digital</a>
    </div>

    <div className="mockupcont">
      <div className="mockuptext">mockup</div>
      <div className="mockup"></div>
      <div className="copy copymob">2025© Meg. All rights reserved.</div>
    </div>
    <div className="copy">2025© Meg. All rights reserved.</div>

  </div>
}

function App() {
  return (
    <div className="App">
      <Cont></Cont>
      {/* <div className="copy copymob">2025© Meg. All rights reserved.</div> */}
    </div>
  )
}

export default App
