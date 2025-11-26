import PropTypes from "prop-types";

export default function ChildA({ data }) {
  if (!data) return <div>No A data</div>;
  return (
    <section>
      <h3>Child A</h3>
      <p>{data.title}</p>
      <p>{data.description}</p>
    </section>
  );
}

ChildA.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};