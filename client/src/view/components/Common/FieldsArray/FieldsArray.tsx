import { Fields } from "../../../../data";
import { Field, FieldArrayRenderProps } from "formik";
import { TextFormField } from "../TextFormField/TextFormField.tsx";
import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import { AddBox, Delete } from "@mui/icons-material";

interface FieldsArrayProps {
  fields: Fields[];
  helpers: FieldArrayRenderProps;
}

export const FieldsArray = ({ fields, helpers }: FieldsArrayProps) => {
  return (
    <>
      {fields.map((_, idx) => (
        <div key={idx} className="flex-grow">
          <Field
            name={`fields.${idx}.type`}
            component={TextFormField}
            placeholder="Enter the field type"
          />
          <Field
            name={`fields.${idx}.name`}
            component={TextFormField}
            placeholder="Enter the field value"
          />
          <ButtonGroup>
            <Tooltip title={"Add"}>
              <IconButton
                onClick={() => {
                  helpers.insert(idx, {
                    type: "",
                    name: "",
                  });
                }}
              >
                <AddBox />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Remove"}>
              <IconButton
                onClick={() => {
                  helpers.remove(idx);
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </div>
      ))}
    </>
  );
};
