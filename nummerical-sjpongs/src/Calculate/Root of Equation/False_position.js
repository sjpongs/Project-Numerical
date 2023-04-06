
const { Option } = Select;
const InputStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "24px"
};
var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
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

class FalsePosition extends Component {

    constructor() {
        super();
        this.state = this.getInitialState();
        this.handleChange = this.handleChange.bind(this);
        this.false_position = this.false_position.bind(this);
        this.handleAPI = this.handleAPI.bind(this);
    }

    getInitialState = () => ({
        fx: "",
        xl: 0,
        xr: 0,
        i: 0,
        showOutputCard: false,
        showGraph: false
    })

    false_position(xl, xr) {
        var increaseFunction = false;
        var xi = 0;
        var epsilon = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        if (func(this.state.fx, xl) < func(this.state.fx, xr)) {
            increaseFunction = true;
        }
        do {
            xi = (xl * func(this.state.fx, xr) - xr * func(this.state.fx, xl)) / (func(this.state.fx, xr) - func(this.state.fx, xl));
            if (func(this.state.fx, xi) * func(this.state.fx, xr) < 0) {
                epsilon = error(xi, xr);
                if (increaseFunction) {
                    xl = xi;
                }
                else {
                    xr = xi;
                }

            }
            else {
                epsilon = error(xi, xl);
                if (increaseFunction) {
                    xr = xi;
                }
                else {
                    xl = xi;
                }

            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xi.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            n++;

        } while (Math.abs(epsilon) > 0.000001);

        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }

    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i]
            });
        }

    }

    async handleAPI(i) {

        const response = await falsepos_API();
        console.log(response);
        console.log(i);
        this.setState({
            fx: response[i].fx,
            xl: response[i].xl,
            xr: response[i].xr
        })
        // eslint-disable-next-line no-unused-vars
        const { fx, xl, xr } = this.state;

        this.false_position(parseFloat(xl), parseFloat(xr));

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
        let { fx, xl, xr, i } = this.state;
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>False Position</h2>
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "#f2f2f2", borderRadius: "15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle} placeholder="f(x)"></Input>
                            <h2>X<sub>L</sub></h2><Input size="large" name="xl" style={InputStyle} placeholder="XL"></Input>
                            <h2>X<sub>R</sub></h2><Input size="large" name="xr" style={InputStyle} placeholder="XR"></Input><br /><br />
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
                                        () => this.false_position(parseFloat(xl), parseFloat(xr))
                                    }
                                        style={{ background: "#4caf50", color: "white" }}>Submit</Button>
                                </div>
                            </div>

                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="False Position" />}
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
                            <label style={{ color: "black" }}>X<sub>L</sub>: {xl}</label><br />
                            <label style={{ color: "black" }}>X<sub>R</sub>: {xr}</label><br />
                            <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                            ></Table>
                        </Card>
                    }
                </div>
            </div>
        );
    }
}
export default FalsePosition;