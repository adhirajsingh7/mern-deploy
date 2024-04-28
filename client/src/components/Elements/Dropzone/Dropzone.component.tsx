import React, { useEffect, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useDropzone } from "react-dropzone";
import "./Dropzone.styles.scss";

const baseStyle = {
  borderColor: "#eeeeee",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

interface DropzonePropType {
  displayImage?: string;
  displayImageClassName: string;
  files: any[];
  setFiles: (image: any) => void;
}

export const DropzoneComponent = (props: DropzonePropType) => {
  const { displayImage, displayImageClassName, files, setFiles } = props;

  useEffect(() => {
    setFiles([{ preview: displayImage }]);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          setFiles([
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ]);
        }
      },
    });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const DisplayImage = files.map((file, index) => (
    <img
      key={index}
      src={file.preview}
      className={displayImageClassName}
      // Revoke data uri after image is loaded
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  return (
    <Stack
      direction="column"
      gap={2}
      sx={{ border: 1, bgcolor: "#FBFCFF", borderColor: "#dee0e3", p: 2 }}
    >
      <Stack direction="row" gap={4} className="container" sx={{ width: 1 }}>
        {DisplayImage}
        <Stack direction="column" gap={2}>
          <Box
            {...getRootProps({
              className: "dropzone-container",
              style,
            })}
          >
            <input {...getInputProps()} />
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <Box className="upload-outer-container">
                <Box className="upload-inner-container">
                  <CloudUploadOutlinedIcon style={{ color: "#15c4da" }} />
                </Box>
              </Box>
              <Typography variant="body2">
                <span style={{ fontWeight: 600 }}>Click to upload</span> or drag
                and drop
              </Typography>
              <Typography variant="body2" sx={{ color: "#647692" }}>
                JPG, PNG, or GIF (Recommended size 1000x1000px)
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
