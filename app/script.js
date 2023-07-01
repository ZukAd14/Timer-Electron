import { stat } from 'original-fs';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

const App = () => {
const [status, setStatus] = useState('off');
const [time, setTime] = useState('');
const [timer, setTimer] = useState(null);
 
const formatTime = (time) => {
const minutes = Math.floor(time / 60000);
const seconds = Math.floor((time % 60000) / 1000);

const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
return minutes + ':' + formattedSeconds;
}


const playBell = new Audio('./sounds/bell.wav');



const handleStatusChange = () => {
  setTime(prevTime => prevTime - 1000);
  if (time <= 0) {
    clearInterval(timer);
    if (status === 'work') {
      playBell.play();
      setStatus('rest');
      setTime(20000);
      setTimer(setInterval(() => {
        setTime(prevTime => prevTime - 1000);
      }, 1000));
    } else if (status === 'rest') {
      playBell.play();
      setStatus('work');
      setTime(1200000);
      setTimer(setInterval(() => {
        setTime(prevTime => prevTime - 1000);
      }, 1000));
    }
  }
};

const startTimer = () => {
  setTime(1200000);
  setStatus('work');
  setTimer(setInterval(() => {
    setTime(prevTime => prevTime - 1000);
  }, 1000));
}

const stopTimer = () => {
  clearInterval(timer);
  setTime('');
  setStatus('off');
};

const closeApp = () => {
  window.close();
};

useEffect(() => {
  if (time <= 0) {
    handleStatusChange();
  }
}, [time, status]);

    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' ?
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div> : null
        }
        {status === 'work' ?
        <img src="./images/work.png" /> : null
        }
        {status === 'rest' ?
        <img src="./images/rest.png" /> : null
        }
        {status != 'off' ?
        <div className="timer">
          {formatTime(time)}
        </div> : null
        }
        {status === 'off' ?
        <button className="btn" onClick={startTimer}>Start</button> : null
        }
        {status != 'off' ?
        <button className="btn" onClick={stopTimer}>Stop</button> : null
        }
        <button className="btn btn-close" onClick={closeApp}>X</button>
      </div>
    );
  };


ReactDOM.render(<App />, document.querySelector('#app'));
