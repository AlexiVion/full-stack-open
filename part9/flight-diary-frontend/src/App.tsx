import { useState, useEffect } from 'react';
import axios from 'axios';
import { DiaryEntry, Weather, Visibility } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const addedEntry = await createDiary({
        date,
        weather,
        visibility,
        comment
      });
      setDiaries(diaries.concat(addedEntry));
      setDate('');
      setComment('');
      setError('');
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response && typeof e.response.data === 'string') {
          setError(e.response.data);
        } else {
          setError('Unrecognized error from server');
        }
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          date <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          visibility: {' '}
          {Object.values(Visibility).map(v => (
            <label key={v} style={{ marginRight: 10 }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v as Visibility)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          weather: {' '}
          {Object.values(Weather).map(w => (
            <label key={w} style={{ marginRight: 10 }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w as Weather)}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          comment <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
          {entry.comment && <p>comment: {entry.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default App;
