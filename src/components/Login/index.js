import { connect } from 'react-redux';

import { setUser } from '../../store/actions';
import Login from './Login';

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch( setUser(user) )
});

export default connect(null, mapDispatchToProps)(Login);