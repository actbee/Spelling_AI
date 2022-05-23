import "./main.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react";

export default function Main(){
    const [check, setcheck] = useState(false);
    var dict = {}
    const matchlist = [{word: "aaa", dis: 0.0},{word: "baa", dis: 0.1},{word: "caa", dis: 1.0},{word: "ada", dis: 3.0},
    {word: "affa", dis: 5.0},{word: "aweaa", dis: 5.5},{word: "aa12a", dis: 6.0},{word: "aaera", dis: 7.0},
    {word: "aavva", dis: 7.8},{word: "ddaaa", dis: 8.0}];
    
    const check_click = () => {
       // if input matches any of the words in the list, then print this word is spelled correctly
        
        var spellcheck_input = document.getElementById("spellcheck_input").value;
        var incorrect = true;
        for (var value in dict) {
            if (dict[value].toLowerCase() == spellcheck_input.toLowerCase()) {
                console.log("this word is spelled correctly");
                incorrect = false;
                break;
            }
        }        
        if (incorrect) {
            console.log("this word is spelled incorrectly");
        }
        // if (incorrect) {
        //   const levenshteinDistance = (str1 = '', str2 = '') => {
        //     const track = Array(str2.length + 1).fill(null).map(() =>
        //     Array(str1.length + 1).fill(null));
        //     for (let i = 0; i <= str1.length; i += 1) {
        //        track[0][i] = i;
        //     }
        //     for (let j = 0; j <= str2.length; j += 1) {
        //        track[j][0] = j;
        //     }
        //     for (let j = 1; j <= str2.length; j += 1) {
        //        for (let i = 1; i <= str1.length; i += 1) {
        //           const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        //           track[j][i] = Math.min(
        //              track[j][i - 1] + 1, // deletion
        //              track[j - 1][i] + 1, // insertion
        //              track[j - 1][i - 1] + indicator, // substitution
        //           );
        //        }
        //     }
        //     return track[str2.length][str1.length];
        //  };
        //   // computes a suggestionScore for each word in the dictionary by levenshtein distance and word frequency
        //   var suggestionScore = [];
        //   for (var j = 0; j < dict.length; j++) {
        //     var word = dict[j];
        //     var distance = levenshteinDistance(spellcheck_input, word);
        //     var score = dict[j].dis;
        //     suggestionScore.push(distance + score);
        //   }
        //   // sorts the suggestionScore array by suggestionScore
        //   suggestionScore.sort(function(a, b) {
        //     return a.dis - b.dis;
        //   }
        //   );
        //   // prints the top 5 suggestions
        //   console.log("suggestions: ");
        //   for (var i = 0; i < 5; i++) {
        //     console.log(suggestionScore[i]);
        //   }

        // }
    }

    const savedict = () => {
      // put the user input from id training_text into dict
      
      var text = document.getElementById("training_text").value;
      var words = text.split(" ");
      // put words into dict
      for (let i = 0; i < words.length; i++){
        dict[i] = words[i];
      }
      console.log("updated dict!");
      
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
                <Button margin="20px" size = "large" variant = "contained"  onClick = {check_click}>Check Spelling</Button>
                </Box>
            </div>
            {    check &&
            <div className = "spell_check">
                <p1>Cloest Match: </p1>
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
                <Button margin="20px" size = "large" variant = "contained"  onClick = {savedict}>Update Reference Dictionary</Button>
              </Box>     
            </div>
        </div>
        </div>    
    )
}