import { ImEarth } from 'react-icons/im';
const icon = <ImEarth size={68} color="blue" />;
import '../../styles.css/loading.css'
const Loading = ({ text }) => {
    return (
        <div className="loader">
            <span className="loading">
                {icon}
            </span>
            <p>
                Please Wait while loading {text}, this should take a second.
            </p>
        </div>
    )
}

export default Loading