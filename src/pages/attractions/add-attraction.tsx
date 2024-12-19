import { imageApi } from "@/api";
import { MarkerIcon } from "@/assets/icons";
import { Button } from "@/components/common";
import appConstants from "@/constants/app";
import { appURL } from "@/constants/url";
import { Card, CardBody, Input } from "@nextui-org/react";
import React, { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { useNavigate } from "react-router-dom";
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

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50,
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

const AddAttraction: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState<string>("");

  const onChangeContent = (value: string) => {
    setContent(value);
  };

  console.log(content);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-bold">Add attraction</h2>

        <Button
          onPress={() => navigate(appURL.ATTRACTIONS)}
          size="md"
          color="default"
          className="text-base"
        >
          Back
        </Button>
      </div>

      <Card shadow="none">
        <CardBody>
          <div className="flex flex-col items-start gap-5">
            <Input
              size="lg"
              placeholder="Enter attraction name"
              label="Name"
              labelPlacement="outside"
            />
            <Input
              size="lg"
              placeholder="Enter attraction address"
              label="Address"
              labelPlacement="outside"
            />

            <div className="w-full">
              <Map
                mapboxAccessToken={appConstants.VITE_MAP_BOX_KEY}
                initialViewState={{
                  longitude: -122.4,
                  latitude: 37.8,
                  zoom: 14,
                }}
                style={{ width: "100%", height: "400px" }}
                mapStyle="mapbox://styles/fle-biha/clo5rljhj00q901qv3xi3478c"
              >
                <Marker longitude={-122.4} latitude={37.8}>
                  <MarkerIcon color="red" />
                </Marker>
              </Map>
            </div>

            <Card
              shadow="none"
              classNames={{ body: "p-1 space-y-2", base: "w-full" }}
            >
              <CardBody>
                <span>Description</span>
                <RichTextEditor
                  output="html"
                  content={content}
                  onChangeContent={onChangeContent}
                  extensions={extensions}
                  disabled
                />
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddAttraction;
