import { useState } from 'react';

function Settings({ initialWorkDuration = 25, initialBreakDuration = 5, initialLongBreakDuration = 15, initialCyclesBeforeLongBreak = 4, onSubmit }) {
  const [workDuration, setWorkDuration] = useState(initialWorkDuration);
  const [breakDuration, setBreakDuration] = useState(initialBreakDuration);
  const [longBreakDuration, setLongBreakDuration] = useState(initialLongBreakDuration);
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(initialCyclesBeforeLongBreak);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      workDuration,
      breakDuration,
      longBreakDuration,
      cyclesBeforeLongBreak,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="work-duration">Work Duration (minutes):</label>
        <input id="work-duration" type="number" value={workDuration} onChange={(e) => setWorkDuration(parseInt(e.target.value))} />
      </div>
      <div>
        <label htmlFor="break-duration">Break Duration (minutes):</label>
        <input id="break-duration" type="number" value={breakDuration} onChange={(e) => setBreakDuration(parseInt(e.target.value))} />
      </div>
      <div>
        <label htmlFor="long-break-duration">Long Break Duration (minutes):</label>
        <input id="long-break-duration" type="number" value={longBreakDuration} onChange={(e) => setLongBreakDuration(parseInt(e.target.value))} />
      </div>
      <div>
        <label htmlFor="cycles-before-long-break">Cycles Before Long Break:</label>
        <input id="cycles-before-long-break" type="number" value={cyclesBeforeLongBreak} onChange={(e) => setCyclesBeforeLongBreak(parseInt(e.target.value))} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default Settings;