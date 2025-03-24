// interface WhyReasonsProps {
//     icon?: string;
//     heading: string;
//     desc: string;
// }

// export const WhyReasons: React.FC<WhyReasonsProps> = ({ icon, heading, desc }) => {
//     return (
//         <div>
//             <div>
//                 <div className="mb-3">
//                     <img src={icon} alt="Wide profile coverage" />
//                 </div>
//                 <h5 className="text-base text-ash font-bold mb-3">{heading}</h5>
//                 <p className="text-ash text-[18px] font-base">{desc}</p>
//             </div>
//         </div>
//     )
// }



interface WhyReasonsProps {
    icon?: string;
    heading: string;
    desc: string;
}

export const WhyReasons: React.FC<WhyReasonsProps> = ({ icon, heading, desc }) => {
    return (
        <div>
            <div>
                <div className="mb-3">
                    <img src={icon} alt="Wide profile coverage" />
                </div>
                <h5 className="text-xl text-vysyamalaBlack font-bold mb-1">{heading}</h5>
                <p className="text-ash text-[16px] font-base">{desc}</p>
            </div>
        </div>
    )
}
