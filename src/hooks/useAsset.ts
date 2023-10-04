import useData from "./useData";
import { Manager } from "./useManager";

export interface AssetQuery {
  from: string | null;
  to: string | null;
  manager: string | null;
  source: string | null;
  ordering: string;
  page: number | null;
}

export interface Asset {
  _id: string;
  manager: Manager;
  source: string;
  amount: number;
  date: Date;
}

const useAsset = (assetQuery: AssetQuery) =>
  useData<Asset>(
    "/asset",
    {
      params: {
        from: assetQuery?.from,
        to: assetQuery?.to,
        mng: assetQuery?.manager,
        src: assetQuery?.source,
        ordering: assetQuery.ordering,
        page: assetQuery?.page,
      },
    },
    [assetQuery]
  );

export default useAsset;
