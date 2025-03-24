import { CiUnlock } from "react-icons/ci";

interface  UpgradeToViewProps {
    upgardeHeader : string;
    unlockTitle: string;
    unlockDesc:string;
}

export const UpgradeToView:React.FC<UpgradeToViewProps> = ({upgardeHeader,unlockTitle,unlockDesc}) => {
    return(
        <div className="bg-white rounded-2xl p-10 space-y-5">
            <h2 className="text-3xl text-vysyamalaBlack font-bold">{upgardeHeader}</h2>
            <div className="flex items-start gap-5">
                <div className="bg-light-pink rounded-[7px] p-5">
                <CiUnlock className="text-main text-2xl font-bold" />
                </div>
                <div>
                <p className="text-primary text-xl font-bold">{unlockTitle}</p>
                <p className="text-primary text-base font-normal">{unlockDesc}</p>
                </div>
            </div>
            <button className="bg-gradient py-3 px-6 text-sm text-white font-medium rounded-md" >Upgrade Now</button>
        </div>
    )
}