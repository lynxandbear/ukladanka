import { Dispatch, SetStateAction } from "react";
import { BlockId, BlockSize } from "../svg/BlockSize";
import Picture from "../svg/Picture";
import { MirrorProps } from "../svg/Mirror";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup, { ToggleButtonGroupProps, toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";
import ToggleButton, { toggleButtonClasses } from "@mui/material/ToggleButton";
import { makeStyles, styled } from "@mui/material/styles";

export interface MirrorControlsProps {
    block: BlockId
    mirror: BlockSize
    setColor: Dispatch<SetStateAction<string>>
    color: string
}

const ColorToggleButtonGroup = (props: ToggleButtonGroupProps) => 
  <ToggleButtonGroup exclusive value="none" orientation="vertical"
    sx={[
      { [`& .${toggleButtonGroupClasses.grouped}`]: { border: "none",  marginTop: "0" }}
    ]}
    {...props} />


const ColorToggleButton = ({color, hoverColor, value}: {color: string, hoverColor: string, value?: string}) =>
  <ToggleButton value={value ?? color} sx={[
    { backgroundColor: color },
    { '&:hover': { backgroundColor: hoverColor }}
  ]} />

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
                
            <ColorToggleButtonGroup onChange={handleSetColor}>
              <ColorToggleButton color="#ED1C24" hoverColor="#F69598" />
              <ColorToggleButton color="#22B14C" hoverColor="#97DAAB" />
              <ColorToggleButton color="#00A2E8" hoverColor="#88D3F4" />
              <ColorToggleButton color="#EFE4B0" hoverColor="#F7F2DA" />
              <ColorToggleButton color="#FFAEC9" hoverColor="#FFD9E5" />
              <ColorToggleButton color="#DBDBDB" hoverColor="#ABABAB" value="none" />
            </ColorToggleButtonGroup>
        </Stack>
    )
}