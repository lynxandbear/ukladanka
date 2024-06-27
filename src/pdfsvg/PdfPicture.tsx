import { G, Rect, Svg } from "@react-pdf/renderer"
import { MirrorProps } from "../svg/Mirror"
import { PdfBlock23 } from "./PdfBlock23"
import { PdfBlock } from "./PdfBlock"
import { BlockSize } from "../svg/BlockSize"

export interface PdfPictureProps {
    width:  number | string
    height: number | string

    mirrors182? : MirrorProps[]
    mirrors111? : MirrorProps[]
    mirrors67?  : MirrorProps[]
    mirrors40?  : MirrorProps[]

    mirror23Color? : string
}

export default function Picture(props: PdfPictureProps) {    
    return(<>
        <Svg 
            width={props.width} height={props.height} 
            viewBox="0 0 340 230" fill="none">
            <G transform="translate(5,5)">
                <Rect width="330" height="220" rx="3" ry="3" stroke="black" fill="none"/>
                <PdfBlock size={BlockSize.XL} 
                  x={16.5+182} y={19+182} orientation={180} 
                  mirrors={props.mirrors182 ?? []}/>

                <PdfBlock size={BlockSize.L} 
                  x={202.5} y={19+111} orientation={270} 
                  mirrors={props.mirrors111 ?? []}/>

                <PdfBlock size={BlockSize.M} 
                  x={246.5} y={134} orientation={0}  
                  mirrors={props.mirrors67 ?? []}/>

                <PdfBlock size={BlockSize.S} 
                  x={202.5+40} y={161} orientation={90}
                  mirrors={props.mirrors40 ?? []}/>

                <PdfBlock23                  
                  x={202.5} y={134}
                  mirrorColor={props.mirror23Color ?? "none" }/>
            </G>
        </Svg>
    </>)
}