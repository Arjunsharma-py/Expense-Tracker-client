import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/api-client";
import Profile from "./Profile";
import { Spinner } from "@chakra-ui/react";
import { Manager } from "../../hooks/useManager";

const ManagerProfile = () => {
  const { _id } = useParams();
  const [data, setData] = useState<Manager>({} as Manager);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/mng/mngId/${_id}`)
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

export default ManagerProfile;
