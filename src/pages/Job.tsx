import React, { useEffect, useState, useTransition } from "react";
import Block from "../elements/Block";
import SearchBar from "../components/SearchBar";
import { LucideSearch } from "lucide-react";
import Category from "../components/Category";
import JobList from "../components/Job/JobList";
import Wrapper from "../components/Wrapper";
import { api } from "../utils/api";
import Loader from "../elements/Loader";

type Category = {
  department: string;
  count: number;
};

function Job() {
  const [transition, startTransition] = useTransition();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [filteredData, setFilteredData] = useState([]);

  const [inpt, setInpt] = useState("");

  function getData() {
    startTransition(async () => {
      const req = await api.get("/job/get");
      if (req.status === 200) {
        const data = req.data.jobs;
        console.log(data);
        
        const departmentCounts = data.reduce(
          (acc: Record<string, number>, item: any) => {
            acc[item.department] = (acc[item.department] || 0) + 1;
            return acc;
          },
          {}
        );

        const categoryArray = Object.entries(departmentCounts).map(
          ([department, count]) => ({
            department,
            count,
          })
        );
        setFilteredData(data);
        setCategories(categoryArray as any);
        setData(data);
      }
    });
  }

  const HandleClick = () => {
    if (inpt) {
      const lower = inpt.toLowerCase();

      let filteredData = data.filter(
        (item: any) =>
          item?.department?.toLowerCase().includes(lower) ||
          item?.companyIndustry?.toLowerCase().includes(lower) ||
          item?.designation?.toLowerCase().includes(lower) ||
          item?.employmentType?.toLowerCase().includes(lower) ||
          item?.roleCategory?.toLowerCase().includes(lower) ||
          item?.workMode?.toLowerCase().includes(lower)
      );
      setFilteredData(filteredData);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let filteredData =
      selectedDept === "All"
        ? data
        : data.filter(
            (item: { department: string }) => item.department === selectedDept
          );
    setFilteredData(filteredData);
  }, [selectedDept]);

  useEffect(() => {
    if (inpt === "") {
      setFilteredData(data);
    }
    if (inpt) {
      const lower = inpt.toLowerCase();

      let filteredData = data.filter(
        (item: any) =>
          item?.department?.toLowerCase().includes(lower) ||
          item?.companyIndustry?.toLowerCase().includes(lower) ||
          item?.designation?.toLowerCase().includes(lower) ||
          item?.employmentType?.toLowerCase().includes(lower) ||
          item?.roleCategory?.toLowerCase().includes(lower) ||
          item?.workMode?.toLowerCase().includes(lower)
      );
      setFilteredData(filteredData);
    }
  }, [inpt]);

  if (transition) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Block />
      <SearchBar
        input={inpt}
        setInput={setInpt}
        Icon={LucideSearch}
        placeholder="Search For Jobs"
        onPress={HandleClick}
      />
      <Category cat={categories} setVal={setSelectedDept} val={selectedDept} />
      <JobList data={filteredData} />
    </Wrapper>
  );
}

export default Job;
