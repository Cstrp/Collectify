import {
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";
import { CollectionModalProps } from "./CollectionModalProps.ts";
import { useSnackbar } from "notistack";
import {
  Autocomplete,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import {
  api,
  Collection,
  collectionStore,
  createCollection,
  updateCollection,
  upload,
} from "../../../../../data";
import { FieldsArray, TextFormField } from "../../../Common";
import { useEffect, useState } from "react";

export const CollectionModal = observer(
  ({ isOpen, onClose, collection, collectionId }: CollectionModalProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [themes, setThemes] = useState<string[]>([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
      const fetchThemes = async () => {
        try {
          const res = await api.get<string>("/listOfCollectibles.txt");
          const fetchedThemes = res.data.split("\n").map(str => str.trim());
          setThemes(fetchedThemes);
        } catch (error) {
          console.log(error);
        }
      };

      fetchThemes();
    }, []);

    const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (evt.target.files && evt.target.files.length > 0) {
        setFile(evt.target.files[0]);
      }
    };

    const initialValues: Collection = {
      name: collection?.name || "",
      theme: collection?.theme || "",
      description: collection?.description || "",
      fields: collection?.fields || [{ type: "", name: "" }],
    };

    const onSubmit = async (
      values: Collection,
      helpers?: FormikHelpers<Collection>
    ) => {
      try {
        if (collectionId) {
          const img = await upload(file);

          const updatedCollection = await updateCollection(collectionId, {
            ...values,
            image: img?.imageUrl,
          });

          collectionStore.updateCollection(collectionId, {
            ...values,
            image: img?.imageUrl,
          });
          enqueueSnackbar(updatedCollection?.message);
        } else {
          const img = await upload(file);

          const newCollection = await createCollection({
            ...values,
            image: img?.imageUrl,
          });

          collectionStore.addCollection({ ...values, image: img?.imageUrl });
          enqueueSnackbar(newCollection?.message);
        }

        helpers?.resetForm();
        onClose();
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Modal
        open={isOpen}
        onClose={onClose}
        className="flex justify-center items-center w-full "
        keepMounted
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
                    {collectionId
                      ? "Update collection"
                      : "Create new collection!"}
                  </Typography>
                  <Field
                    name="name"
                    component={TextFormField}
                    placeholder="Enter the name of your collection"
                  />

                  <Field name="theme">
                    {({ field, form }: FieldProps) => (
                      <Autocomplete
                        options={themes}
                        getOptionLabel={option => option}
                        value={field.value}
                        onChange={(_, value) =>
                          form.setFieldValue(field.name, value)
                        }
                        onBlur={field.onBlur}
                        renderInput={params => (
                          <TextField
                            variant={"standard"}
                            {...params}
                            placeholder="Enter the theme of your collection"
                          />
                        )}
                      />
                    )}
                  </Field>

                  <Field
                    name="description"
                    component={TextFormField}
                    placeholder="Enter the description of your collection"
                  />

                  <TextField
                    type={"file"}
                    onChange={handleOnChange}
                    variant={"standard"}
                  />

                  <FieldArray
                    name="fields"
                    render={arrayHelpers => (
                      <FieldsArray
                        fields={values.fields}
                        helpers={arrayHelpers}
                      />
                    )}
                  />

                  <Button
                    type={"submit"}
                    variant={"outlined"}
                    color={"inherit"}
                  >
                    {collectionId ? "Update!" : "Create!"}
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
