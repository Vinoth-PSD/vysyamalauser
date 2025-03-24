import VysyamalaAd from "../../assets/images/VysyamalaAd.png";
import VysyamalaBazaar from "../../assets/images/VysyamalaBazaar.png";

export const VysyamalaStore = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <img src={VysyamalaAd} alt="Vysyamala Ad" />
        </div>
        <div>
          <img src={VysyamalaBazaar} alt="Vysyamala Ad" />
        </div>
      </div>
    </div>
  );
};
