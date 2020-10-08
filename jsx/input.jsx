class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      puntos:0,
      oportunidades:3
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="verdadero">Verdadero</option>
            <option value="falso">Falso</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
    <p>{this.state.value}</p>
      </form>

    );
  }
}

ReactDOM.render(
  <FlavorForm />,
  document.getElementById('root')
);