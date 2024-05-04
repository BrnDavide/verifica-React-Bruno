import {BallTriangle} from 'react-loading-icons';

const Loading = ()=>{
    return <div className="flex w-32 h-32 justify-center items-center">
        <span className='animated-spin'><BallTriangle /></span></div>
};
export default Loading;