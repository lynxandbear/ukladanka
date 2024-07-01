import { MirrorSize, SlotSize} from "../svg/MirrorSize";
import Picture from "../svg/Picture";
import { MirrorProps } from "../svg/Mirror";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup, { ToggleButtonGroupProps, toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";
import {useTheme} from "@mui/material";

export interface MirrorControlsProps {
    block: SlotSize
    mirror: MirrorSize
    setColor: (colors: string) => void
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
    const theme = useTheme()
    const mirror : MirrorProps = {size: props.mirror, color: props.color == "none" ? "rgb(219, 219, 219)" : props.color}
    const slots = new Map<SlotSize, MirrorProps[]>(SlotSize.all.map(s => [s, []]))
    slots.set(props.block, [mirror])
    return (
        <Stack direction="row" spacing={2}>
            <Picture width={204} height={138} strokeColor={theme.palette.primary.main} slots={slots} />                
            <ColorToggleButtonGroup onChange={(_, c) => props.setColor(c)}>
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