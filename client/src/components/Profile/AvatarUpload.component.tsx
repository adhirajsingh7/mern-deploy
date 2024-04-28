import { useEffect, useMemo, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDropzone } from "react-dropzone";
import { useUpdateUser } from "@/features/users/api/updateUser";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import "./AvatarUpload.styles.scss";

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

export const AvatarUploadComponent = (props: any) => {
  const { avatar: userAvatar, _id: userId } = props;
  const [files, setFiles] = useState<any>([]);

  const { isPending, mutate } = useUpdateUser({ userId });

  useEffect(() => {
    setFiles([{ preview: userAvatar }]);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
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

  const avatarContainer = files.map((file, index) => (
    <img
      key={index}
      src={file.preview}
      className="avatar-image"
      // Revoke data uri after image is loaded
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  const handleImageUpload = (e) => {
    e.preventDefault();

    if (Object.keys(files[0]).length > 1) {
      //  upload
      mutate({ avatar: files });
    }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ p: 2, border: 1, borderRadius: "10px", borderColor: "#dee0e3" }}
      >
        <Stack direction="column" sx={{ width: "270px" }}>
          <Typography variant="body1" fontWeight={600}>
            Profile Photo
          </Typography>
          <Typography variant="body2" sx={{ color: "#647692" }}>
            This image will be displayed on your profile
          </Typography>
        </Stack>
        <Stack
          direction="column"
          gap={2}
          sx={{ border: 1, bgcolor: "#FBFCFF", borderColor: "#dee0e3", p: 2 }}
        >
          <form onSubmit={handleImageUpload} encType="multipart/form-data">
            <Stack direction="row" gap={4} className="container">
              {avatarContainer}
              <Stack direction="column" gap={2}>
                <Box
                  {...getRootProps({ className: "dropzone-container", style })}
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
                      <span style={{ fontWeight: 600 }}>Click to upload</span>{" "}
                      or drag and drop
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#647692" }}>
                      JPG, PNG, or GIF (Recommended size 1000x1000px)
                    </Typography>
                  </Stack>
                </Box>
                <Stack direction="row" justifyContent="flex-end">
                  <Button color="inherit" sx={{ textTransform: "none" }}>
                    Cancel
                  </Button>
                  <LoadingButton
                    type="submit"
                    loading={isPending}
                    loadingPosition="center"
                    sx={{ textTransform: "none" }}
                  >
                    <span>Save</span>
                  </LoadingButton>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </>
  );
};
