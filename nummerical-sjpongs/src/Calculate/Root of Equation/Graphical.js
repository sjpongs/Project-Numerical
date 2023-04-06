
const InputStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "24px"
};
var dataInTable;
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        key: "y",
        dataIndex: "y"
    }
];

class Graphical extends Component {

    constructor() {
        super();
        /*
        this.state = {
            fx: "",
            start: 0,
            finish: 0,
            showOutputCard: false,
            showGraph: false
        }
        */
        this.state = this.getInitialState();
        this.handleChange = this.handleChange.bind(this);
        this.graphical = this.graphical.bind(this);
    }

    getInitialState = () => ({
        fx: "",
        start: 0,
        finish: 0,
        showOutputCard: false,
        showGraph: false
    })

    graphical() {
        var data = []
        data['x'] = []
        data['y'] = []
        console.log(typeof (this.state.start))
        for (var i = parseInt(this.state.start); i <= parseInt(this.state.finish); i++) {
            data['x'].push(i);
            data['y'].push(func(this.state.fx, i));

        }


        this.createTable(data['x'], data['y']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }

    createTable(x, y) {
        dataInTable = []
        for (var i = 0; i <= parseInt(this.state.finish - this.state.start); i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                y: y[i]
            });
        }

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        let { fx, start, finish } = this.state;
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>Graphical</h2>

                <div className="row">
                    <div className="col">
                        <Card
                            style={{ background: "#f2f2f2", color: "#FFFFFFFF", borderRadius:"10px" }}
                            onChange={this.handleChange}
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2>Start</h2><Input size="large" name="start" style={InputStyle}></Input>
                            <h2>Finish</h2><Input size="large" name="finish" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.graphical(parseFloat(start), parseFloat(finish))
                            }
                                style={{ background: "#4caf50", color: "white"}}>Submit</Button>

                        </Card>                        
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx}  title="Graphical Method" />}
                    </div>
                </div>
                <div className="row">
                    {this.state.showOutputCard &&
                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: "100%", background: "#f2f2f2", color: "#FFFFFFFF" }}
                            id="outputCard"
                        >
                            <label style={{color: "black"}}>f(x): {fx}</label><br/>
                            <label style={{color: "black"}}>Start: {start}</label><br/>
                            <label style={{color: "black"}}>Finish: {finish}</label><br/>
                            <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}></Table>
                        </Card>
                    }                    
                </div>
            </div>
        );
    }
}
export default Graphical;