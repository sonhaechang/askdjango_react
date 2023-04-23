import React from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";
import useAxios from "axios-hooks"
import { useAppContext } from 'store';

function SuggestionList({ style }) {
    const { store: { accessToken } } = useAppContext();
    const apiUrl = 'http://localhost:8000/accounts/suggestions/';
    const headers = { Authorization: `Bearer ${accessToken}` };
    // const [{ data: userList, loading, error }, refetch] = useAxios({
    const [{ data: userList, loading, error }] = useAxios({
        url: apiUrl, headers
    });

    return (
        <div style={style}>
            {loading && <div>Loading...</div>}
            {error && <div>로딩중 에러가 발생했습니다.</div>}

            <Card title="Suggestions for you " size="small">
                {userList && userList.map(suggestionUser => (
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