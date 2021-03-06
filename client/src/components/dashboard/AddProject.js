import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      date: "",
      materials: "",
      image: "",
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const projectData = {
      title: this.state.title,
      date: this.state.date,
      materials: this.state.materials,
      image: this.state.image,
      description: this.state.description
    };

    this.props.addProject(projectData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ errors: {} });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <section className="hero is-dark is-bold is-medium">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1">add project</h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="columns">
            <div className="column">
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  label="Title"
                  error={errors.title}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="date"
                  placeholder="mm/dd/yyyy"
                  value={this.state.date}
                  type="date"
                  label="Date"
                  error={errors.date}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="materials"
                  placeholder="Materials"
                  value={this.state.materials}
                  label="Materials"
                  error={errors.materials}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="image"
                  placeholder="Image"
                  value={this.state.image}
                  label="Image"
                  error={errors.image}
                  onChange={this.onChange}
                />

                <TextAreaFieldGroup
                  name="description"
                  value={this.state.description}
                  label="Description"
                  error={errors.description}
                  onChange={this.onChange}
                />

                <input type="submit" className="button is-link is-outlined" />
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProject }
)(AddProject);
