import trust from "../../assets/icons/trust.png";
import customers from "../../assets/icons/customers.png";
import marriage from "../../assets/icons/marriage.png";
import livechat from "../../assets/icons/livechat.png";
import compatibility from "../../assets/icons/compatibility.png";
import matching from "../../assets/icons/matching.png";
import friendlyCustomerSupport from "../../assets/icons/friendlyCustomerSupport.png"

const SideContent = () => {
  return (
    <div className="w-48 max-lg:w-full max-md:hidden">
      <div className="relative">
        <h1 className="text-lg font-semibold text-center pb-2">Why Register</h1>
        <div className="mx-auto text-center">
        <p className="w-20 h-0.5 mx-auto bg-ashSecondary rounded max-lg:mx-auto max-lg:text-center "></p>
        </div>
      </div>

      <div className="mx-auto mt-8 space-y-8 max-lg:grid max-lg:grid-cols-3 max-lg:items-center max-lg:space-y-0 max-lg:gap-y-8 max-sm:grid-cols-1">
        <div>
          <img src={trust} alt="trust" className="w-[30px] h-[30px] mx-auto grayscale" />
          <p className="text-sm text-center mt-1">
            Most trusted Arya Vysya Matrimonial Since 2008
          </p>
        </div>
        <div>
          <img src={customers} alt="customers" className="w-[30px] h-[30px] mx-auto grayscale" />
          <p className="text-sm text-center mt-1">
            32,000+ happy
            <br /> customers
          </p>
        </div>
        <div>
          <img src={marriage} alt="marriage" className="w-[30px] h-[30px] mx-auto grayscale" />
          <p className="text-sm text-center mt-1">
            7500+ marriages<br></br> enabled
          </p>
        </div>
        <div>
          <img src={livechat} alt="livechat" className="w-[30px] h-[30px] mx-auto grayscale" />
          <p className="text-sm text-center mt-1">Live Chat</p>
        </div>
        <div>
          <img src={compatibility} alt="compatibility" className="w-[30px] h-[30px] mx-auto grayscale" />
          <p className="text-sm text-center mt-1">
            10 Porutham Compatibility Report
          </p>
        </div>
        <div>
          <img src={matching} alt="matching" className="w-[30px] h-[30px] mx-auto grayscale" />
          <p className="text-sm text-center mt-1">
            Automated Matching Algorithm
          </p>
        </div>
        <div>
          <img src={friendlyCustomerSupport} alt="matching" className="w-[30px] h-[30px] mx-auto grayscale" />
          <p className="text-sm text-center mt-1">
          Friendly Customer Support
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideContent;
