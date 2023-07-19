import { useEffect, useState } from "react";
import { api } from "../../../../data";
import { Card, CardContent, Typography } from "@mui/material";

export const RecentlyAddedList = () => {
  const [items, setItems] = useState<
    {
      itemName: string;
      collectionName: string;
      fields: { type: string; name: string }[];
    }[]
  >([]);

  useEffect(() => {
    const fetchRecentlyAddedItems = async () => {
      try {
        const res = await api.get<
          {
            itemName: string;
            collectionName: string;
            fields: { type: string; name: string }[];
          }[]
        >("/items");

        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecentlyAddedItems();
  }, []);

  return (
    <div className="flex flex-row flex-wrap gap-7 justify-center">
      {items &&
        items.map((item, index) => (
          <Card
            key={index}
            sx={{ backgroundColor: "background.default" }}
            elevation={10}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {item.itemName}
              </Typography>
              <Typography variant="subtitle1" color="text">
                {item.collectionName}
              </Typography>
              <ul>
                {item.fields.map((field, index) => (
                  <li key={index}>
                    <Typography variant="body2">
                      {field.name} {field.type}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};
