import React from "react";
import InternshipList from "../../components/InternshipList";
import useInternships from "../../hooks/useInternships";

const CivilInternship = () => {
  const civilFilter = ["CE", "Civil"];
  const { internships, loading, error } = useInternships("Industrial Training", civilFilter);

  return (
    <InternshipList
      title="Civil Engineering Internships"
      branchFilter={civilFilter}
      data={internships}
      loading={loading}
      error={error}
    />
  );
};

export default CivilInternship;
