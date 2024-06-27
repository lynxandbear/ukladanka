import { Dispatch, SetStateAction } from "react";
import { BlockId, BlockSize } from "../svg/BlockSize";
import Picture from "../svg/Picture";
import { MirrorProps } from "../svg/Mirror";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { makeStyles } from "@mui/material/styles";

export interface MirrorControlsProps {
    block: BlockId
    mirror: BlockSize
    setColor: Dispatch<SetStateAction<string>>
    color: string
}

export default function MirrorControl(props: MirrorControlsProps) {
    const mirror : MirrorProps = {size: props.mirror, color: props.color == "none" ? "rgb(219, 219, 219)" : props.color}
    const handleSetColor = (
        _event: React.MouseEvent<HTMLElement>,
        newColor: string | null,
      ) => {
        props.setColor(newColor ?? "none");
      };
    return (
        <Stack spacing={2}>
            <Picture width={136} height={92} strokeColor="rgb(21,101,192)"
                mirrors182={props.block == BlockId.XL ? [mirror] : []}
                mirrors111={props.block == BlockId.L ? [mirror] : []}
                mirrors67={props.block == BlockId.M ? [mirror] : []}
                mirrors40={props.block == BlockId.S ? [mirror] : []}
                mirror23Color={props.block == BlockId.XS ? mirror.color : "none"}
            />
            <Stack direction="row" spacing={2}>
                
    <ToggleButtonGroup
      value="none"
      exclusive
      onChange={handleSetColor}
    >
      <ToggleButton value="#ED1C24" sx={{backgroundColor:"#ED1C24"}}></ToggleButton>
      <ToggleButton value="#22B14C" sx={{backgroundColor:"#22B14C"}}></ToggleButton>
      <ToggleButton value="#00A2E8" sx={{backgroundColor:"#00A2E8"}}></ToggleButton>
      <ToggleButton value="#EFE4B0" sx={{backgroundColor:"#EFE4B0"}}></ToggleButton>
      <ToggleButton value="#FFAEC9" sx={{backgroundColor:"#FFAEC9"}}></ToggleButton>
      <ToggleButton value="none" sx={{backgroundColor:"rgb(219, 219, 219)"}}></ToggleButton>
    </ToggleButtonGroup>
            </Stack>
        </Stack>
    )
}