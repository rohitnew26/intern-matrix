import React from "react";
import InternshipList from "../../components/InternshipList";
import useInternships from "../../hooks/useInternships";

const MeInternship = () => {
  const meFilter = ["ME", "Automobile", "Mechatronics"];
  const { internships, loading, error } = useInternships("Industrial Training", meFilter);

  return (
    <InternshipList
      title="Mechanical Engineering Internships"
      branchFilter={meFilter}
      data={internships}
      loading={loading}
      error={error}
    />
  );
};

export default MeInternship;
