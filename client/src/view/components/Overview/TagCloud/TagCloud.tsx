import { useEffect, useState } from "react";
import { api } from "../../../../data";
import { Chip } from "@mui/material";

export const TagCloud = () => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get<string[]>("/tags");

        setTags(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-10 max-w-lg">
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          variant="outlined"
          color="secondary"
          sx={{
            "&:hover": {
              backgroundColor: "#e0e0e0",
              cursor: "pointer",
            },
          }}
        />
      ))}
    </div>
  );
};
