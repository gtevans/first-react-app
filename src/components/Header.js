import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header = ({ title, onAddClick, showAdd }) => {
    const location = useLocation();

    return (
        <header className='header'>
            <h1 style={headingStyle}>{title}</h1>
            {location.pathname === '/' && (<Button backgroundColor={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAddClick} />)}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

const headingStyle = { color: 'red', backgroundColor: 'black' };

export default Header
