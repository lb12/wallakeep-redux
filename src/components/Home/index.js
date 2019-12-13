import { connect } from 'react-redux';

import Home from './Home';

const mapStateToProps = state => ({
    user: state.user
})

/* const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch( setUser(user) )
}); */

export default connect(mapStateToProps)(Home);