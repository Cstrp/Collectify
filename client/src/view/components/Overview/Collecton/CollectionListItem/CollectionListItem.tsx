import { NoImage } from "../../../Common";
import { CollectionItemActions } from "../CollectionItemActions/CollectionItemActions.tsx";
import { Collection } from "../../../../../data";
import Box from "@mui/material/Box";

export const CollectionListItem = ({
  collection,
}: {
  collection: Collection;
}) => {
  return (
    <>
      <Box
        component={"div"}
        sx={{ backgroundColor: "background.default" }}
        className={
          "max-w-lg flex flex-col items-end rounded shadow-lg px-3 py-5 overflow-y-auto"
        }
      >
        <div className={"flex-1-0 flex flex-row gap-7"}>
          {collection.image ? (
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full rounded"
            />
          ) : (
            <NoImage text={"No image"} />
          )}

          <div
            className={
              "w-full my-7 flex flex-col gap-0.5 max-h-36 overflow-y-auto"
            }
          >
            <div className={"font-bold text-xl mb-2"}>{collection.name}</div>
            <div className={"font-semibold text-xl mb-2"}>
              Category: {collection.theme}
            </div>
            <p className={"text-gray-300 text-base"}>
              Description: {collection.description}
            </p>
            {collection.fields.map(field => (
              <div key={field.name}>{field.type + ": " + field.name}</div>
            ))}
          </div>
        </div>
        <CollectionItemActions
          collectionId={collection._id ? collection._id : ""}
          collection={collection}
        />
      </Box>
    </>
  );
};
