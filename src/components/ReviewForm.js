import React from 'react'

const ReviewForm = props => {
  return (
    <label>{props.label}
      <input
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
    </label>
  );
}

export default ReviewForm
