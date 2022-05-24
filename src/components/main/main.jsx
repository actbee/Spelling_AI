import "./main.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react";

export default function Main(){
    const [check, setcheck] = useState(false);
    const dict = {}
  
    const levenshteinDistance = (str1, str2) => {
      const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null));
      for (let i = 0; i <= str1.length; i += 1) {
         track[0][i] = i;
      }
      for (let j = 0; j <= str2.length; j += 1) {
         track[j][0] = j;
      }
      for (let j = 1; j <= str2.length; j += 1) {
         for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
               track[j][i - 1] + 1, // deletion
               track[j - 1][i] + 1, // insertion
               track[j - 1][i - 1] + indicator, // substitution
            );
         }
      }
      return track[str2.length][str1.length];
   }

    const check_click = () => {
        
        var spellcheck_input = document.getElementById("spellcheck_input").value;
        var incorrect = true;
        for (var value in dict) {
            if (dict[value].toLowerCase() == spellcheck_input.toLowerCase()) {
                console.log("this word is spelled correctly");

              // dictionary of all the words and their corresponding levenshtein distance
              var levenshtein_dict = {};
              for (var value in dict) {
                var levenshtein_distance = levenshteinDistance(spellcheck_input, dict[value]);
                levenshtein_dict[dict[value]] = levenshtein_distance;

              }

              // counts  the number of times each word appears in the dictionary
              var word_count = {};
              for (var value in dict) {
                if (word_count[dict[value]] == undefined) {
                  word_count[dict[value]] = 1;
                } else {
                  word_count[dict[value]] += 1;
                }
              }

              // sorts the dictionary by the value of the levenshtein distance
              var sorted_levenshtein_dict = {};
              Object.keys(levenshtein_dict).sort(function(a, b) {
                return levenshtein_dict[a] - levenshtein_dict[b];
              }).forEach(function(key) {  
                sorted_levenshtein_dict[key] = levenshtein_dict[key];
              });

              
              
              // prints the top 15 words and respective levenshtein distance and word count in the dictionary
              var count = 0;
              for (var key in sorted_levenshtein_dict) {
                if (count < 15) {
                  console.log(key + ": levenshteinDistance(" + sorted_levenshtein_dict[key] + ") * wordFrequency(" + word_count[key] + ") = suggestionScore: " + sorted_levenshtein_dict[key] * word_count[key]);
                  count += 1;
                }
              }

                incorrect = false;
                break;
            }
        }        
        if (incorrect) {
            console.log("this word is spelled incorrectly");

           // dictionary of all the words and their corresponding levenshtein distance
           var levenshtein_dict = {};
           for (var value in dict) {
             var levenshtein_distance = levenshteinDistance(spellcheck_input, dict[value]);
             levenshtein_dict[dict[value]] = levenshtein_distance;

           }

           // counts the number of times each word appears in the dictionary
           var word_count = {};
           for (var value in dict) {
             if (word_count[dict[value]] == undefined) {
               word_count[dict[value]] = 1;
             } else {
               word_count[dict[value]] += 1;
             }
           }

           

           // sorts the dictionary by the value of the levenshtein distance
           var sorted_levenshtein_dict = {};
           Object.keys(levenshtein_dict).sort(function(a, b) {
             return levenshtein_dict[a] - levenshtein_dict[b];
           }).forEach(function(key) {  
             sorted_levenshtein_dict[key] = levenshtein_dict[key];
           });
           
           
           
           // prints the top 15 words and respective levenshtein distance and word count in the dictionary
           var count = 0;
           for (var key in sorted_levenshtein_dict) {
             if (count < 15) {
               console.log(key + ": levenshteinDistance(" + sorted_levenshtein_dict[key] + ") * wordFrequency(" + word_count[key] + ") = suggestionScore: " + sorted_levenshtein_dict[key] * word_count[key]);
               count += 1;
             }
           }
        }
       

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
                  dict.map(res => (<p key={res.word}>
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