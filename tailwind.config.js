/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        happyStorybglayer: "radial-gradient(#111 50%, #000 100%)",
        gradient:
          "linear-gradient(to right, #bd1225, #cd1f2f, #de2b3a, #ee3645, #ff4050)",
        gradientLight:
          "linear-gradient(to right, #bd1225, #cd1f2f, #de2b3a, #ee3645, #ff4050)",
        gradientBgImg: "url('assets/images/gradientBgImg.png'), linear-gradient(92.08deg, #BD1225 0.6%, #FF4050 103.08%)",
        heroSliderBgImg: "url('assets/images/HeroSliderBg.png')",
        gradientGold: "linear-gradient(to right, #d79d32, #dfa22d, #e6a727, #eeac20, #f5b117, #f8b71d, #fbbd23, #fec328, #fdcb3a, #fdd249, #fdda58, #fde166)",
        gradientPlatinum:"linear-gradient(92.08deg, rgba(116, 116, 116, 0.5) 0.6%, rgba(225, 225, 225, 0.75) 51.84%, #747474 103.08%)",
        gradientGreen: "linear-gradient(to right, #2fbd12, #3ccd1f, #48de2b, #54ee36, #60ff40)",
        gradientBlack: "background: linear-gradient(179.86deg, rgba(0, 0, 0, 0) 52.14%, #000000 99.88%)",
        dashedborder:{
          'background-image': 'repeating-linear-gradient(90deg, #f2bd6d, #f2bd6d 12px, transparent 12px, transparent 20px), repeating-linear-gradient(180deg, #f2bd6d, #f2bd6d 12px, transparent 12px, transparent 20px), repeating-linear-gradient(90deg, #f2bd6d, #f2bd6d 12px, transparent 12px, transparent 20px), repeating-linear-gradient(180deg, #f2bd6d, #f2bd6d 12px, transparent 12px, transparent 20px)',
          'background-position': 'left top, right top, left bottom, left top',
          'background-repeat': 'repeat-x, repeat-y, repeat-x, repeat-y',
          'background-size': '100% 2px, 2px 100%, 100% 2px, 2px 100%',
        }
      },

      colors: {
        main: "#ED1E24",
        primary: "#535665",
        secondary: "#FF6666",
        white: "#FFFFFF",
        vysyamalaBlack: "#282C3F",
        vysyamalaBlackSecondary: "#14181B",
        vysyamalaSandal: "#FFFBE3",
        vysyamalaLightSandal: "#FFFDF1",
        vysyamalaPink: "#EF4770",
        vysyamalaViolet: "#9047EF",
        vysyamalaYellow: "#EFAC47",
        checkGreen: "#53C840",
        checkRed: "#cd3040",
        closeRed: "#FF3333",
        gray: "#E9EAEC",
        grayBg: "#fafafa",
        ash: "#4F515D",
        ashSecondary: "#85878C",
        chatGray: "#E6E5EB",
        chatBlue: "#007AFF",
        "footer-gray": "#202332",
        "footer-text-gray": "#D4D5D9",
        "footer-line": "rgba(255, 255, 255, 0.12)",
        "gloss-black": "rgba(0, 0, 0, 0.73)",
        "light-pink": "#FFE5E5",
        "lightFade-pink": "#FFF5F5",
        "shadowPink": "#C243434B",
        "trustedWhite": "#f9f9f9",
        ashBorder: "#85878C91",
        placeHolderColor:"#939094",
        "primary-700":"#202332",
        "primary-400":"#7E808C",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        segoesc: ["segoesc", "sans-serif"],
      },
      container: {
        center: true,
        padding:"15px",
      },
      boxShadow: {
        'reviewBoxShadow': '0px 0px 15px rgba(18, 17, 9, 0.05)',
        'trustedBoxShadow': '0px 20px 50px rgba(18, 17, 9, 0.01)',
        'profileCardShadow':'0px 4px 43px 0px #D1D1D140',
        'redboxshadow': '8px 8px 34px 0px #EE1E2440',
        'matchingProfileShadow':'#EF4770 0px 22px 24px -14px',
        'mutualIntersetShadow':'#9047EF 0px 22px 24px -14px',
        'WishlistShadow':'#EFAC47 0px 22px 24px -14px',
        'PlanCardShadow':'0px 42px 34px 0px #C243434B',
        'BookmarkShadow':'0px 1px 3px 0px #72727240',
      }
    },
  },
  plugins: [],
  
};


