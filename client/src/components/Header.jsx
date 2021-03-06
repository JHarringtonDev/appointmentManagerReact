import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom"
import logo from '../images/default-monochrome-white.png'

const Header = (props) => {
    return(
        <header className="Header">
            <nav>
            <NavLink to="/" className="mainLogo">
            <img src={logo} alt="Logo" className='companyLogo'/>
            </NavLink>
                <ul className="navItems">
                    <li><NavLink to="/Queue" className="inactive" activeclassname="active" exact={true}>Appointment Queue</NavLink></li>
                    <li><NavLink to="/Dashboard" className="inactive" activeclassname="active" exact={true}>Employee Dashboard</NavLink></li>
                    <li><NavLink to="/CheckIn" className="inactive" activeclassname="active" exact={true}>Check-in</NavLink></li>
                    <li><NavLink to="/MakeAppointment" className="inactive" activeclassname="active" exact={true}>Make Appointment</NavLink></li>
                    
                </ul>
            </nav>
        </header>
    )
}

export default Header