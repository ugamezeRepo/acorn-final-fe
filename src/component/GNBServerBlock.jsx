import PropTypes from 'prop-types';


const GNBServerBlock = (props) => {
    return (<>
        {props.url}
    </>)
}


GNBServerBlock.defaultProps = {
    url: 'https://www.google.com'
}

GNBServerBlock.propTypes = {
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default GNBServerBlock;