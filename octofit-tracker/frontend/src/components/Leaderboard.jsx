import { useEffect, useState } from 'react';
import { normalizeCollectionResponse } from './api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';

    async function loadLeaderboard() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to load leaderboard: HTTP ${response.status}`);
        }
        const payload = await response.json();
        const data = normalizeCollectionResponse(payload);
        if (!cancelled) {
          setEntries(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load leaderboard');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id ?? `${entry.rank}-${entry.user?._id ?? entry.points}`}>
                  <td>{entry.rank ?? '-'}</td>
                  <td>{entry.user?.name ?? '-'}</td>
                  <td>{entry.team?.name ?? '-'}</td>
                  <td>{entry.points ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;