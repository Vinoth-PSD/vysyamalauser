import React from 'react';
import './ProfileImageGroupStyle.css';

interface ProfileImageGroupProps {
    images: string[];
    maxVisible: number;
    extraCount: number;
}

const ProfileImageGroup: React.FC<ProfileImageGroupProps> = ({ images, maxVisible, extraCount }) => {
    const visibleImages = images.slice(0, maxVisible);

    return (
        <div className="profile-image-group">
            {visibleImages.map((image, index) => (
                <div key={index} className="profile-image">
                    <img src={image} alt={`Profile ${index + 1}`} />
                </div>
            ))}
            {extraCount > 0 && (
                <div className="profile-image extra">
                    +{extraCount}
                </div>
            )}
        </div>
    );
};

export default ProfileImageGroup;

