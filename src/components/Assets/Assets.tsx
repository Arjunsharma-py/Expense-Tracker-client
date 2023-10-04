import { useState } from "react";
import { AssetQuery } from "../../hooks/useAsset";
import TableAssets from "./TableAssets";

const Assets = () => {
  const [assetQuery, setAssetQuery] = useState<AssetQuery>({
    ordering: "-date",
  } as AssetQuery);

  return (
    <TableAssets
      assetQuery={assetQuery}
      onSetassetQuery={(assetQuery) => setAssetQuery(assetQuery)}
    />
  );
};

export default Assets;
