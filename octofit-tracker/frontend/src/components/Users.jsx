import { useEffect, useState } from 'react';
import { normalizeCollectionResponse } from './api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/users/`
      : 'http://localhost:8000/api/users/';

    async function loadUsers() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to load users: HTTP ${response.status}`);
        }
        const payload = await response.json();
        const data = normalizeCollectionResponse(payload);
        if (!cancelled) {
          setUsers(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load users');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? `${user.email}-${user.name}`}>
                  <td>{user.name ?? '-'}</td>
                  <td>{user.email ?? '-'}</td>
                  <td>{user.role ?? '-'}</td>
                  <td>{user.grade ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Users;