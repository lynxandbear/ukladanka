import React, {createContext, type MouseEvent, ReactNode, type TouchEvent} from "react";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;
import {G, Path, Rect, Svg} from "@react-pdf/renderer";
import {EditorPopover} from "../svg/Block";
import {SlotSize} from "../svg/MirrorSize";
import {MirrorProps} from "../svg/Mirror";
import {PopupState} from "material-ui-popup-state/hooks";

export interface UniPathProps {
    d: string
    fill?: string
    className?: string
}

export interface UniSvgProps {
    width: string | number
    height: string | number
    viewBox: string
    fill?: string
    children? : ReactNode | undefined}

export interface UniGTransformProps {
    x: number,
    y: number,
    orientation: 0 | 90 | 180 | 270,
    width: number,
    height: number,
}

export interface UniGProps {
    transform? :UniGTransformProps
    children? : ReactNode | undefined
    className? : string
    pointerEvents? : string

    onClick?: (event: MouseEvent) => void;
    onTouchStart?: (event: TouchEvent) => void;
    'aria-controls'?: string;
    'aria-describedby'?: string;
    'aria-haspopup'?: true;
}
export interface UniRectProps {
    width: string | number
    height: string | number
    className? : string
    rx?: string
    ry?: string
    stroke?: string
    fill?: string
}
export interface UniEditorProps {
    size: SlotSize
    strokeColor?: string
    mirrors: MirrorProps[]
    popupState: PopupState
}

export interface RenderingContextInterface {
    renderPath(props: UniPathProps): JSX.Element
    renderSvg(props: UniSvgProps): JSX.Element
    renderG(props: UniGProps): JSX.Element
    renderRect(props: UniRectProps): JSX.Element
    renderEditor(props: UniEditorProps): JSX.Element | null
}

class WebContext implements RenderingContextInterface {
    renderPath(props: UniPathProps): JSX.Element {
        return <path {...props} />
    }
    renderSvg(props: UniSvgProps): JSX.Element {
        return <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
            pointerEvents="none" />
    }
    renderG({transform, ...props}: UniGProps): JSX.Element {
        const transformProp = transform === undefined ? undefined : `translate(${transform.x} ${transform.y}) rotate(${transform.orientation} ${transform.width / 2} ${transform.height / 2})`
        return <g transform={transformProp} {...props} />
    }
    renderRect(props: UniRectProps): JSX.Element {
        return <rect {...props} />
    }
    renderEditor(props: UniEditorProps): jsx.JSX.Element | null {
        return <EditorPopover {...props} />
    }
}

class PdfContext implements RenderingContextInterface {
    renderPath(props: UniPathProps): JSX.Element {
        return <Path {...props} />
    }
    renderSvg(props: UniSvgProps): JSX.Element {
        return <Svg {...props}/>
    }
    
    private gTransformProp(transform: UniGTransformProps): string {
        const translateX = [90, 180].includes(transform.orientation) ? transform.x + transform.width : transform.x
        const translateY = [180, 270].includes(transform.orientation) ? transform.y + transform.height : transform.y
        return `translate(${translateX} ${translateY}) rotate(${transform.orientation} ${transform.width / 2} ${transform.height / 2})`        
    }
    
    renderG({transform, ...props}: UniGProps): JSX.Element {
        const transformProp = transform === undefined ? undefined : this.gTransformProp(transform)
        return <G transform={transformProp} {...props} />
    }
    renderRect(props: UniRectProps): JSX.Element {
        return <Rect {...props} />
    }
    renderEditor(_props: UniEditorProps): jsx.JSX.Element | null {
        return null
    }
}

export class RenderingContexts {
    static readonly Web: RenderingContextInterface = new WebContext()
    static readonly Pdf: RenderingContextInterface = new PdfContext()
}

export const RenderingContext = createContext<RenderingContextInterface>(RenderingContexts.Web)