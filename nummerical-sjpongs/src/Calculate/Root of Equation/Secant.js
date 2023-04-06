
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
        title: "Y",
        dataIndex: "y",
        key: "y"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

class Secant extends Component {
    constructor() {
        super();
        this.state = this.getInitialState();
        this.handleChange = this.handleChange.bind(this);
        this.secant = this.secant.bind(this);
        this.handleAPI = this.handleAPI.bind(this);
    }

    getInitialState = () => ({
        fx: "",
        x0: 0,
        x1: 0,
        i: 0,
        showOutputCard: false,
        showGraph: false
    })

    secant(x0, x1) {
        var x = [], y = 0, epsilon = parseFloat(0.000000);
        var n = 1, i = 1;
        var data = []
        data['y'] = []
        data['error'] = []
        x.push(x0);
        x.push(x1);
        data['y'][0] = x0;
        data['error'][0] = "---";

        do {
            y = x[i] - (func(this.state.fx, x[i]) * ((x[i] - x[i - 1]))) / (func(this.state.fx, x[i]) - func(this.state.fx, x[i - 1]));
            x.push(y);
            epsilon = error(y, x[i]);
            data['y'][n] = y.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);

            n++;
            i++;

        } while (Math.abs(epsilon) > 0.000001);
        this.createTable(data['y'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }

    createTable(y, error) {
        dataInTable = []
        for (var i = 0; i < y.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                y: y[i],
                error: error[i]
            });
        }

    }

    async handleAPI(i) {

        const response = await secant_API();
        console.log(response);
        this.setState({
            fx: response[i].fx,
            x0: response[i].xl,
            x1: response[i].xr
        })
        // eslint-disable-next-line no-unused-vars
        const { fx, x0, x1 } = this.state;

        this.secant(parseFloat(x0), parseFloat(x1));

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
        let { fx, x0, x1, i } = this.state;
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>Secant Method</h2>
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "#f2f2f2", borderRadius: "15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input>
                            <h2>X<sub>1</sub></h2><Input size="large" name="x1" style={InputStyle}></Input><br /><br />
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
                                        () => this.secant(parseFloat(x0), parseFloat(x1))
                                    }
                                        style={{ background: "#4caf50", color: "white" }}>Submit</Button>
                                </div>
                            </div>

                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="Secant Method" />}
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
                            <label style={{ color: "black" }}>X<sub>1</sub>: {x1}</label><br />
                            <Table columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                            ></Table>
                        </Card>
                    }
                </div>

            </div>

        );
    }
}
export default Secant;




