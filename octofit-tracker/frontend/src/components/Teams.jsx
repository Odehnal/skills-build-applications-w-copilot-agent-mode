import { useEffect, useState } from 'react';
import { normalizeCollectionResponse } from './api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';

    async function loadTeams() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to load teams: HTTP ${response.status}`);
        }
        const payload = await response.json();
        const data = normalizeCollectionResponse(payload);
        if (!cancelled) {
          setTeams(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load teams');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTeams();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Team</th>
                <th>Coach</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id ?? team.name}>
                  <td>{team.name ?? '-'}</td>
                  <td>{team.coach ?? '-'}</td>
                  <td>
                    {Array.isArray(team.members) && team.members.length > 0
                      ? team.members.map((member) => member.name ?? 'Unknown').join(', ')
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Teams;