import React, {Component} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll"
import './App.css'
import ErrorBoundry from "../components/ErrorBoundry";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            robots: [], searchField: '', isLoading: true
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                this.setState({
                    robots: users, isLoading: users != null
                })
            })
    }

    onSearchChange = (event) => this.setState({searchField: event.target.value})

    render() {
        const {robots, searchField, isLoading} = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return (!robots.length && isLoading) ? <h1 className={'tc'}>Loading...</h1> : (<div className='tc'>
            <h1 className='f1'>RobotFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filterRobots}/>
                </ErrorBoundry>
            </Scroll>
        </div>);
    }
}

export default App;