class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }
  handleClick() {
    this.setState({ showMore: true });
  }
  render() {
    const list = [
      "list 1",
      "list 2",
      "item 3",
      "item 4",
      "item 5",
      "item 6",
      "item 7",
      "item 8",
      "item 9",
      "item 10",
      "item 11",
      "item 12",
      "item 12",
      "item 14",
      "item 15",
      "item 16",
      "item 17",
      "item 18",
    ];

    const numberOfItems = this.state.showMore ? list.length : 10;
    return (
      <div>
        {list.slice(0, numberOfItems).map((item) => {
          return <div>{item}</div>;
        })}
        <button onClick={() => this.handleClick()}>Show more</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
