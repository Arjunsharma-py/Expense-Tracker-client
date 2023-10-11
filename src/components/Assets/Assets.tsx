import { useState } from "react";
import { AssetQuery } from "../../hooks/useAsset";
import TableAssets from "./TableAssets";
import { Show } from "@chakra-ui/react";
import CardsAssets from "./CardsAssets";

const Assets = () => {
  const [assetQuery, setAssetQuery] = useState<AssetQuery>({
    ordering: "-date",
  } as AssetQuery);

  return (
    <>
      <Show below="md">
        <CardsAssets
          assetQuery={assetQuery}
          onSetassetQuery={(assetQuery) => setAssetQuery(assetQuery)}
        />
      </Show>
      <Show above="md">
        <TableAssets
          assetQuery={assetQuery}
          onSetassetQuery={(assetQuery) => setAssetQuery(assetQuery)}
        />
      </Show>
    </>
  );
};

export default Assets;
