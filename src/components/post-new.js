import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';
import {Link} from 'react-router';

class PostNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        this.context.router.push('/')
      })
  }
  render() {
    const {fields: {title, categories, content}, handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
          <input type="text" className="form-control" {...title} />
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
          <input type="text" className="form-control" {...categories} />
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
          <textarea className="form-control" {...content} />
        </div>

        <button type="submit" className="btn btn-info">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.title) {
    errors.title = 'enter a title';
  }
  if (!values.categories) {
    errors.categories = 'enter some categories';
  }
  if (!values.content) {
    errors.content = 'enter some content';
  }
  return errors
}

export default reduxForm({
  form: 'PostNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, {createPost})(PostNew);
