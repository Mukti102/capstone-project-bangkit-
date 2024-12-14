import { Card, Carousel, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import ChildInfo from "../components/ChildInfo";
import { MdOutlineRoomService } from "react-icons/md";
import MediumCard from "../components/MediumCard";
import img1 from "../assets/slider/1.jpg";
import img2 from "../assets/slider/2.jpg";
import img3 from "../assets/slider/3.jpg";
import img4 from "../assets/slider/4.jpg";
import { useParams } from "react-router";
import api from "../service/api";
import MapPlace from "../components/MapPlace";
import { useStore } from "../store/store";
import { limitArray } from "../utils/LimitData";

export default function Detail() {
  const id = useParams().id;
  const [singleData, setSingleData] = React.useState({});
  const [others, setOthers] = React.useState([]);
  const dataUser = useStore((state) => state.dataUser);
  const [loading, setLoading] = useState(false);

  // get data from api
  const getData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/place/" + id);
      const responseOthers = await api.post("/predict", dataUser);
      setSingleData(response.data);
      setOthers(
        responseOthers.data?.length > 5
          ? limitArray(responseOthers?.data, 5)
          : responseOthers?.data
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("Error");
    }
  };

  useEffect(() => {
    getData();
  }, [id]);
  return (
    <div className="p-1">
      <div className="sm:h-[80vh] h-[50vh]">
        <Carousel className="h-full">
          <img
            className="brightness-75 h-full object-cover"
            src={img1}
            alt="..."
          />
          <img
            className="brightness-75 h-full object-cover"
            src={img2}
            alt="..."
          />
          <img
            className="brightness-75 h-full object-cover"
            src={img3}
            alt="..."
          />
          <img
            className="brightness-75 h-full object-cover"
            src={img4}
            alt="..."
          />
        </Carousel>
      </div>
      {loading ? (
        <div className="w-full  justify-center my-5 items-center">
          <div className=" w-max mx-auto">
            <Spinner size="xl" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 my-5   w-full gap-5 px-1 sm:px-10">
          {/* left */}
          <div className="col-span-2">
            {/* title */}
            <div className="w-full my-2 justify-center items-center gap-2.5 inline-flex">
              <div className="w-full leading-tight  text-black text-2xl sm:text-[2.5rem] font-semibold font-['Inter'] tracking-tight">
                {singleData?.Place_Name}
              </div>
            </div>
            {/* informasi */}
            <Card href="#" className="max-w-full my-5 hover:bg-white">
              <h5 className="sm:text-2xl text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Detail Information
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-2 2xl:grid-cols-3  sm:gap-5 gap-5">
                <ChildInfo
                  icon={<IoLocationOutline />}
                  title={"Kota"}
                  value={singleData?.City}
                />
                <ChildInfo
                  icon={<IoTimeOutline />}
                  title={"Jam Buka"}
                  value={singleData?.Time_Minutes | ""}
                />
                <ChildInfo
                  icon={<MdOutlineRoomService />}
                  title={"Category"}
                  value={singleData?.Category}
                />
              </div>
            </Card>
            {/* deskripsi */}
            <Card
              href="#"
              className="max-w-full hover:bg-white my-5 shadow-sm border-gray-100"
            >
              <h5 className="sm:text-2xl text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Deskripsi
              </h5>
              <p className="font-normal sm:leading-7 leading-6 sm:text-base text-sm text-gray-700 dark:text-gray-400">
                {singleData?.Description}
              </p>
            </Card>
          </div>
          {/* right */}
          <div className="">
            {/* map */}
            <MapPlace data={singleData} />
            {/* others */}
            <div className="mt-10">
              <h5 className="sm:text-3xl text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Others
              </h5>
              <div className="grid grid-cols-1 mt-3 gap-3">
                {others?.map((e) => (
                  <MediumCard data={e} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
