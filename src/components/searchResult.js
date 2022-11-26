import DataTable from 'react-data-table-component';
import React from 'react'

const SearchResult = (props) => {
    return (<div>
        <h4>{props.text}</h4>
        <DataTable
            columns={[
    {
        name: props.title,
        selector: row => row.user
    },
    {
        name: 'URL',
        selector: row => row.url
    }
]}
            data={props.data}
            pagination
        />
    </div>

    );
};

export default SearchResult
