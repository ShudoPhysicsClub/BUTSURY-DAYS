import { useEffect, useState } from 'react';
import User from '../types/User';
import { apiAutoCharge } from '../api';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: User;
}

const AutoCharge = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(1000);
  const [charge, setCharge] = useState<number>(1000);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.user.id === -1) navigate('/');

    setIsEnabled(props.user.enable_auto_charge);
    setBalance(props.user.auto_charge_balance);
    setCharge(props.user.auto_charge_charge);
  }, [navigate, props.user.id, props.user.enable_auto_charge, props.user.auto_charge_balance, props.user.auto_charge_charge]);

  const saveSettings = () => {
    if (!isEnabled) {
      if (balance > charge) {
        apiAutoCharge(props.user, isEnabled, charge, charge, navigate);
        return;
      }
      apiAutoCharge(props.user, isEnabled, balance, charge, navigate);
      return;
    } else {
      if (balance < 1000 || balance > 10000) {
        alert('残高は、1,000円以上10,000円以下で設定してください。');
        return;
      }

      if (charge < 1000 || charge > 20000) {
        alert('チャージ額は、1,000円以上10,000円以下で設定してください。');
        return;
      }

      if (balance > charge) {
        alert('チャージ額は、残高以上の金額で設定してください。');
        return;
      }

      if (!Number.isInteger(balance)) {
        alert('残高は、整数値で設定してください。');
        return;
      }

      if (!Number.isInteger(charge)) {
        alert('残高は、整数値で設定してください。');
        return;
      }
    }

    apiAutoCharge(props.user, isEnabled, balance, charge, navigate);
  };

  return (
    <>
      <title>{"オートチャージ設定 - BUTSURY DAYS"}</title>
      <div className="m-[10px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold">{'オートチャージ設定'}</p>
          <div className="flex m-[10px] items-center justify-center cursor-pointer">
            <input
              className="cursor-pointer"
              type="checkbox"
              name="is_enabled_auto_charge"
              id="is_enabled_auto_charge"
              defaultChecked={props.user.enable_auto_charge}
              onChange={() => setIsEnabled(!isEnabled)}
            />
            <label className="ml-[3px] cursor-pointer" htmlFor="is_enabled_auto_charge">
              {'オートチャージを使用する。'}
            </label>
          </div>
          <div className="flex m-[10px]">
            <p className="flex items-center m-[5px]">{'残高が'}</p>
            <input
              disabled={!isEnabled}
              className="p-[10px] bg-white rounded-[6px] disabled:bg-[#c7d2d5] disabled:text-white"
              type="number"
              min={1000}
              max={10000}
              step={1000}
              placeholder="残高"
              defaultValue={props.user.auto_charge_balance}
              onChange={(e) => setBalance(e.target.valueAsNumber)}
            />
            <p className="flex items-center m-[5px]">{'円 未満になったとき'}</p>
          </div>
          <div className="flex m-[10px]">
            <input
              disabled={!isEnabled}
              className="p-[10px] bg-white rounded-[6px] disabled:bg-[#c7d2d5] disabled:text-white"
              type="number"
              min={1000}
              max={20000}
              step={1000}
              placeholder="チャージ額"
              defaultValue={props.user.auto_charge_charge}
              onChange={(e) => setCharge(e.target.valueAsNumber)}
            />
            <p className="flex items-center m-[5px]">{'円 チャージする。'}</p>
          </div>
        </div>
        <div className="m-[10px]">
          <p className="text-[13px] font-normal">{'残高の設定可能金額は、1,000円以上10,000円以下です。'}</p>
          <p className="text-[13px] font-normal">{'チャージ額の設定可能金額は、1,000円以上20,000円以下です。'}</p>
        </div>
        <p className="text-center m-[10px] py-[10px] w-[200px] rounded-2xl cursor-pointer text-white bg-[#219bce]" onClick={saveSettings}>
          {'設定を保存'}
        </p>
      </div>
    </>
  );
};

export default AutoCharge;
