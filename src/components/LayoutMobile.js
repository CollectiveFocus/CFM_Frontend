import PropTypes from "prop-types";

export default function LayoutMobile({ children }) {
  return (
    <div style={{ padding: 12 }}>
      <header style={{ marginBottom: 12 }}>
        <h1>App (Mobile)</h1>
      </header>
      <main>{children}</main>
      <footer style={{ marginTop: 24, fontSize: 12 }}>Mobile footer</footer>
    </div>
  );
}

LayoutMobile.propTypes = {
  children: PropTypes.node.isRequired,
};