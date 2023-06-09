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

class Bisection extends Component {

    constructor() {
        super();
        this.state = this.getInitialState();
        this.handleChange = this.handleChange.bind(this);
        this.bisection = this.bisection.bind(this);
        this.handleAPI = this.handleAPI.bind(this);
    }

    getInitialState = () => ({
        fx: "",
        xl: 0,
        xr: 0,
        i: 0,
        showOutputCard: false,
        showGraph: false,
        moveLeft: false
    })

    bisection(xl, xr) {
        var increaseFunction = false;
        var xm = 0;
        var sum = parseFloat(0.000000);
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
            xm = (xl + xr) / 2;
            if (func(this.state.fx, xm) * func(this.state.fx, xr) < 0) {
                sum = error(xm, xr);
                if (increaseFunction) {
                    xl = xm;
                }
                else {
                    xr = xm;
                }

            }
            else {
                sum = error(xm, xl);
                if (increaseFunction) {
                    xr = xm;
                }
                else {
                    xl = xm;
                }
            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xm.toFixed(8);
            data['error'][n] = Math.abs(sum).toFixed(8);
            n++;
        } while (Math.abs(sum) > 0.000001);
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true,

        })


    }

    async handleAPI(i) {

        const response = await bisection_API();
        console.log(response);
        console.log(i);
        this.setState({
            fx: response[i].fx,
            xl: response[i].xl,
            xr: response[i].xr
        })
        // eslint-disable-next-line no-unused-vars
        const { fx, xl, xr } = this.state;

        this.bisection(parseFloat(xl), parseFloat(xr));

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
                <h2 style={{ color: "black", fontWeight: "bold" }}>Bisection</h2>
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "#f2f2f2", borderRadius: "15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle} placeholder='f(x)'></Input>
                            <h2>X<sub>L</sub></h2><Input size="large" name="xl" style={InputStyle} placeholder='XL'></Input>
                            <h2>X<sub>R</sub></h2><Input size="large" name="xr" style={InputStyle} placeholder='XR'></Input><br /><br />
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
                                        () => this.bisection(parseFloat(xl), parseFloat(xr))
                                    }
                                        style={{ background: "#4caf50", color: "white" }}>Submit</Button>
                                </div>
                            </div>



                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="Bisection Method" />}
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
                            <label style={{ color: "black" }}>X<sub>L</sub>: {xr}</label><br />
                            <Table pagination={{ defaultPageSize: 5 }} columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}></Table>
                        </Card>
                    }
                </div>
            </div>

        );
    }
}
export default Bisection;