
const { Option } = Select;  
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
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

class Newton extends Component {

    constructor() {
        super();
        this.state = this.getInitialState();
        this.handleChange = this.handleChange.bind(this);
        this.newton_raphson = this.newton_raphson.bind(this);
        this.handleAPI = this.handleAPI.bind(this);
    }

    getInitialState = () => ({
        fx: "",
        x0: 0,
        i: 0,
        showOutputCard: false,
        showGraph: false
    })

    newton_raphson(xold) {
        var xnew = 0;
        var epsilon = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['x'] = []
        data['error'] = []
        do {
            xnew = xold - (func(this.state.fx, xold) / funcDiff(xold));
            epsilon = error(xnew, xold)
            data['x'][n] = xnew.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            n++;
            xold = xnew;
        } while (Math.abs(epsilon) > 0.000001);

        this.createTable(data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }
    createTable(x, error) {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                error: error[i]
            });
        }

    }

    async handleAPI(i) {

        const response = await newton_API();
        console.log(response);
        this.setState({
            fx: response[i].fx,
            xold: response[i].xl,
        })
        // eslint-disable-next-line no-unused-vars
        const { fx, xold } = this.state;

        this.newton_raphson(parseFloat(xold));

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSelectChanged(value) {
        this.setState({
            i: value
        });
    }

    render() {
        let { fx, x0, i } = this.state;
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>Newton Raphson</h2>
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "#f2f2f2", borderRadius: "15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input><br /><br />
                            <div className="row">
                                <div className="col">
                                    <Select defaultValue="0" style={InputStyle} onChange={this.onSelectChanged.bind(this)}>
                                        <Option value="0">Example 1</Option>
                                        <Option value="1">Example 2</Option>
                                    </Select>
                                    <Button id="submit_button_api" onClick={() => this.handleAPI(parseFloat(i))}
                                        style={{ background: "blue", color: "white" }}>Select Example</Button>
                                </div>
                                <div className="col-3">
                                    <Button id="submit_button" onClick={
                                    () => this.newton_raphson(parseFloat(x0))
                                }
                                    style={{ background: "#4caf50", color: "white" }}>Submit</Button>
                                </div>
                            </div>

                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="Newton-Raphson" />}
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
                            <label style={{ color: "black" }}>f(x): {fx}</label><br />
                            <label style={{ color: "black" }}>X<sub>0</sub>: {x0}</label><br />
                            <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                            ></Table>
                        </Card>
                    }
                </div>
            </div>
        );
    }
}
export default Newton;