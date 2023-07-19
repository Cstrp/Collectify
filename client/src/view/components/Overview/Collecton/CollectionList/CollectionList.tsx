import { CollectionListProps } from "./CollectionListProps.ts";
import { CollectionListItem } from "../CollectionListItem/CollectionListItem.tsx";

export const CollectionList = ({ collections }: CollectionListProps) => {
  return (
    <div className={"flex flex-row flex-wrap justify-center  gap-5"}>
      {collections.map(collection => (
        <CollectionListItem key={collection._id} collection={collection} />
      ))}
    </div>
  );
};
