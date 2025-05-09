import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

interface Props {
  isStudent: boolean;
  company: string;
  // route_start_stop_id: number;
  // route_end_stop_id: number;
  route_start_stop: string;
  route_end_stop: string;
  subtext: string;
  start_date: string;
  end_date: string;
}

export const NoCommuterTicketCard = () => {
  return (
    <div className="flex items-center justify-center bg-white rounded-[15px] cursor-pointer p-[20px] w-[296px] h-[167px] hover:bg-[#f9f9fa]">
      <p>{'使用可能な定期券はありません'}</p>
    </div>
  );
};

export const CommuterTicketCard = (props: Props) => {
  return (
    <div className="bg-white rounded-[15px] cursor-pointer p-[15px] w-[296px] h-[167px] hover:bg-[#f9f9fa] anim">
      <div className="flex flex-row ml-[5px]">
        <p className="font-bold">{props.isStudent ? '通学' : '通勤'}</p>
        <p className="font-medium">{'：'}</p>
        <p className="font-medium">{props.company}</p>
      </div>
      <div className="flex flex-row m-[10px] items-center justify-center">
        <p className="font-bold text-[24px] items-center justify-center">{props.route_start_stop}</p>
        <div className="flex flex-row items-center justify-center px-[4px]">
          <FaArrowLeft className="transform-[translateX(5px)]" size={'20px'} color={'#c7d2d5'} />
          <FaArrowRight className="transform-[translateX(-5px)]" size={'20px'} color={'#c7d2d5'} />
        </div>
        <p className="font-bold text-[24px] items-center justify-center">{props.route_end_stop}</p>
      </div>
      <p className="flex items-center justify-center text-[12px] font-medium">{props.subtext}</p>
      <div className="mt-[10px] flex flex-row items-center justify-center">
        <p className="text-[18px] font-light">{props.start_date}</p>
        <p className="text-[18px] font-light">{'-'}</p>
        <p className="text-[18px] font-light">{props.end_date}</p>
      </div>
    </div>
  );
};
