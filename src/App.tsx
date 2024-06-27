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


function format(date: Date) {
    return ((date.getDate() < 10)?"0":"") + date.getDate() +"/"+(((date.getMonth()+1) < 10)?"0":"") + (date.getMonth()+1) +"/"+ date.getFullYear() + "_" + ((date.getHours() < 10)?"0":"") + date.getHours() +":"+ ((date.getMinutes() < 10)?"0":"") + date.getMinutes() +":"+ ((date.getSeconds() < 10)?"0":"") + date.getSeconds();
}


const ColorPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  elevation: 3
}));

function App() {

  const [ mirrors182xlColor, setMirrors182xlColor ] = useState("none")
  const [ mirrors182lColor,  setMirrors182lColor ] = useState("none")
  const [ mirrors182mColor,  setMirrors182mColor ] = useState("none")
  const [ mirrors182sColor,  setMirrors182sColor ] = useState("none")

  const [ mirrors111lColor,  setMirrors111lColor ] = useState("none")
  const [ mirrors111mColor,  setMirrors111mColor ] = useState("none")
  const [ mirrors111sColor,  setMirrors111sColor ] = useState("none")

  const [ mirrors67mColor,  setMirrors67mColor ] = useState("none")
  const [ mirrors67sColor,  setMirrors67sColor ] = useState("none")

  const [ mirrors40sColor,  setMirrors40sColor ] = useState("none")

  const [ mirror23xsColor,  setMirror23xsColor ] = useState("none")

  const pdfRef = useRef();

  return (    
    <Box  display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Stack direction="row" spacing={10}>
        <Stack>
          <Box ref={pdfRef}>
            <Picture 
              width={1020}
              height={690} 
              mirrors182={[
                {size: BlockSize.XL, color: mirrors182xlColor},
                {size: BlockSize.L,  color: mirrors182lColor},
                {size: BlockSize.M,  color: mirrors182mColor},
                {size: BlockSize.S,  color: mirrors182sColor},
              ]} 
              mirrors111={[
                {size: BlockSize.L,  color: mirrors111lColor},
                {size: BlockSize.M,  color: mirrors111mColor},
                {size: BlockSize.S,  color: mirrors111sColor}, 
              ]}
              mirrors67={[
                {size: BlockSize.M,  color: mirrors67mColor},
                {size: BlockSize.S,  color: mirrors67sColor}, 
              ]}
              mirrors40={[
                {size: BlockSize.S,  color: mirrors40sColor}, 
              ]} 
              mirror23Color={mirror23xsColor}        
              />
            </Box>
            <Button variant="contained" onClick={() => generatePDF(pdfRef, {filename: `ukladanka_${format(new Date())}.pdf`, page: {  margin: Margin.SMALL, format: 'a6',orientation: 'landscape'}})}>Generate PDF</Button>
          </Stack>
          <Stack spacing={2}>
            <ColorPaper>
              <Stack direction="row" spacing={5}>
                <MirrorControl block={BlockId.XL} mirror={BlockSize.XL} setColor={setMirrors182xlColor} color={mirrors182xlColor} />
                <MirrorControl block={BlockId.XL} mirror={BlockSize.L}  setColor={setMirrors182lColor}  color={mirrors182lColor}  />
                <MirrorControl block={BlockId.XL} mirror={BlockSize.M}  setColor={setMirrors182mColor}  color={mirrors182mColor}  />
                <MirrorControl block={BlockId.XL} mirror={BlockSize.S}  setColor={setMirrors182sColor}  color={mirrors182sColor}  />
              </Stack>
            </ColorPaper>
            <ColorPaper>
            <Stack direction="row" spacing={5}>
              <MirrorControl block={BlockId.L} mirror={BlockSize.L} setColor={setMirrors111lColor} color={mirrors111lColor}/>
              <MirrorControl block={BlockId.L} mirror={BlockSize.M} setColor={setMirrors111mColor} color={mirrors111mColor}/>
              <MirrorControl block={BlockId.L} mirror={BlockSize.S} setColor={setMirrors111sColor} color={mirrors111sColor}/>
            </Stack>
            </ColorPaper>
            <ColorPaper>
            <Stack direction="row" spacing={5}>
              <MirrorControl block={BlockId.M} mirror={BlockSize.M} setColor={setMirrors67mColor} color={mirrors67mColor}/>
              <MirrorControl block={BlockId.M} mirror={BlockSize.S} setColor={setMirrors67sColor} color={mirrors67sColor}/>
            </Stack>
            </ColorPaper>
            <ColorPaper>
            <Stack direction="row" spacing={5}>
              <MirrorControl block={BlockId.S} mirror={BlockSize.S} setColor={setMirrors40sColor} color={mirrors40sColor}/>
            </Stack>
            </ColorPaper>
            <ColorPaper>
            <Stack direction="row" spacing={5}>
              <MirrorControl block={BlockId.XS} mirror={BlockSize.S} setColor={setMirror23xsColor} color={mirror23xsColor}/>
            </Stack>
            </ColorPaper>
          </Stack>
      </Stack>
    </Box>
  );
}

export default App;
