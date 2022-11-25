import { useState } from 'react';
import SearchResult from './searchResult';

const SearchBar = () => {
    const [lang, setLang] = useState('');
    const [users, setUsers] = useState([]);
    const [result, setResult] = useState(false);
    const [search_usr, setSearch_usr] = useState(true);

    const handleChange = event => {
        setResult(false)
        setLang(event.target.value);
    };

    const handleChangeList = event => {
        setResult(false)
        setSearch_usr(toggle => !toggle)
    };

    async function getData() {
        setResult(true)
        if (lang !== '') {
            setUsers([])
            var API_URL = ''
            if (search_usr === true)
                API_URL = 'https://api.github.com/search/users?q=language:' + lang + '+type:user'
            else
                API_URL = 'https://api.github.com/search/repositories?q=language:' + lang
            const response = await fetch(API_URL)
            const data = await response.json()
            data.items.forEach(item => {
                var usrName = search_usr ? item.login : item.owner.login
                setUsers(oldArray => [...oldArray, { user: usrName, url: item.html_url }])
            })

        }

    }

    const printResults = () => {
        if (lang === '' && result === false)
            return ('')
        else if (lang === '' && result === true)
            return ("Input the desired language.")
        else if (users.length > 0 && result === true) {
            var text = 'Search';
            if (search_usr === true)
                text += " all users who have contributed to "
            else
                text += " all repositories related to "
            return (<SearchResult data={users} text={text + lang} title={search_usr ? 'User' : 'Repository'} />)
        }

    }

    return (
        <div style={{ marginTop: "60px" }}>
            <select id="lang" onChange={handleChangeList} >
                <option >Search users</option>
                <option >Search repositories</option>
            </select>
            <input type="text" placeholder="Ex:React" style={{ marginLeft: "20px" }} onChange={handleChange} />
            <button onClick={getData}>Search</button>
            <div>{printResults()}</div>
        </div>
    )
}

export default SearchBar