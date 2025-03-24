import ProfileChatImg from "../../../assets/images/ProfileChatImg.png"

export const NameCard = () => {
    return (
        <div>
            <div className="flex items-center border-footer-text-gray border-b-[1px] px-5 py-5 space-x-3">
                <div>
                    <img src={ProfileChatImg} alt="" />
                </div>
                <div className="space-y-1">
                    <h6 className="text-vysyamalaBlack font-bold">Harini</h6>
                    <p className="text-sm text-ashSecondary font-normal">I am interested in your profile. if you are...</p>

                    <p className="text-xs text-ashSecondary font-semibold">Just now</p>
                </div>
            </div>
        </div>
    )
}
