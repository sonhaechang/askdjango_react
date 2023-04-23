import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";
import Axios from "axios";
import { useAppContext } from 'store';

function SuggestionList({ style }) {
    const  [userList, setUserList] = useState([]);
    const { store: { accessToken } } = useAppContext();

    useEffect(()=> {

        const fetchUserList = async () => {
            try {
                const apiUrl = "http://localhost:8000/accounts/suggestions/";
                const headers = { Authorization: `Bearer ${accessToken}` };
                const { data } = await Axios.get(apiUrl, { headers });
                setUserList(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserList();
    }, [setUserList, accessToken]);

    return (
        <div style={style}>
            <Card title="Suggestions for you " size="small">
                {userList.map(suggestionUser => (
                    <Suggestion
                        key={suggestionUser.username}
                        suggestionUser={suggestionUser}
                    />
                ))}
            </Card>
        </div>
    );
}

export default SuggestionList;