import PropTypes from 'prop-types';


const SideChannelBlock = (props) => {
    return (<>
        {props.name}
    </>)
}


SideChannelBlock.defaultProps = {
    name: '채널 이름'
}

SideChannelBlock.propTypes = {
    name: PropTypes.string.isRequired,
}

export default SideChannelBlock;