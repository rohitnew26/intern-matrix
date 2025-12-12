import React from "react";
import InternshipList from "../../components/InternshipList";
import useInternships from "../../hooks/useInternships";

const CseInternship = () => {
  const cseFilter = ["CSE", "IT", "IOT", "AI-ML", "DS", "Robotics", "Mechatronics"];
  const { internships, loading, error } = useInternships("Industrial Training", cseFilter);

  return (
    <InternshipList
      title="CSE & IT Internships"
      branchFilter={cseFilter}
      data={internships}
      loading={loading}
      error={error}
    />
  );
};

export default CseInternship;
