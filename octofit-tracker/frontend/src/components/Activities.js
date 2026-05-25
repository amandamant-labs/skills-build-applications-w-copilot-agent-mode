import React, { useEffect, useState } from 'react';

const baseUrl = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Activities() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const endpoint = `${baseUrl}/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Activities fetched data:', data);
        const normalized = Array.isArray(data) ? data : data?.results ?? [];
        setItems(normalized);
      })
      .catch((error) => {
        console.error('Activities fetch error:', error);
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
            <h2 className="h4 mb-1">Activities</h2>
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
            <label htmlFor="activitiesSearch" className="form-label">
              Filter activities
            </label>
            <input
              id="activitiesSearch"
              type="search"
              className="form-control"
              placeholder="Search activities"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </form>

        {filteredItems.length === 0 ? (
          <div className="alert alert-info">No activities found.</div>
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
                  <h5 className="modal-title">Activities JSON</h5>
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

export default Activities;
