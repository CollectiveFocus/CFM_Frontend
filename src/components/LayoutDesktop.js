import PropTypes from "prop-types";

export default function LayoutDesktop({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 24, padding: 24 }}>
      <nav style={{ borderRight: "1px solid #eee", paddingRight: 12 }}>
        <h2>Nav</h2>
      </nav>
      <div>
        <header style={{ marginBottom: 16 }}>
          <h1>App (Desktop)</h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

LayoutDesktop.propTypes = {
  children: PropTypes.node.isRequired,
};