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
    const [dict, setdict] = useState({});
    const [suggest, setsuggest] = useState([]);
    const [w_dis, setdis] = useState(0.5);
    const [w_fre, setfre] = useState(0.5);
    const matchlist = [{word: "aaa", dis: 0.0},{word: "baa", dis: 0.1},{word: "caa", dis: 1.0},{word: "ada", dis: 3.0},
    {word: "affa", dis: 5.0}];

    


    const check_click = () => {
       // if input matches any of the words in the list, then print this word is spelled correctly
       var spellcheck_input = document.getElementById("spellcheck_input").value.toLowerCase();
        setcheck(true);
        console.log(spellcheck_input);
        var incorrect = true;
        console.log(dict);
        for (var value in dict) {
            if (dict[value].toLowerCase() == spellcheck_input.toLowerCase()) {
                setcheckresult("this word is spelled correctly");

                incorrect = false;
                setincorrect(false);
        

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
                var score = {};

                for(var key in levenshtein_dict){
                  score[key] = levenshtein_dict[key] * w_dis - word_count[key] * w_fre;
                  console.log(levenshtein_dict[key] + "*" + w_dis + "-" + word_count[key] + "*" + w_fre );
                }
                console.log(score);

                var items = Object.keys(score).map(function(key){
                  return [key, score[key]];
                })
     
                items.sort(function(first, second){
                  return first[1]-second[1];
                })

                console.log(items);

                if(items.length < 15){
                setsuggest(items);
                }
                else{
                  setsuggest(items.slice(0, 15));
                }
                break;
            }
        }        
        if (incorrect) {
            setcheckresult("this word is spelled incorrectly");
            setincorrect(true);
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
           var score = {};
           
           for(var key in levenshtein_dict){
             score[key] = levenshtein_dict[key] * w_dis - word_count[key] * w_fre;
             console.log(levenshtein_dict[key] + "*" + w_dis + "-" + word_count[key] + "*" + w_fre );
            }
           console.log(score);

           var items = Object.keys(score).map(function(key){
             return [key, score[key]];
           })

           items.sort(function(first, second){
             return first[1]-second[1];
           })



           console.log(items);

           if(items.length < 15){
           setsuggest(items);
           }
           else{
             setsuggest(items.slice(0, 15));
           }

         }
    }

    const savedict = () => {
      // put the user input from id training_text into dict
      var text = document.getElementById("training_text").value;
      var t1 = text.replace(/[\r\n]/g, ""); // to remove the line-break
      var t2 = t1. replace(/[\!|\.|\?|\:|\"|\[|\]|\{|\}|\(|\)]/g, ""); // and to remove some special marks
      var words = t2.split(" ");
      // put words into dict
      var temdict = {};
      for (let i = 0; i < words.length; i++){
        if(words[i]!=""){
        temdict[i] = words[i].toLowerCase();
        }
      }
      setdict(temdict);
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
                <p>Levenshtein Distance Scalar</p>
                <Slider
               key="distance"
               defaultValue={0.5}
               valueLabelDisplay="auto"
               step={0.1}
               marks
               min={0}
               max={1}
               onChange = {(event, value) =>  setdis(value)}
                />
                <p>Word Frequency Scalar</p>
                <Slider
               key="frequency"
               defaultValue={0.5}
               valueLabelDisplay="auto"
               step={0.1}
               marks
               min={0}
               max={1}
               onChange = {(event, value) =>  setfre(value)}
                />
            </div>
            {    check &&
            <div className = "spell_check">
                <p1>Cloest Match: </p1>   
                <p1>{check_result}</p1>  
                <div className = "suggest_res">
                {  
                    incorrect &&
                   suggest.map( array => (
                     <p>{array[0]} : {(array[1]-suggest[0][1]).toFixed(3)}</p>
                   )) 
               }
               {  
                    !incorrect &&
                   suggest.map( array => (
                     <p>{array[0]} : {(array[1]-suggest[0][1]).toFixed(3)}</p>
                   )) 
               }
               
                </div>
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