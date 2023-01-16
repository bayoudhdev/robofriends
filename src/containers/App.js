import React, {useState, useEffect} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll"
import './App.css'
import ErrorBoundry from "../components/ErrorBoundry";

function App() {
    const [robots, setRobots] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchField, setSearchField] = useState('');
    const [count, setCount] = useState(0)

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                setLoading(users == null)
                setRobots(users);
                console.log(users)
            })
    }, [count])  // only run if count change

    const onSearchChange = (event) => setSearchField(event.target.value);

    const filterRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })

    return (!robots.length && isLoading) ? <h1 className={'tc'}>Loading...</h1> : (<div className='tc'>
        <h1 className='f1'>RobotFriends</h1>
        <button onClick={()=> setCount(count + 1)}>Click me !</button>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
            <ErrorBoundry>
                <CardList robots={filterRobots}/>
            </ErrorBoundry>
        </Scroll>
    </div>);
}

export default App;