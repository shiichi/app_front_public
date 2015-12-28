import React, { PropTypes, Component } from 'react';
import { reduxForm } from 'redux-form';
import { Input, ButtonInput } from 'react-bootstrap';

export const fields = ['username', 'email', 'age', 'post1', 'post2'];

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.age) {
    errors.age = 'Required';
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number';
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old';
  }

  if (!values.post1) {
    errors.post1 = 'Required';
  } else if (isNaN(Number(values.post1))) {
    errors.post1 = 'Must be a number';
  } else if (values.post1.length !== 3) {
    errors.post1 = '郵便番号は3桁で入力してください';
  }

  if (!values.post2) {
    errors.post2 = 'Required';
  } else if (isNaN(Number(values.post2))) {
    errors.post2 = 'Must be a number';
  } else if (values.post2.length !== 4) {
    errors.post2 = '郵便番号は4桁で入力してください';
  }
  return errors;
};

class SynchronousValidationForm extends Component {
  handleChange(e) {
    console.log(e.target);
  }

  render() {
    const {fields: {username, email, age, post1, post2}, resetForm, handleSubmit, submitting} = this.props;
    console.log(this.props);

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名</label>
          <div>
            <input type="text" placeholder="Username" {...username}/>
          </div>
          {username.touched && username.error && <div>{username.error}</div>}
        </div>
        <div>
          <label>メールアドレス</label>
          <div>
            <input type="text" placeholder="Email" {...email}/>
          </div>
          {email.touched && email.error && <div>{email.error}</div>}
        </div>
        <div>
          <label>年齢</label>
          <div>
            <input type="text" placeholder="Age" {...age}/>
          </div>
          {age.touched && age.error && <div>{age.error}</div>}
        </div>
        <div >
          <label>郵便番号</label>
          <div>
            <input type="text" placeholder="Postal code" {...post1}/>
            <input type="text" placeholder="Postal code" {...post2} onChange={this.handleChange.bind(this)}/>
          </div>
          {post1.touched && post1.error && <div>{post1.error}</div>}
          {post2.touched && post2.error && <div>{post2.error}</div>}
        </div>
        <Input type="textarea" label="Text Area" placeholder="textarea" />
        <div>
          <button disabled={submitting} onClick={handleSubmit}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

SynchronousValidationForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'synchronousValidation',
  fields,
  validate
})(SynchronousValidationForm);
