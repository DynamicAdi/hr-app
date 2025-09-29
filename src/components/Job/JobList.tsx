import JobCard from "./JobCard";



function JobList({data}: {data: any}) {
  return (
    <div className="w-full mb-20">
      <h2 className="text-xl py-2 font-semibold text-left">
        {data && data.length} Jobs Found
      </h2>
      <div className="flex flex-col justify-center items-center gap-8 mb-24">
        {data.length > 0 ? (
          data.map((items: any) => (
            <JobCard
            id={items._id}
              key={items._id}
              Cateogery={items.companyDetails.name}
              title={items.designation}
              // designation={}
              employeeType={items.employmentType}
              annualSalary={{
                min: items.annualSalary.min,
                max: items.annualSalary.max,
                currency: items.annualSalary.currency,
              }}
              location={items.location[0]}
              workMode={items.workMode}
              // designation={}
            />
          ))
        ) : (
          <p>No Jobs Found</p>
        )}
      </div>
    </div>
  );
}

export default JobList;
