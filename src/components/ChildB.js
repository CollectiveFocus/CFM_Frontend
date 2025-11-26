import PropTypes from "prop-types";

export default function ChildB({ items = [] }) {
  if (!items || items.length === 0) return <div>No items</div>;
  return (
    <section>
      <h3>Child B</h3>
      <ul>
        {items.map((it) => (
          <li key={it.id ?? it.key}>{it.label}</li>
        ))}
      </ul>
    </section>
  );
}

ChildB.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
    })
  ),
};