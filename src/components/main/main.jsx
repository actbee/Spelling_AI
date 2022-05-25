import "./main.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import {useState, useRef} from "react";
import {levenshteinDistance} from "../distance/distance"


export default function Main(){
    const [check, setcheck] = useState(false);
    const [incorrect, setincorrect] = useState(false);
    const [test, settest] = useState("NA");
    const [check_result, setcheckresult] = useState(" ");
    var dict = {}
    const matchlist = [{word: "aaa", dis: 0.0},{word: "baa", dis: 0.1},{word: "caa", dis: 1.0},{word: "ada", dis: 3.0},
    {word: "affa", dis: 5.0}];
    const predictRef = useRef(" ")
    const dicRef = useRef(" ")

    


    const check_click = () => {
       // if input matches any of the words in the list, then print this word is spelled correctly
       settest(predictRef.current.value);
        setcheck(true);
        var spellcheck_input = test;
        console.log(spellcheck_input);
        var incorrect = true;
        for (var value in dict) {
            if (dict[value].toLowerCase() == spellcheck_input.toLowerCase()) {
                setcheckresult("this word is spelled correctly");
                incorrect = false;
                setincorrect(false);
                break;
            }
        }        
        if (incorrect) {
            setcheckresult("this word is spelled incorrectly");
            setincorrect(true);
           // computes a suggestionScore for each word in the dictionary by levenshtein distance and word frequency
           var suggestionScore = [];
           for (var j = 0; j < dict.length; j++) {
             var word = dict[j];
             var distance = levenshteinDistance(spellcheck_input, word);
             var score = dict[j].dis;
             suggestionScore.push(distance + score);
           }
           // sorts the suggestionScore array by suggestionScore
           suggestionScore.sort(function(a, b) {
             return a.dis - b.dis;
           }
           );
           // prints the top 5 suggestions
           console.log("suggestions: ");
           for (var i = 0; i < 5; i++) {
             console.log(suggestionScore[i]);
           }

         }
    }

    const savedict = () => {
      // put the user input from id training_text into dict
      var text = dicRef.current.value;
      var words = text.split(" ");
      // put words into dict
      for (let i = 0; i < words.length; i++){
        dict[i] = words[i];
      }
      console.log("updated dict!");
      console.log(dict);
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
                    inputRef={predictRef}
                 />
                <Box m={2}>
                <Button margin="20px" size = "large" variant = "contained"  onClick = {check_click}>Check Spelling</Button>
                </Box>
                <p>Levenshtein Distance Scalar</p>
                <Slider
               aria-label="distance"
               defaultValue={50}
               valueLabelDisplay="auto"
               step={10}
               marks
               min={0}
               max={100}
                />
                <p>Word Frequency Scalar</p>
                <Slider
               aria-label="frequency"
               defaultValue={50}
               valueLabelDisplay="auto"
               step={10}
               marks
               min={0}
               max={100}
                />
            </div>
            {    check &&
            <div className = "spell_check">
                <p1>Cloest Match: </p1>   
                <p1>{check_result}</p1>   
                {  
                    incorrect &&
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
                    inputRef={dicRef}
                 />
              <Box m={2}>
                <Button margin="20px" size = "large" variant = "contained"  onClick = {savedict}>Update Reference Dictionary</Button>
              </Box>     
            </div>
        </div>
        </div>    
    )
}