import { ProfileDetailsExpressInterest } from '../../Components/DashBoard/ProfileDetails/ProfileDetailsExpressInterest'
// import { ProfileDetailsRequest } from '../../Components/DashBoard/ProfileDetails/ProfileDetailsRequest'
import { ProfileDetailsSettingsView } from '../../Components/LoginHome/ProfileDetailsView/ProfileDetailsSettingsView'
import { FeaturedProfiles } from '../../Components/LoginHome/FeaturedProfiles'
import { VysyaBazaar } from '../../Components/LoginHome/VysyaBazaar'
import { SuggestedProfiles } from '../../Components/LoginHome/SuggestedProfiles'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ProfileDetails = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
    return (
        <div>
            <ProfileDetailsExpressInterest />
            <ProfileDetailsSettingsView />
            <FeaturedProfiles />
            <VysyaBazaar />
            <SuggestedProfiles />
        </div>
    )
}
