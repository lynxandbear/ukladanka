import './App.css';
import Picture from './svg/Picture';
import Box from '@mui/material/Box';

import {Document, Page, usePDF} from '@react-pdf/renderer'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {SlotSize} from './svg/MirrorSize';
import React, {useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import {Container} from '@mui/material';
import PdfPicture from './pdfsvg/PdfPicture';
import {MirrorProps} from "./svg/Mirror";
import {useAppSelector} from "./app/hooks";
import Stack from "@mui/material/Stack";


function format(date: Date) {
    return ((date.getDate() < 10) ? "0" : "") + date.getDate() + "/" + (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear() + "_" + ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":" + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":" + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();
}

function App() {
    const colors = useAppSelector(state => state.picture.slots)

    const pdfRef = useRef();


    function mirrorPropsFor(slot: SlotSize): MirrorProps[] {
        return slot.mirrors.map<MirrorProps>(size => ({size, color: colors[slot.name][size]}))
    }

    const Pdf = (
        <Document title="Układanka" pageLayout="singlePage">
            <Page size="A6" orientation="landscape">
                <PdfPicture
                    width="100%" height="100%"
                    slots={new Map(SlotSize.all.map(slotSize => [slotSize, mirrorPropsFor(slotSize)]))}
                ></PdfPicture>
            </Page>
        </Document>
    );

    const [instance, updateInstance] = usePDF();

    useEffect(() => updateInstance(Pdf), [Pdf]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.download = `ukladanka_${format(new Date())}.pdf`;
        link.href = instance.url ?? "";
        link.click();
    };

    return (
        <Container>
            <Stack>
                <Box id="mainPicture" ref={pdfRef}>
                    <Picture editable
                             width="100%"
                             height="100%"
                             slots={new Map(SlotSize.all.map(slotSize => [slotSize, mirrorPropsFor(slotSize)]))}
                    />
                </Box>
                <Button variant="contained" onClick={handleDownload} disabled={instance.loading}>
                    {instance.loading ? "Generating PDF..." : "Download PDF"}
                </Button>
            </Stack>
        </Container>
    );
}

export default App;
