import house1 from "./../assets/images/home/house-1.png";
import house2 from "./../assets/images/home/house-2.png";
import house3 from "./../assets/images/home/house-3.png";
import house4 from "./../assets/images/home/house-4.png";
import Button from "@mui/material/Button";

const Home = () => {
  return (
    <div className="w-100 h-100 relative">
      <div className=" md:w-96 md:h-96 w-28 h-28  -z-10 absolute top-20 right-20 --transform: rotate-45 ">
        <img src={house2} alt="" />
      </div>

      <div className=" md:w-96 md:h-96 w-28 h-28 -z-10 absolute  top-20 left-20  --transform: -rotate-45 ">
        <img src={house4} alt="" />
      </div>

      <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
        <h1 className=" text-2xl md:text-4xl w-[400px] text-center font-extrabold ">
          <span className="">Invest in Your Happy </span>
          <span className="text-[#003b36] text-stroke-2">Place - </span>
          Where Dreams Find
          <span className="text-[#003b36] text-stroke-2"> Their Address</span>
        </h1>
        <Button
          variant="outlined"
          size="large"
          sx={{
            color: "green",
          }}
        >
          Explore Now
        </Button>
      </div>
    </div>
  );
};

export default Home;
