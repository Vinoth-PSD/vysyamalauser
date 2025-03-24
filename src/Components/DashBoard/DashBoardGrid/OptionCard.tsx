import React from 'react'

interface OptionCardProps {
    cardTitle: string,
    cardIcon: string,
    onClick: () => void;
    // cardIconColor : string,
    // cardIconSize : number,
    // cardIconBackground : string,
}

export const OptionCard: React.FC<OptionCardProps> = ({ cardTitle, cardIcon, onClick }) => {
    return (
        <div className="max-sm:w-full" onClick={onClick}>
        <div className="w-fit mx-auto bg-white shadow-profileCardShadow rounded-xl p-6 cursor-pointer max-sm:w-full">
            <div className="text-closeRed mb-5">
            <img src={cardIcon} alt="" className="w-[32px] h-[32px] object-contain" />
            </div>
            <h4 className="text-[20px] text-ash font-semibold">{cardTitle}</h4>
        </div>

    </div>
    )
}
