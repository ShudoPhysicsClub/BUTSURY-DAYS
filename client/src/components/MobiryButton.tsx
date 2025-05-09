import { FaArrowRight } from 'react-icons/fa';

interface Props {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const MobiryButton = (props: Props) => {
  return (
    <div className="mobiry-button flex flex-row items-center justify-center relative" onClick={props.onClick}>
      <p className='font-medium'>{props.text}</p>
      <div className="absolute right-[6px] bg-white rounded-[50%] min-w-[28px] min-h-[28px] flex items-center justify-center">
        <FaArrowRight size={'15px'} color="#219bce" />
      </div>
    </div>
  );
};

export default MobiryButton;
