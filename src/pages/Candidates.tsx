import React, { useEffect, useState, useTransition } from "react";
import Wrapper from "../components/Wrapper";
import SearchBar from "../components/SearchBar";
import { LucideSearch } from "lucide-react";
import Card from "../components/candidates/Card";
import { api } from "../utils/api";
import Loader from "../elements/Loader";

function Candidates() {
  const [transition, startTransition] = useTransition();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");

  function getData() {
    startTransition(async () => {
      const req = await api.get("/user/applications/get-all");
      if (req.status === 200) {
        
        const res = req.data.applications
        setFilteredData(res)
        setData(res);
      }
    });
  }

  const HandleClick = () => {
      if (input === "") {
        setFilteredData(data);
      }
      if (input) {
        const lower = input.toLowerCase();
  
let filteredData = data.filter(
  (item: any) =>
    item?.appliedBy?.name?.toLowerCase().includes(lower) ||
    item?.job?.designation?.toLowerCase().includes(lower) ||
    item?.userLocation?.toLowerCase().includes(lower) ||
    item?.job?.employmentType?.toLowerCase().includes(lower) ||
    item?.skills?.some((skill: string) =>
      skill?.toLowerCase().includes(lower)
    )
);

        setFilteredData(filteredData);
      }
  };

  useEffect(() => {
    getData();
  }, []);


    useEffect(() => {
      if (input === "") {
        setFilteredData(data);
      }
      if (input) {
        const lower = input.toLowerCase();
  
let filteredData = data.filter(
  (item: any) =>
    item?.appliedBy?.name?.toLowerCase().includes(lower) ||
    item?.job?.designation?.toLowerCase().includes(lower) ||
    item?.userLocation?.toLowerCase().includes(lower) ||
    item?.job?.employmentType?.toLowerCase().includes(lower) ||
    item?.skills?.some((skill: string) =>
      skill?.toLowerCase().includes(lower)
    )
);

        setFilteredData(filteredData);
      }
    }, [input]);

  if (transition) {
    return <Loader />;
  }
  return (
    <Wrapper>
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-left">Find Candidates</h1>
        <p className="text-base mb-2 text-neutral-400 font-light">
          Discover talented professionals for your team
        </p>
      </div>
      <SearchBar
      onPress={HandleClick}
        input={input}
        setInput={setInput}
        Icon={LucideSearch}
        placeholder="Search Catogery, Skills, Candidates"
      />
      <div className="w-full">
        <h2 className="text-lg py-1 mb-3 font-medium text-left pt">
          {filteredData.length} Candidates Found
        </h2>
        <div className="flex flex-col justify-center items-center gap-8 mb-24">
        {filteredData.length > 0 ? (
          filteredData.map((items: any) => (
            <Card
            key={items._id}
            name={items.appliedBy.name}
            jobDesignation={items.job.designation}
            eployementType={items.job.employmentType}
            resumeDlLink={items.resume}
            ratings={items.ratings}
            location={items.userLocation}
            skills={items.skills}
            image={items.userProfileImage}
            experience={items.yearOfExperience}
            />
          ))
        ) : (
          <p>NO Candidates Found.</p>
        )}
        </div>
      </div>
    </Wrapper>
  );
}

export default Candidates;
