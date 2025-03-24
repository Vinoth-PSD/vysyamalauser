import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface PlanCardProps {
  id: number; // New prop for ID
  price: number;
  period: string;
  planName: string;
  features: string[];
  className?: string;
  customStyles?: string;
  customStylesOne?: string;
  customStylesTwo?: string;
  customStylesThree?: string;
  isCenterCard?: boolean;
  children?: React.ReactNode; // To include additional elements
}

export const PlanCard: React.FC<PlanCardProps> = ({
  id,
  price,
  period,
  planName,
  features,
  className,
  customStyles,
  customStylesOne,
  customStylesTwo,
  customStylesThree,
  isCenterCard,
  children,
}) => {

  // const navigate = useNavigate();

  // const handleChoosePlan = () => {
  //   navigate("/PayNowRegistration", {
  //     state: { planName },
  //   });
  // };

  return (
    <div className="w-1/3 max-xl:w-[50%] max-sm:w-[300px] max-sm:rounded-3xl max-sm:shadow-profileCardShadow">
      <div
        className={`flex flex-col justify-evenly h-full w-full bg-white rounded-3xl p-16 max-2xl:p-12 max-xl:p-10 max-sm:p-5 ${className}`}
        
      >
        {children}
        <h1 className={`text-[36px] ${customStylesTwo} font-bold max-2xl:text-[32px] max-xl:text-[28px]`}>
          ₹ {price}
          <span className={`text-[16px] font-medium ${customStylesOne}`}>/{period}</span>
        </h1>

        <h4 className={`text-[28px] ${customStylesOne} font-bold mb-2 max-2xl:text-[28px] max-xl:text-[20px]`}>
          {planName}
        </h4>

        <div>
          <ul>
            {features.map((feature, index) => (
              <li
                key={index}
                className={`relative text-[14px] ${customStyles} pl-[30px] mb-4`}
              >
                {feature}
                {isCenterCard ? (
                  <FaCheck className="absolute top-0.5 left-[-0px] text-[14px] text-white bg-[#ffffff1a] w-[20px] h-[20px] p-1  rounded-full" />
                ) : (
                  <FaCheck className="absolute top-1 left-[0px] text-[14px] text-checkGreen" />
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* <Link to={`/PayNowRegistration?id=${id}&price=${price}`}> */}
        <Link to={`/PayNowRegistration?id=${id}&price=${price}&planName=${encodeURIComponent(planName)}`}>

          {" "}
          {/* Pass the id as a query parameter to PayNow route */}
          <button
            className={`${customStylesThree} w-full rounded-full py-[12px] text-main text-[16px] font-semibold mt-10 cursor-pointer`}
            // onClick={handleChoosePlan}
          >
            Choose Plan
          </button>
        </Link>
      </div>
    </div>
  );
};
