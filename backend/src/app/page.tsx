export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>🦋 Butterfly Store Backend API</h1>
      <p>Backend service is running.</p>
      <h2>Available Endpoints:</h2>
      <ul>
        <li><code>GET /api/health/cdc</code> - CDC Health Check</li>
        <li><code>GET /api/health/redis</code> - Redis Health Check</li>
        <li><code>GET /api/metrics</code> - System Metrics</li>
        <li><code>POST /api/actions/*</code> - Server Actions (converted to REST)</li>
        <li><code>/api/chat/*</code> - Chat & Messaging</li>
        <li><code>/api/calls/*</code> - Voice Call Signaling</li>
        <li><code>/api/admin/*</code> - Admin Operations</li>
      </ul>
      <p style={{ marginTop: '2rem', color: '#666' }}>
        Version: 1.0.0 | Port: 4000
      </p>
    </div>
  );
}
