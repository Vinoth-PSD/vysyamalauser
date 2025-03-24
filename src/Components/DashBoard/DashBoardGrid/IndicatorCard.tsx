
interface IndicatorCardProps {
    cardTitle: string,
    cardCount: string,
    cardIcon: string ,
    onClick: () => void;
    // cardIconColor : string,
    // cardIconSize : number,
    // cardIconBackground : string,
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ cardTitle, cardCount, cardIcon, onClick }) => {
    return (
        <div onClick={onClick}>
            <div className="bg-white shadow-profileCardShadow rounded-xl p-6 cursor-pointer">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="text-[20px] leading-[28px] text-ash font-semibold mb-2">{cardTitle}</h4>
                        <p className="text-[36px] leading-[44px] text-ash font-bold">{cardCount}</p>
                    </div>

                    <div>
                        <div className=" text-closeRed">
                            <img src={cardIcon} alt="" className="w-[32px] h-[32px] object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
