
import { Button } from "flowbite-react";
import leftWidget from "/src/assets/images/front-pages/background/left-widget.png";
import rightWidget from "/src/assets/images/front-pages/background/right-widget.png";
import Logo from "src/layouts/full/shared/logo/Logo";
import { Link } from "react-router";


const PurchaseTemp = () => {
  return (
    <>
      <div className="bg-primary lg:py-24 py-12 relative overflow-x-hidden">
        <div className="absolute -start-10 top-24 xl:block hidden">
          <img
            src={leftWidget}
            height={420}
            width={420}
            alt="widget"
          />
        </div>
        <div className="container-1218 mx-auto relative z-1">
          <div className="flex flex-col items-center justify-center text-center ">
            <div className="h-14 w-14 rounded-tw flex justify-center items-center bg-white shadow-elevation4">
              <Logo />
            </div>
            <h3 className="sm:text-44 text-3xl font-bold !leading-[48px] text-white lg:px-20 py-6">
              Focus on what truly matters—creating stunning, functional designs.
            </h3>
            <p className="text-lg text-white lg:px-64 leading-8">
              Designed for ease of use and customization, this template help you
              build professional dashboards faster.
            </p>
            <Button color={"outlinewhite"} as={Link} to="/auth/auth1/register" target="_blank" className="mt-5 px-4 sm:w-auto w-full">
              Register
            </Button>
          </div>
        </div>
        <div className="absolute -end-10 top-24 xl:block hidden">
          <img
            src={rightWidget}
            height={420}
            width={420}
            alt="widget"
            
          />
        </div>
      </div>
    </>
  );
};

export default PurchaseTemp;
