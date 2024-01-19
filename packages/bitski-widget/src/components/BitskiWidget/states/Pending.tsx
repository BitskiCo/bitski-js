import { Connector } from 'wagmi';
import { iconForConnector } from './ConnectionError';

import pendingIcon from '../../../assets/pending.svg';

export default function PendingConnection(props: { connector: Connector; reset: () => void }) {
  return (
    <div className="relative flex w-[350px] flex-col items-center gap-6 shadow-[0px_4px_12px_0px_color(display-p3_0_0_0_/_0.12)] p-8 rounded-3xl bg-white">
      <div className="w-6 h-6 absolute left-6 top-[23.5px]">
        <button onClick={props.reset}>
          <img src={pendingIcon} alt="Back" />
        </button>
      </div>
      <div className="flex justify-center items-center flex-[1_0_0] self-stretch p-[6.667px]">
        <div className="flex items-start gap-2.5 absolute border border-[color(display-p3_1_1_1)] p-[3px] rounded-[99px] border-solid right-[151px] top-7 bg-blue-500">
          <img className="w-2.5 h-2.5" src={pendingIcon} alt="Pending " />
        </div>
        <img
          className="w-10 h-10"
          src={iconForConnector(props.connector)}
          alt={props.connector.name}
        />
      </div>
      <div className="flex flex-col items-center gap-3 self-stretch">
        <h3 className="text-black text-lg not-italic font-bold leading-[23px] tracking-[-0.45px]">
          Connecting {props.connector.name}
        </h3>
      </div>
    </div>
  );
}
