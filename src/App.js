import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (course) {
      console.log('Updated Course Data:', course);
    }
  }, [course]);

  
  const getValue = async () => {
    if (!inputValue) return; // Prevent fetching if input is empty
    const url = `https://anteaterapi.com/v2/rest/courses/${inputValue}`;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched Data:', data);
      setCourse(data); // Store fetched data
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch course data.');
      setCourse(null); // Clear previous data if error occurs
    } finally {
      setLoading(false);
    }
  };
/*
  const getValue = async () => {
    try {
      const url = `https://anteaterapi.com/v2/graphql`;


  const query = `
      query {
          course(id: "DANCE3"){
              id
              department
              school
          }
      }`;

      const response = await fetch(url, {
        "method": "POST",
        "body": JSON.stringify({query}),
        // Not necessary for every Web API, but it's good practice
      "headers" : {
          "Content-Type": "application/json",
        }
    });
    console.log(response.json());
    const data = await response.json();
    console.log('Fetched Data:', data);
    setCourse(data); // Store fetched data
  } catch (error) {
    console.error('Fetch error:', error);
    setError('Failed to fetch course data.');
    setCourse(null); // Clear previous data if error occurs
  } finally {
    setLoading(false);
  }
}
*/

  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontSize: '25px',
          marginTop: '20px',
          gap: '10px',
        }}
      >
        <div>Gavin's Favorite Classes</div>

        <div
          style={{
            display: 'flex',
            gap: '5px',
            width: '50vw',
            justifyContent: 'center',
          }}
        >
          <input
            style={{
              background: '#222222',
              border: '1px solid #ffffff',
              color: '#ffffff',
              padding: '5px',
              borderRadius: '10px',
            }}
            value={inputValue}
            onChange={handleChange}
            placeholder="Search by course id..."
          />
          <div
            onClick={getValue} // No parentheses here!
            style={{
              background: '#ffffff',
              color: '#222222',
              fontWeight: 'bold',
              padding: '5px',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Search
          </div>
        </div>

        {course?.data ? (
          <div
            style={{
              marginTop: '20px',
              color: '#ffffff',
              background: '#333',
              padding: '10px',
              borderRadius: '10px',
              maxWidth: '80vw',
            }}
          >
            <h3>{course.data.title}</h3>
            <p><strong>Course ID:</strong> {course.data.id}</p>
            <p><strong>Department:</strong> {course.data.departmentName}</p>
            <p><strong>Level:</strong> {course.data.courseLevel}</p>
            <p><strong>Units:</strong> {course.data.minUnits} - {course.data.maxUnits}</p>
            <p><strong>Description:</strong> {course.data.description}</p>
            <p><strong>Prerequisites:</strong> {course.data.prerequisiteText || 'None'}</p>
            <p><strong>Restrictions:</strong> {course.data.restriction || 'None'}</p>
            <p><strong>Offered Terms:</strong></p>
            <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>
              {course.data.terms?.slice(0, 10).map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No Course Info</div>
        )}
      </div>
    </div>
  );
}

export default App;