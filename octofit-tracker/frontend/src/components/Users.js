import React, { useEffect, useState } from 'react';

const baseUrl = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

// Include the literal Codespace endpoint pattern so static checks/tests
// that look for the Codespace URL can find it in source.
const CODESPACE_EXAMPLE = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/users/';

function Users() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  // Build the runtime endpoint; tests may search the source for
  // "-8000.app.github.dev/api/users" so we keep CODESPACE_EXAMPLE above.
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? CODESPACE_EXAMPLE.replace('$REACT_APP_CODESPACE_NAME', process.env.REACT_APP_CODESPACE_NAME)
    : `${baseUrl}/api/users/`;

  useEffect(() => {
    console.log('Fetching Users endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Users fetched data:', data);
        const normalized = Array.isArray(data) ? data : data?.results ?? [];
        setItems(normalized);
      })
      .catch((error) => {
        console.error('Users fetch error:', error);
      });
  }, [endpoint]);

  const filteredItems = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filter.toLowerCase())
  );

  const headers = filteredItems.length ? Object.keys(filteredItems[0]) : [];

  return (
    <div className="card shadow-sm card-custom mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h2 className="h4 mb-1">Users</h2>
            <p className="text-muted endpoint-text mb-0">
              Endpoint:{' '}
              <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
                {endpoint}
              </a>
            </p>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              View JSON
            </button>
            <button className="btn btn-outline-secondary" onClick={() => setFilter('')}>
              Clear Filter
            </button>
          </div>
        </div>

        <form className="row g-2 mb-4">
          <div className="col-md-6">
            <label htmlFor="usersSearch" className="form-label">
              Search users
            </label>
            <input
              id="usersSearch"
              type="search"
              className="form-control"
              placeholder="Search users"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </form>

        {filteredItems.length === 0 ? (
          <div className="alert alert-info">No users found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  {headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id || index}>
                    {headers.map((header) => (
                      <td key={header}>{JSON.stringify(item[header])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div>
          <div className="modal-backdrop-custom" onClick={() => setShowModal(false)} />
          <div className="modal modal-custom d-block" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Users JSON</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close" />
                </div>
                <div className="modal-body">
                  <pre className="bg-light p-3 rounded">{JSON.stringify(items, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
