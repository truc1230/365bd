import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";

const DialogCTM = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
type Props = {
  open: boolean;
  handleClose: Function;
  closeButton?: boolean;
  children?: React.ReactNode;
  header?: React.ReactNode;
  minWidth?: string;
  height?: string;
  position?: string;
};

const DialogCTMTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs({
  open,
  handleClose,
  header,
  children,
}: Props) {
  return (
    <DialogCTM
      onClose={() => {
        handleClose(false);
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogCTMTitle
        id="customized-dialog-title"
        onClose={() => {
          handleClose(false);
        }}
      >
        {header}
      </DialogCTMTitle>
      <DialogContent dividers>{children}</DialogContent>
    </DialogCTM>
  );
}
