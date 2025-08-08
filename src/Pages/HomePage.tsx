import { HeroSection } from "../Components/HomePage/HeroSection";
import { VysyamalaAbout } from "../Components/HomePage/VysyamalaAbout";
import { FeaturedBride } from "../Components/HomePage/FeaturedBride";
import { FeaturedGroom } from "../Components/HomePage/FeaturedGroom";
import { WhyVysyamala } from "../Components/HomePage/WhyVysyamala";
import { AwardsGallery } from "../Components/HomePage/AwardsGallery";
// import TrustedPeople from "../Components/HomePage/TrustedPeople";
import FindSomeone from "../Components/HomePage/FindSomeone";
import HappyStories from "../Components/HomePage/HappyStories";
// import VysyamalaApps from "../Components/HomePage/VysyamalaApps";
import ReviewsTestimonial from "../Components/HomePage/ReviewsTestimonial";
import SearchProfiles from "../Components/HomePage/SearchProfiles";
import TrustedPeople from "../Components/HomePage/TrustedPeople";
import { useContext, useEffect, useRef, useState } from "react";
import { ProfileContext } from "../ProfileContext";

export const HomePage = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("HomePage must be used within a ProfileProvider");
  }
  
  const { key, setKey } = context;

  const [focused, setFocused] = useState(false); // Local state to control focus state

  const FindSomeoneRef = useRef<HTMLInputElement | null>(null);

  // Ensure the FindSomeone component has a focusable element (input or textarea)
  useEffect(() => {
    if (key && FindSomeoneRef.current && !focused) {
      // Focus the element when key is true and it's not already focused
     
      FindSomeoneRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      FindSomeoneRef.current?.focus();
      setFocused(true); // Mark the input as focused
      setTimeout(() => {
        setKey(false); // Reset key after focus
        setFocused(false); // Reset focused state
      }, 2000); // Reset after 2 seconds
    }
  }, [key, focused, setKey]);

  const handleNext = (mobile: string) => {
    console.log("Mobile number after form submission:", mobile);
  };

  return (
    <div>
      <HeroSection onNext={handleNext} />
      <FeaturedBride />
      <FeaturedGroom />
      <WhyVysyamala />
      <AwardsGallery />
      <TrustedPeople />
      
      {/* Ensure the ref is attached to a focusable element */}
      <div ref={FindSomeoneRef}>
        <FindSomeone />
      </div>
      
      <HappyStories />
      {/* <VysyamalaApps /> */}
      <ReviewsTestimonial />
      <SearchProfiles />
      <VysyamalaAbout />
    </div>
  );
};
