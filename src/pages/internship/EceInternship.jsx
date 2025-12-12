import React from "react";
import InternshipList from "../../components/InternshipList";
import useInternships from "../../hooks/useInternships";

const EceInternship = () => {
  const eceFilter = ["ECE", "EE", "EIE", "EEE"];
  const { internships, loading, error } = useInternships("Industrial Training", eceFilter);

  return (
    <InternshipList
      title="ECE & EE Internships"
      branchFilter={eceFilter}
      data={internships}
      loading={loading}
      error={error}
    />
  );
};

export default EceInternship;
