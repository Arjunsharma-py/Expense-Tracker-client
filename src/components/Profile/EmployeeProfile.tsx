import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/api-client";
import { Emp } from "../../hooks/useEmp";
import Profile from "./Profile";
import { Spinner } from "@chakra-ui/react";

const EmployeeProfile = () => {
  const { _id } = useParams();
  const [data, setData] = useState<Emp>({} as Emp);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/emp/empId/${_id}`)
      .then((res) => {
        setLoading(false);
        setData(res.data.results);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && <Spinner />}
      <Profile data={data} />
    </>
  );
};

export default EmployeeProfile;
