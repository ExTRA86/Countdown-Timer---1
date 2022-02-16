import Countdown from 'react-countdown';
import { useState } from 'react';

function App() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const [show, setShow] = useState(false);
  const [end, setEnd] = useState(false);

  const switcher = () => {
    if (!show && !end) {
      setShow(true);
      setEnd(false);
    } else if (show && !end) {
      setShow(false);
      setEnd(true);
    } else {
      setShow(true);
      setEnd(false);
    }
  };

  let time = value2.split(':');
  let date = new Date(value1);
  let currentDate = new Date();

  let newDate = Math.ceil(
    date.getTime() +
      (time[0] * 3600 + time[1] * 60) * 1000 -
      (currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * -1000),
  );

  return (
    <>
      <div className='container'>
        <h1>ВИДЖЕТ ТАЙМЕРА ОБРАТНОГО ОТСЧЕТА</h1>
      </div>

      <div className='wrapper'>
        <h2>Введите нужную дату и время</h2>
        <div>
          <label> Укажите дату </label>
          <input
            type='date'
            value={value1}
            onChange={event => setValue1(event.target.value)}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Укажите время</label>
          <input
            type='time'
            value={value2}
            onChange={event => setValue2(event.target.value)}
          />
        </div>
        {show && value1 && value2 ? (
          ''
        ) : (
          <button
            style={{ marginTop: 10 }}
            onClick={() => {
              value1 && value2 && newDate > 0
                ? switcher()
                : alert('Введите корректную дату');
            }}
          >
            Показать отсчет времени
          </button>
        )}

        {show ? (
          <Countdown
            date={Date.now() + newDate}
            intervalDelay={0}
            precision={3}
            onComplete={switcher}
            renderer={props => (
              <div>
                <div
                  style={{ marginTop: 20 }}
                  className='clear-loading spinner'
                >
                  <span></span>
                </div>

                <div style={{ marginTop: 20 }}>
                  <span className='sub-message'>
                    До установленной даты осталось :
                  </span>
                </div>

                <div className='clock'>
                  <div className='column days'>
                    <div className='timer' id='days'>
                      {props.days}
                    </div>
                    <div className='text'>ДНЕЙ</div>
                  </div>
                  <div className='timer days'>:</div>
                  <div className='column'>
                    <div className='timer' id='hours'>
                      {props.hours}
                    </div>
                    <div className='text'>ЧАСОВ</div>
                  </div>
                  <div className='timer'>:</div>
                  <div className='column'>
                    <div className='timer' id='minutes'>
                      {props.minutes}
                    </div>
                    <div className='text'>МИНУТ</div>
                  </div>
                  <div className='timer'>:</div>
                  <div className='column'>
                    <div className='timer' id='seconds'>
                      {props.seconds}
                    </div>
                    <div className='text'>СЕКУНД</div>
                  </div>
                </div>
              </div>
            )}
          />
        ) : (
          ''
        )}
      </div>
      {end ? (
        <div className='clock'>
          <h1>Установленная дата наступила!</h1>
        </div>
      ) : (
        ''
      )}
      <div className='footer'>
        <p>Countdown Timer Widget 2022</p>
      </div>
    </>
  );
}

export default App;
