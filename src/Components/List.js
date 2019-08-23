import React from 'react';

const List = props => {
    console.log('List is rendering...');

    return (
        <ul>
            {
                props.items.map(item => {
                    return (
                        <li key={item.id} onClick={props.onClick.bind(this, item.id)}>{item.name}</li>
                    )
                })
            }
        </ul>
    )
};

export default List;
