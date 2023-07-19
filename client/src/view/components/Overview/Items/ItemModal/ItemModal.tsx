import {
  createItem,
  Item,
  itemsStore,
  updateItem,
  upload,
} from "../../../../../data";
import {
  Button,
  Chip,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { FieldsArray, TextFormField } from "../../../Common";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { ItemModalProps } from "./ItemModalProps.ts";
import { observer } from "mobx-react";

export const ItemModal = observer(
  ({ isOpen, onClose, itemId, item }: ItemModalProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [file, setFile] = useState<File | null>(null);
    const [tagValue, setTagValue] = useState("");

    const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTagValue(event.target.value);
    };

    const collectionId = useLocation().pathname.split("/")[2];

    const initialValues: Item = {
      title: item?.title || "",
      tags: item?.tags || [],
      fields: item?.fields || [{ type: "", name: "" }],
    };

    const onSubmit = async (values: Item, helpers?: FormikHelpers<Item>) => {
      try {
        if (itemId) {
          const img = await upload(file);
          const updatedItem = await updateItem(itemId, {
            ...values,
            image: img?.imageUrl,
          });
          enqueueSnackbar(updatedItem?.message);
          itemsStore.updateItem(itemId, values);
        } else {
          const img = await upload(file);
          const newItem = await createItem({
            collectionId,
            ...values,
            image: img?.imageUrl,
          });
          enqueueSnackbar(newItem?.message);
          itemsStore.addItem(values);
        }

        helpers?.resetForm();
        onClose();
      } catch (error) {
        console.log(error);
      }
    };

    const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (evt.target.files && evt.target.files.length > 0) {
        setFile(evt.target.files[0]);
      }
    };

    return (
      <Modal
        open={isOpen}
        onClose={onClose}
        keepMounted
        className="flex justify-center items-center w-full "
      >
        <div className="relative w-[1240px] h-[700px] bg-teal-50/20 rounded-lg backdrop-blur-md flex justify-center items-center">
          <div className="w-full h-full overflow-y-auto px-10 py-8">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ values }) => (
                <Form className="flex flex-col gap-7 max-h-full py-2">
                  <Typography
                    variant={"h5"}
                    sx={{ textTransform: "uppercase" }}
                  >
                    {itemId
                      ? "Update item"
                      : "Create new item to your collection!"}
                  </Typography>
                  <Field
                    name={"title"}
                    component={TextFormField}
                    placeholder={"Enter the title of your collection item"}
                  />
                  <TextField
                    type={"file"}
                    onChange={handleOnChange}
                    variant={"standard"}
                  />

                  <FieldArray
                    name="tags"
                    render={arrayHelpers => (
                      <>
                        <div className=" flex flex-wrap gap-1">
                          {values.tags &&
                            values.tags.map((tag, idx) => (
                              <Chip
                                key={idx}
                                label={tag}
                                onDelete={() => arrayHelpers.remove(idx)}
                              />
                            ))}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="Enter tags"
                            className="w-full"
                            value={tagValue}
                            onChange={handleTagChange}
                          />
                          <Button
                            variant="outlined"
                            color={"inherit"}
                            onClick={() => {
                              arrayHelpers.push(tagValue);
                            }}
                            className={"w-2/12"}
                            disabled={!tagValue}
                          >
                            Add Tag
                          </Button>
                        </div>
                      </>
                    )}
                  />

                  <FieldArray
                    name={"fields"}
                    render={helper => (
                      <>
                        {values.fields && (
                          <FieldsArray
                            fields={values.fields}
                            helpers={helper}
                          />
                        )}
                      </>
                    )}
                  />
                  <Button
                    type={"submit"}
                    color={"inherit"}
                    variant={"outlined"}
                  >
                    {itemId ? "Update" : "Create"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
    );
  }
);
