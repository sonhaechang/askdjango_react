import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";
import useAxios from "axios-hooks"
import { useAppContext } from 'store';

function SuggestionList({ style }) {
    const { store: { accessToken } } = useAppContext();
    const apiUrl = 'http://localhost:8000/accounts/suggestions/';
    const headers = { Authorization: `Bearer ${accessToken}` };
    const [userList, setUserList] = useState([]);
    // const [{ data: userList, loading, error }, refetch] = useAxios({
    const [{ data: originUserList, loading, error }] = useAxios({
        url: apiUrl, headers
    });

    const onFollowUser = username => {
        setUserList(prevUserList =>
            prevUserList.map(user =>
                user.username !== username ? user : { ...user, is_follow: true }
            )
        );
    };

    useEffect(() => {
        if (!originUserList) {
            setUserList([]);
        } else {
            setUserList(originUserList.map(user => ({...user, is_follow: false})));
        }
    }, [originUserList]);

    return (
        <div style={style}>
            {loading && <div>Loading...</div>}
            {error && <div>로딩중 에러가 발생했습니다.</div>}

            <Card title="Suggestions for you " size="small">
                {userList.map(suggestionUser => (
                    <Suggestion
                        key={suggestionUser.username}
                        suggestionUser={suggestionUser}
                        onFollowUser={onFollowUser}
                    />
                ))}
            </Card>
        </div>
    );
}

export default SuggestionList;