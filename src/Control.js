const Control = ({item, index, setup, handleInputChange}) => {
  const { id, type, min, max, step, description } = item;
  const label = id.replace(/.+([A-Z])/g, " $1").toLowerCase();
  let value = setup[id] || 0;
  if (id === "dotsCount" && setup.tasjeDotsCount) {
    value = setup.tasjeDotsCount;
  }
  const checked = value === true;
  return (
    <fieldset
      className={`control control--${type} control--${id}`}
      key={`${id}-${index}`}
      title={description}
    >
      <input
        className="control__input"
        {...{ type, id, value, min, max, step, checked }}
        onChange={(event) => {
          handleInputChange(event);
        }}
      />
      <label className="control__label" htmlFor={id}>
        <span>{label}</span>
        {/* {id === "kwastje"
            ? Object.keys(kwastjes)[setup.kwastje - 1]
            : null} */}
        {type === "range" && <span>{value}</span>}
      </label>
    </fieldset>
  );
};

export default Control;
