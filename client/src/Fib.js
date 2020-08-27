import React, {Component} from 'react';
import axios from 'axios';

class Fib extends Component {
    constructor(props){
        super(props);
        this.state = {
            seenIndexes: [],
            values: {},
            value: ''
        }
    }

    componentDidMount(){
        this.fetchValues();
        this.fetchIndexes()
    }

    async fetchValues(){
        const values = await axios.get('/api/values/current')
        this.setState({
            ...this.state,
            values:values.data
        })
    }

    async fetchIndexes(){
        const values = await axios.get('/api/values/all')
        this.setState({
            ...this.state,
            seenIndexes:values.data
        })
    }

    onChange=(e)=>{
        const val = e.target.value
        this.setState({
            ...this.state,
            value: val
        })    
    }
    
    handleSubmit = async (e) => {
        debugger
        e.preventDefault();

        await axios.post('/api/values',{
            index: this.state.value
        })
        this.setState({
            ...this.state,
            value: ''
        })
    }

    render(){
        return (
            <div>
                <form>
                    <label>Enter index : </label>
                    <input type="text" value={this.state.value} onChange={this.onChange} />
                    
                    <h3>Indexes I have seen</h3>
                    {
                        this.state.seenIndexes.map((indexy)=>{
                            return <p>Index: {indexy.number}</p>
                        })
                    }
                    <h3>Calculated Values</h3>
                    {
                        Object.keys(this.state.values).map((indexy)=>{
                            console.log(this.state.values)
                            return <p><span>For Index {indexy} I Calculated </span> : <span>{this.state.values[indexy]}</span></p>
                        })
                    }
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Fib;