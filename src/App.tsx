import './App.css';
import Picture from './svg/Picture';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';



import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BlockId, BlockSize } from './svg/BlockSize';
import MirrorControl from './controls/MirrorControls';
import { useRef, useState } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import generatePDF, { Margin } from 'react-to-pdf';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import { Container } from '@mui/material';


function format(date: Date) {
  return ((date.getDate() < 10) ? "0" : "") + date.getDate() + "/" + (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear() + "_" + ((date.getHours() < 10) ? "0" : "") + date.getHours() + ":" + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":" + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();
}

const ColorPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  elevation: 3
}));

function App() {

  const [mirrors182xlColor, setMirrors182xlColor] = useState("none")
  const [mirrors182lColor, setMirrors182lColor] = useState("none")
  const [mirrors182mColor, setMirrors182mColor] = useState("none")
  const [mirrors182sColor, setMirrors182sColor] = useState("none")

  const [mirrors111lColor, setMirrors111lColor] = useState("none")
  const [mirrors111mColor, setMirrors111mColor] = useState("none")
  const [mirrors111sColor, setMirrors111sColor] = useState("none")

  const [mirrors67mColor, setMirrors67mColor] = useState("none")
  const [mirrors67sColor, setMirrors67sColor] = useState("none")

  const [mirrors40sColor, setMirrors40sColor] = useState("none")

  const [mirror23xsColor, setMirror23xsColor] = useState("none")

  const [xlAnchorEl, setXLAnchorEl] = useState<SVGElement | null>(null);
  const [lAnchorEl, setLAnchorEl] = useState<SVGElement | null>(null);
  const [mAnchorEl, setMAnchorEl] = useState<SVGElement | null>(null);
  const [sAnchorEl, setSAnchorEl] = useState<SVGElement | null>(null);
  const [xsAnchorEl, setXSAnchorEl] = useState<SVGElement | null>(null);

  const handle182Click = (event: React.MouseEvent<SVGElement>) => {
    setXLAnchorEl(event.currentTarget);
  };
  const handle182Close = () => {
    setXLAnchorEl(null);
  };
  const handle111Click = (event: React.MouseEvent<SVGElement>) => {
    setLAnchorEl(event.currentTarget);
  };
  const handle111Close = () => {
    setLAnchorEl(null);
  };
  const handle67Click = (event: React.MouseEvent<SVGElement>) => {
    setMAnchorEl(event.currentTarget);
  };
  const handle67Close = () => {
    setMAnchorEl(null);
  };
  const handle40Click = (event: React.MouseEvent<SVGElement>) => {
    setSAnchorEl(event.currentTarget);
  };
  const handle40Close = () => {
    setSAnchorEl(null);
  };
  const handle23Click = (event: React.MouseEvent<SVGElement>) => {
    setXSAnchorEl(event.currentTarget);
  };
  const handle23Close = () => {
    setXSAnchorEl(null);
  };

  const pdfRef = useRef();

  return (
    <>
    <Container>
        <Stack>
          <Box id="mainPicture" ref={pdfRef}>
            <Picture
              width="100%"
              height="100%"
              mirrors182={[
                { size: BlockSize.XL, color: mirrors182xlColor },
                { size: BlockSize.L, color: mirrors182lColor },
                { size: BlockSize.M, color: mirrors182mColor },
                { size: BlockSize.S, color: mirrors182sColor },
              ]}
              mirrors111={[
                { size: BlockSize.L, color: mirrors111lColor },
                { size: BlockSize.M, color: mirrors111mColor },
                { size: BlockSize.S, color: mirrors111sColor },
              ]}
              mirrors67={[
                { size: BlockSize.M, color: mirrors67mColor },
                { size: BlockSize.S, color: mirrors67sColor },
              ]}
              mirrors40={[
                { size: BlockSize.S, color: mirrors40sColor },
              ]}
              mirror23Color={mirror23xsColor}

              onBlock182Click={handle182Click}
              onBlock111Click={handle111Click}
              onBlock67Click={handle67Click}
              onBlock40Click={handle40Click}
              onBlock23Click={handle23Click}
            />
          </Box>
          <Button variant="contained" onClick={() => generatePDF(pdfRef, { filename: `ukladanka_${format(new Date())}.pdf`, page: { margin: Margin.SMALL, format: 'a6', orientation: 'landscape' } })}>Generate PDF</Button>
        </Stack>
      </Container>
      <Popover
        open={Boolean(xlAnchorEl)}
        onClose={handle182Close}
        anchorEl={xlAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <ColorPaper>
          <Stack direction="column" spacing={5}>
            <MirrorControl block={BlockId.XL} mirror={BlockSize.XL} setColor={setMirrors182xlColor} color={mirrors182xlColor} />
            <MirrorControl block={BlockId.XL} mirror={BlockSize.L} setColor={setMirrors182lColor} color={mirrors182lColor} />
            <MirrorControl block={BlockId.XL} mirror={BlockSize.M} setColor={setMirrors182mColor} color={mirrors182mColor} />
            <MirrorControl block={BlockId.XL} mirror={BlockSize.S} setColor={setMirrors182sColor} color={mirrors182sColor} />
          </Stack>
        </ColorPaper>
      </Popover>

      <Popover
        open={Boolean(lAnchorEl)}
        onClose={handle111Close}
        anchorEl={lAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <ColorPaper>
          <Stack direction="column" spacing={5}>
            <MirrorControl block={BlockId.L} mirror={BlockSize.L} setColor={setMirrors111lColor} color={mirrors111lColor} />
            <MirrorControl block={BlockId.L} mirror={BlockSize.M} setColor={setMirrors111mColor} color={mirrors111mColor} />
            <MirrorControl block={BlockId.L} mirror={BlockSize.S} setColor={setMirrors111sColor} color={mirrors111sColor} />
          </Stack>
        </ColorPaper>
      </Popover>

      <Popover
        open={Boolean(mAnchorEl)}
        onClose={handle67Close}
        anchorEl={mAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <ColorPaper>
          <Stack direction="column" spacing={5}>
            <MirrorControl block={BlockId.M} mirror={BlockSize.M} setColor={setMirrors67mColor} color={mirrors67mColor} />
            <MirrorControl block={BlockId.M} mirror={BlockSize.S} setColor={setMirrors67sColor} color={mirrors67sColor} />
          </Stack>
        </ColorPaper>
      </Popover>

      <Popover
        open={Boolean(sAnchorEl)}
        onClose={handle40Close}
        anchorEl={sAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <ColorPaper>
          <Stack direction="column" spacing={5}>
            <MirrorControl block={BlockId.S} mirror={BlockSize.S} setColor={setMirrors40sColor} color={mirrors40sColor} />
          </Stack>
        </ColorPaper>
      </Popover>

      <Popover
        open={Boolean(xsAnchorEl)}
        onClose={handle23Close}
        anchorEl={xsAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <ColorPaper>
          <Stack direction="column" spacing={5}>
            <MirrorControl block={BlockId.XS} mirror={BlockSize.S} setColor={setMirror23xsColor} color={mirror23xsColor} />
          </Stack>
        </ColorPaper>
      </Popover>
    </>
  );
}

export default App;
