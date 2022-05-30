import "./main.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import React from "react"; 
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import {useState, useRef} from "react";
import {levenshteinDistance} from "../distance/distance";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {HARRY_POTTER_TXT, CAT_IN_THE_HAT_TXT,MY_FATHERS_DRAGON_TXT, WIND_IN_THE_WILLOWS_TXT,SOPHIES_WORLD_TXT } from "../books/books";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Main(){
    const [check, setcheck] = useState(false);
    const [incorrect, setincorrect] = useState(false);
    const [test, settest] = useState("NA");
    const [check_result, setcheckresult] = useState(" ");
    const [dict, setdict] = useState({});
    const [suggest, setsuggest] = useState([]);
    const [w_dis, setdis] = useState(1);    // remember to change according to the default slider value
    const [w_fre, setfre] = useState(-0.01);
    const matchlist = [{word: "aaa", dis: 0.0},{word: "baa", dis: 0.1},{word: "caa", dis: 1.0},{word: "ada", dis: 3.0},
    {word: "affa", dis: 5.0}];
    const [stringlist, setstringlist] = useState({});



    const check_click = () => {
       setstringlist({});
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
        }        
        else {
            setcheckresult("this word is spelled incorrectly");
            setincorrect(true);
        }
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
           var stlist = {};
           for(var key in levenshtein_dict){
             score[key] = levenshtein_dict[key] * w_dis + word_count[key] * w_fre;
             console.log(levenshtein_dict[key] + "*" + w_dis + "+" + word_count[key] + "*" + w_fre );
             stlist[key] = levenshtein_dict[key].toString() + "*" + w_dis.toString() + "+" +word_count[key].toString() + "*" + w_fre.toString();
            }
            setstringlist(stlist);
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
      var t2 = t1.replace(/[\!|\.|\?|\:|\"|\[|\]|\{|\}|\(|\)]/g, ""); // and to remove some special marks
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


// below is the preload select box part-------------------------------

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    
    const names = [
       "Cat in the Hat",
       "Harry Potter",
       "My Father's Dragon",
       "Wind in the Willows",
       "Sophie's World"
    ];
        
    const [bookName, setBookName] = useState([]);


    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setBookName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

// ------------------------------------------------------------------

const preload = () => {
  var traintext = document.getElementById("training_text").value;
   if(bookName.indexOf("Harry Potter")>-1){
    traintext += HARRY_POTTER_TXT;
   }
   if(bookName.indexOf("Cat in the Hat")>-1){
    traintext += CAT_IN_THE_HAT_TXT;
 }
   if(bookName.indexOf("My Father's Dragon")>-1){
    traintext += MY_FATHERS_DRAGON_TXT;
   }
   if(bookName.indexOf("Wind in the Willows")>-1){
    traintext += WIND_IN_THE_WILLOWS_TXT;
   }
   if(bookName.indexOf("Sophie's World")>-1){
    traintext += SOPHIES_WORLD_TXT;
   }
   if(traintext.length > 6000){
     traintext = traintext.slice(0, 6000);
   }
   document.getElementById("training_text").value = traintext
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
               defaultValue={1}
               valueLabelDisplay="auto"
               step={0.1}
               marks
               min={-1}
               max={1}
               onChange = {(event, value) =>  setdis(value)}
                />
                <p>Word Frequency Scalar</p>
                <Slider
               key="frequency"
               defaultValue={-0.01}
               valueLabelDisplay="auto"
               step={0.01}
               marks
               min={-0.1}
               max={0.1}
               onChange = {(event, value) =>  setfre(value)}
                />
                
                <p4>word: suggestionScore = levenshtein distance x levenshtein distance scalar + word frequency x word frequency scalar</p4>
                <br></br>
            </div>
            {    check &&
            <div className = "spell_check">
                <p1>Closest Match: </p1>   
                <p1>{check_result}</p1>  
                <div className = "suggest_res">
               {
                   suggest.map( array => (
                     <p>{array[0]}: {(array[1]).toFixed(3)} = {stringlist[array[0]]}</p>
                   )) 
                   }
                </div>
            </div>
             }
        </div>
        <div className = "right">
            <div className = "train_text">
            <p1>Enter texts to train: </p1>
            <div className = "pre_load">
            <FormControl size="small" sx={{ m: 0.5, width: 350}}>
        <Select
          labelId="demo-multiple-checkbox-label" 
          id="demo-multiple-checkbox"
          multiple
          value={bookName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={bookName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            <Button margin="20px" size = "large" variant = "contained"  onClick = {preload}>Preload</Button>
            </div>
            <TextField
                    id="training_text"
                    multiline
                    rows={18}
                    padding
                    inputProps = {{style: {fontSize: 20}}}
                    fullWidth 
                    margin = "normal"
                    inputProps={{
                      maxLength: 6000,
                    }}
                 />
              <Box m={2}>
                <Button margin="20px" size = "large" variant = "contained"  onClick = {savedict}>Update Reference Dictionary</Button>
                <IconButton aria-label="delete"  className = "delete_button" onClick={() => (document.getElementById("training_text").value = "")}>
                    <DeleteIcon sx = {{fontSize: 40 }} />
              </IconButton>

              </Box>     
            </div>
        </div>
        </div>    
    )
}