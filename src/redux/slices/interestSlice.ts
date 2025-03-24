// src/redux/slices/interestSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface InterestState {
  showExpressInterest: boolean;
  sliderCardExpressInterest: boolean;
  SuggestedProfilesShow: boolean;
  FeaturedProfilesShow: boolean;
}

const initialState: InterestState = {
  showExpressInterest: false,
  sliderCardExpressInterest: false,
  SuggestedProfilesShow: false,
  FeaturedProfilesShow: false,
};

const interestSlice = createSlice({
  name: 'interest',
  initialState,
  reducers: {
    // Parent State Decalration
    toggleExpressInterest: (state) => {
      state.showExpressInterest = !state.showExpressInterest;
    },
    showInterest: (state) => {
      state.showExpressInterest = true;
    },
    hideInterest: (state) => {
      state.showExpressInterest = false;
    },
    sliderCardExpressInterest: (state) => {
      state.SuggestedProfilesShow = true;
    },
    SuggestedProfilesExpressInterest: (state) => {
      state.SuggestedProfilesShow = true;
    },
    FeaturedProfilesExpressInterest: (state) => {
      state.FeaturedProfilesShow = true;
    }
  },
});

export const { toggleExpressInterest, showInterest, hideInterest, sliderCardExpressInterest, SuggestedProfilesExpressInterest, FeaturedProfilesExpressInterest } = interestSlice.actions;
export default interestSlice.reducer;
