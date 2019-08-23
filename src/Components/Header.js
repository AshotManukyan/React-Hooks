import React, { useContext } from 'react';
import AuthContext from '../Auth-context';

const Header = props => {
    const header = useContext(AuthContext);

    return (
        <header>
            {
                header.status
                    ?
                    <button onClick={props.onLoadToDos}>Todo list</button>
                    :
                    null
            }
            <button onClick={props.onLoadAuth}>Auth</button>
        </header>
    )
};

export default Header;
