import React,{ useState} from 'react'
import { Three } from "./Three"

export class Header extends React.Component{

    render=()=> {
      const {about, state} = this.props
      return <header>
    <div className="namecont">
      <div className="name">M.</div>
      {/* <div className="threed" ref={this.mountRef}></div> */}
      <Three></Three>
    </div>
    <nav>
      <ul>
           <li onClick={about} className={state.isactie.left ? 'liactive' :''}>
              <div className="licont"  aria-label='/about me'>
                 /about me
              </div>
           </li>
           <li onClick={()=>about('link')} className={state.isactie.right ? 'liactive' : ''}>
              <div className="licont" aria-label='/contact'>/contact</div>
           </li >
      </ul>
    </nav>
    <div className="behance">
      <a target='_blank' href="https://www.behance.net/megsoft" className={`link ${state.iscontact && 'showcontact'}`}>me on Behance</a>
      <a className={`email ${state.iscontact && 'showcontact'}`} href='mailto:megsoft007@gmail.com'>megsoft007@gmail.com</a>
    </div>
    <div className={`aboutcont ${state.isabout && 'showabout'}`}
           > I'm <i>Meg</i>.
            I do frontend and keep growing my skills. Besides that, I enjoy web design{'\u00A0'}—{'\u00A0'}
            I spend time exploring projects by other designers and developers 
            to learn and get inspired by their work. I also like creating 
            logos and plan to share my designs on <i style={{}}>Behance</i>.{'\u00A0'}
            <br />
            {<br/>}
            I'm open to opportunities to collaborate on your projects.
           </div>
  </header>
  }
  }
  