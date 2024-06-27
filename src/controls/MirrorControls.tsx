import { Dispatch, SetStateAction } from "react";
import { BlockId, BlockSize } from "../svg/BlockSize";
import Picture from "../svg/Picture";
import { MirrorProps } from "../svg/Mirror";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup, { toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";
import ToggleButton, { toggleButtonClasses } from "@mui/material/ToggleButton";
import { makeStyles, styled } from "@mui/material/styles";

export interface MirrorControlsProps {
    block: BlockId
    mirror: BlockSize
    setColor: Dispatch<SetStateAction<string>>
    color: string
}

const ColorToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: "none",
    marginTop: "0"
  },
  [`& .${toggleButtonGroupClasses.lastButton}`]: {

    },
}))

export default function MirrorControl(props: MirrorControlsProps) {
    const mirror : MirrorProps = {size: props.mirror, color: props.color == "none" ? "rgb(219, 219, 219)" : props.color}
    const handleSetColor = (
        _event: React.MouseEvent<HTMLElement>,
        newColor: string | null,
      ) => {
        props.setColor(newColor ?? "none");
      };
    return (
        <Stack direction="row" spacing={2}>
            <Picture width={204} height={138} strokeColor="rgb(21,101,192)"
                mirrors182={props.block == BlockId.XL ? [mirror] : []}
                mirrors111={props.block == BlockId.L ? [mirror] : []}
                mirrors67={props.block == BlockId.M ? [mirror] : []}
                mirrors40={props.block == BlockId.S ? [mirror] : []}
                mirror23Color={props.block == BlockId.XS ? mirror.color : "none"}
            />
                
            <ColorToggleButtonGroup
              value="none"
              orientation="vertical"
              exclusive
              onChange={handleSetColor}
            >
              <ToggleButton value="#ED1C24" sx={[
                { backgroundColor:"#ED1C24" },
                { '&:hover': {backgroundColor:"#F69598", borderColor:"black"}}
              ]} />
              <ToggleButton value="#22B14C" sx={[
                {backgroundColor:"#22B14C"},
                { '&:hover': {backgroundColor:"#97DAAB"}}
              ]} />
              <ToggleButton value="#00A2E8" sx={[
                {backgroundColor:"#00A2E8"},
                { '&:hover': {backgroundColor:"#88D3F4"}}
              ]} />
              <ToggleButton value="#EFE4B0" sx={[
                {backgroundColor:"#EFE4B0"},
                { '&:hover': {backgroundColor:"#F7F2DA"}}
              ]} />
              <ToggleButton value="#FFAEC9" sx={[
                {backgroundColor:"#FFAEC9"},
                { '&:hover': {backgroundColor:"#FFD9E5"}}
              ]} />
              <ToggleButton value="none" sx={{backgroundColor:"rgb(219, 219, 219)"}}></ToggleButton>
            </ColorToggleButtonGroup>
        </Stack>
    )
}