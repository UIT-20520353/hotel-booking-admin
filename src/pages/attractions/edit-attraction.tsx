import { attractionApi, imageApi } from "@/api";
import { MarkerIcon } from "@/assets/icons";
import { Button, NotificationModal, TModalData } from "@/components/common";
import appConstants from "@/constants/app";
import { appURL } from "@/constants/url";
import { TAttraction } from "@/types/attraction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, cn, Input, Textarea } from "@nextui-org/react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import AutoComplete from "react-google-autocomplete";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Map, { Marker } from "react-map-gl";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor, {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Color,
  FontSize,
  Heading,
  Image,
  Indent,
  Italic,
  Strike,
} from "reactjs-tiptap-editor";
import "reactjs-tiptap-editor/style.css";
import { z } from "zod";

const schema = z.object({
  image: z
    .custom<File>((value) => value instanceof File, {
      message: "You must upload a file",
    })
    .refine((file) => file?.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    })
    .refine((file) => ["image/jpeg", "image/png"].includes(file?.type), {
      message: "File must be a JPEG or PNG image",
    }),
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  summary: z.string().nonempty("Summary is required"),
});

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 5_000,
    },
  }),
  Bold,
  Italic,
  Strike,
  Blockquote,
  BulletList,
  FontSize,
  Heading,
  Color,
  Clear,
  Indent,
  Image.configure({
    upload: (file: File) => {
      return imageApi.upload(file).then((res) => {
        if (res.body) {
          return res.body;
        }

        return "";
      });
    },
    acceptMimes: ["image/jpeg", "image/png"],
  }),
];

const EditAttraction: React.FunctionComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      summary: "",
      description: "",
      image: undefined,
    },
  });

  const [attraction, setAttraction] = useState<TAttraction | undefined>(
    undefined
  );
  const [dataPopup, setDataPopup] = useState<undefined | TModalData>(undefined);

  const image = watch("image");
  const content = watch("description");

  const [place, setPlace] = useState<{
    lat: number;
    lng: number;
    address: string;
  }>({
    lng: 106.660172,
    lat: 10.762622,
    address: "Thành phố Hồ Chí Minh",
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    const { ok, error } = await attractionApi.create({
      name: data.name,
      latitude: place.lat,
      longitude: place.lng,
      description: data.description,
      address: place.address,
      overviewImage: data.image,
      summary: data.summary,
    });

    if (ok) {
      navigate(appURL.ATTRACTIONS);
    }

    if (error) {
      setDataPopup({
        message: error.detail,
        onClose: () => setDataPopup(undefined),
        type: "error",
      });
    }
  };

  const isHtmlEmpty = (html: string): boolean => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const body = doc.body;
    return (
      body.textContent?.trim() === "" && !body.querySelector("*:not(:empty)")
    );
  };

  const getAttractionDetail = useCallback(async (attractionId: number) => {
    const { ok, body } = await attractionApi.getAttractionDetail(attractionId);

    if (ok && body) {
      const { latitude, longitude, address } = body;
      setPlace({
        lat: latitude,
        lng: longitude,
        address,
      });
      setAttraction(body);
    }
  }, []);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate(appURL.ATTRACTIONS);
    } else {
      getAttractionDetail(Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, getAttractionDetail]);

  useEffect(() => {
    if (attraction) {
      console.log(attraction);

      reset({
        name: attraction.name,
        summary: attraction.summary,
        description: attraction.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attraction]);

  return (
    <Fragment>
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-3xl font-bold">Edit attraction</h2>

          <Button
            onPress={() => navigate(appURL.ATTRACTIONS)}
            size="sm"
            color="default"
            className="text-sm font-medium"
            type="button"
          >
            Back
          </Button>
        </div>

        <Card shadow="none">
          <CardBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-start gap-5"
            >
              <div className="grid w-full grid-cols-2 gap-4">
                <div className="flex flex-col w-full col-span-1 gap-4">
                  <Input
                    size="lg"
                    placeholder="Enter attraction name"
                    label="Name"
                    labelPlacement="outside"
                    isInvalid={!!errors.name?.message}
                    errorMessage={errors.name?.message}
                    {...register("name")}
                  />
                  <Controller
                    name="image"
                    control={control}
                    defaultValue={undefined}
                    render={({ field }) => (
                      <Input
                        label="Overview image"
                        labelPlacement="outside"
                        placeholder="Select image"
                        type="file"
                        accept="image/png, image/jpeg"
                        isInvalid={!!errors.image?.message}
                        errorMessage={errors.image?.message}
                        onChange={(e) =>
                          field.onChange(e.target.files?.[0] || null)
                        }
                      />
                    )}
                  />

                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="attraction image"
                      className="object-cover object-center w-full h-auto aspect-video rounded-xl"
                    />
                  )}
                  {!!attraction?.overviewImage && !image && (
                    <img
                      src={attraction.overviewImage}
                      alt="attraction image"
                      className="object-cover object-center w-full h-auto aspect-video rounded-xl"
                    />
                  )}
                </div>

                <Controller
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea
                      size="lg"
                      label="Summary"
                      labelPlacement="outside"
                      placeholder="Enter attraction summary"
                      isInvalid={!!errors.summary?.message}
                      errorMessage={errors.summary?.message}
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      minRows={8}
                      maxRows={10}
                    />
                  )}
                  name="summary"
                />
              </div>

              <div
                data-has-elements={true}
                data-has-label={true}
                data-slot="base"
                data-filled={true}
                data-filled-within={true}
                className="group flex flex-col data-[hidden=true]:hidden w-full relative justify-end data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_12px)]"
              >
                <div className="relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-default-100 data-[hover=true]:bg-default-50 group-data-[focus=true]:bg-default-100 h-12 min-h-12 rounded-large transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background">
                  <label className="absolute pointer-events-none origin-top-left flex-shrink-0 rtl:origin-top-right subpixel-antialiased block text-foreground-500 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-foreground group-data-[filled-within=true]:pointer-events-auto pb-0 z-20 top-1/2 -translate-y-1/2 group-data-[filled-within=true]:start-0 start-3 end-auto text-medium group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_24px)] pe-2 max-w-full text-ellipsis overflow-hidden">
                    Address
                  </label>
                  <AutoComplete
                    className="w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text text-medium group-data-[has-value=true]:text-default-foreground"
                    apiKey={appConstants.VITE_GOOGLE_AUTOCOMPLETE_KEY}
                    language="en"
                    options={{
                      types: ["geocode", "establishment"],
                    }}
                    aria-placeholder="Location"
                    onPlaceSelected={(e) => {
                      if (e && e.geometry) {
                        setPlace({
                          lat: e.geometry.location.lat(),
                          lng: e.geometry.location.lng(),
                          address: e.formatted_address,
                        });
                      }
                    }}
                    defaultValue={attraction?.address}
                  />
                </div>
              </div>

              <div className="w-full">
                <Map
                  mapboxAccessToken={appConstants.VITE_MAP_BOX_KEY}
                  initialViewState={{
                    longitude: place.lng,
                    latitude: place.lat,
                    zoom: 14,
                  }}
                  style={{ width: "100%", height: "300px" }}
                  mapStyle="mapbox://styles/fle-biha/clo5rljhj00q901qv3xi3478c"
                  latitude={place.lat}
                  longitude={place.lng}
                >
                  <Marker longitude={place.lng} latitude={place.lat}>
                    <MarkerIcon size={64} color="red" />
                  </Marker>
                </Map>
              </div>

              <Card
                shadow="none"
                classNames={{ body: "p-1 space-y-2", base: "w-full" }}
              >
                <CardBody>
                  <span>Description</span>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={undefined}
                    render={({ field }) => (
                      <RichTextEditor
                        output="html"
                        content={field.value}
                        onChangeContent={(value) => field.onChange(value)}
                        extensions={extensions}
                      />
                    )}
                  />
                  <span
                    className={cn(
                      "text-tiny text-danger",
                      !isHtmlEmpty(content) &&
                        !errors.description?.message &&
                        "hidden"
                    )}
                  >
                    {errors.description?.message || "Description is required"}
                  </span>
                </CardBody>
              </Card>

              <div className="flex items-center justify-center w-full gap-3">
                <Button
                  className="w-44"
                  variant="solid"
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  className="w-44"
                  onPress={() => navigate(appURL.ATTRACTIONS)}
                  type="button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
      <NotificationModal data={dataPopup} />
    </Fragment>
  );
};

export default EditAttraction;
