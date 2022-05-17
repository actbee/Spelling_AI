import "./main.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react";

export default function Main(){
    const [check, setcheck] = useState(false);
    const matchlist = [{word: "aaa", dis: 0.0},{word: "baa", dis: 0.1},{word: "caa", dis: 1.0},{word: "ada", dis: 3.0},
    {word: "affa", dis: 5.0},{word: "aweaa", dis: 5.5},{word: "aa12a", dis: 6.0},{word: "aaera", dis: 7.0},
    {word: "aavva", dis: 7.8},{word: "ddaaa", dis: 8.0}];
    
    const check_click = () => {
        setcheck(true)
    }

    return(
        <div className = "main">

          <div className = "left">     
            <div className = "inputbox">
                <p1>
                    Enter a word to spell check:
                </p1>
                <TextField
                    id="spellcheck_input"
                    label="Input Text"
                    multiline
                    rows={1}
                    padding
                    inputProps = {{style: {fontSize: 20}}}
                    fullWidth 
                    margin = "normal"
                 />
                <Box m={2}>
                <Button margin="20px" size = "large" variant = "contained"  onClick = {check_click}>Check</Button>
                </Box>
            </div>
            {    check &&
            <div className = "spell_check">
                <p1>Cloest Mach: </p1>
                {
                  matchlist.map(res => (<p key={res.word}>
                    {res.word}: {res.dis}
                  </p>))
               }
            </div>
             }
        </div>
        <div className = "right">
            <div className = "train_text">
            <p1>Enter texts to train: </p1>
            <TextField
                    id="training_text"
                    label="Training Text"
                    multiline
                    rows={20}
                    padding
                    inputProps = {{style: {fontSize: 20}}}
                    fullWidth 
                    margin = "normal"
                 />
              <Box m={2}>
                <Button margin="20px" size = "large" variant = "contained"  >Train</Button>
              </Box>     
            </div>
        </div>
        </div>    
    )
}