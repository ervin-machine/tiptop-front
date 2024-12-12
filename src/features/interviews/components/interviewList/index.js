import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.shortId}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Answer
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Question</TableCell>
                      <TableCell>Transcription</TableCell>
                      <TableCell align="right">Smmarization</TableCell>
                      <TableCell align="right">Answer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.questions.map((historyRow) => (
                      <TableRow key={historyRow.question}>
                        <TableCell component="th" scope="row">
                          {historyRow.question}
                        </TableCell>
                        <TableCell>{historyRow.transcribe}</TableCell>
                        <TableCell align="right">{historyRow.summarization}</TableCell>
                        <TableCell align="right">
                        <audio controls>
                            <source src={historyRow?.audioUrl} type="audio/wav" />
                      </audio>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

function InterviewList({ fetchInterviews, interviews }) {

  useEffect(() => {
    fetchInterviews()
  }, [fetchInterviews])

  return (
    <div>
    <Link to="/dashboard"><Button>Back to dashboard</Button></Link>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ShortId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interviews?.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    
  )
}

export default InterviewList