import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({ title, onAdd, showAddTask }) => {
    return (
        <header className='header'>
            <h1>{ title }</h1>
            <Button color={ !showAddTask ? 'green' : 'red'} text={ !showAddTask ? 'Add' :'Close'} onClick={onAdd} />
        </header>

    )
}

Header.defaultProps = {
    title: 'Task app'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}
export default Header
