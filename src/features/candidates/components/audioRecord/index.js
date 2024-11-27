import React from "react";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material'

const AudioRecorder = (props) => {
    const { stopRecording, isRecording, audioUrl, questions } = props;

    return (
        <div>
            {isRecording && <div>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Your interview started
              </Typography>
              
              <List sx={{ height: 400, overflowY: 'auto', textAlign: "center" }}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Your questions:
              </Typography>
              {questions?.map((question, key) => 
                <ListItem key={key} sx={{ textAlign: "center"}}>
                  <ListItemText
                    primary={question}
                  />
                </ListItem>
                )}
              </List>
                <Button onClick={stopRecording}>
                  {"Stop Recording"}
                </Button>
            </div>}
            {audioUrl && (
                  <div>
                    <h2>Your interview:</h2>
                    <audio src={audioUrl} controls />
                  </div>
                )} 
      </div>
    )
}

export default AudioRecorder;