import { useEffect, useState } from 'react';
import { normalizeCollectionResponse } from './api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';

    async function loadActivities() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to load activities: HTTP ${response.status}`);
        }
        const payload = await response.json();
        const data = normalizeCollectionResponse(payload);
        if (!cancelled) {
          setActivities(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load activities');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadActivities();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Points</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.type}-${activity.date}`}>
                  <td>{activity.user?.name ?? '-'}</td>
                  <td>{activity.type ?? '-'}</td>
                  <td>{activity.durationMinutes ?? '-'}</td>
                  <td>{activity.points ?? '-'}</td>
                  <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;