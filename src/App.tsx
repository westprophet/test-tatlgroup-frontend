import React from 'react';
import './scss/App.css';

import Container from '@material-ui/core/Container';
import SchoolTableContainer from  './components/SchoolTableContainer'
// import TestComp from  './components/TestComp'
function App() {
    return (
        <div className="App">
            <React.Fragment>
                <Container>
                    {/*<TestComp/>*/}
                    <SchoolTableContainer/>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default App;
