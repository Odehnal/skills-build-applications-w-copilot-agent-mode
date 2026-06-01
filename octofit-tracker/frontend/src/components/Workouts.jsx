import { useEffect, useState } from 'react';
import { normalizeCollectionResponse } from './api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';

    async function loadWorkouts() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to load workouts: HTTP ${response.status}`);
        }
        const payload = await response.json();
        const data = normalizeCollectionResponse(payload);
        if (!cancelled) {
          setWorkouts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load workouts');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Difficulty</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id ?? `${workout.name}-${workout.activityType}`}>
                  <td>{workout.name ?? '-'}</td>
                  <td>{workout.difficulty ?? '-'}</td>
                  <td>{workout.activityType ?? '-'}</td>
                  <td>{workout.description ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;