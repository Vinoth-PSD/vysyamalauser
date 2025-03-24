import React from 'react'

interface FooterContentProps {
    // title: string;
    // description: string;
    content: string | JSX.Element | JSX.Element[];}

export const FooterContent: React.FC<FooterContentProps> = ({ content }) => {
    return (
        <div className="container mx-auto">
            <div className="my-10">
                {content}
                {/* <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold mb-5">{title}</h4>
                <p>{description}</p> */}
            </div>
        </div>
    )
}
