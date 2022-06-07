import React from "react";
import { useEffect, useState } from "react";
import * as qs from "qs"
import { cleanObject } from "screens/uitls";

import { List } from "./list";
import { SearchPanel } from "./search-panel";

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([]);

    const [param, setParam] = useState({
        name: "",
        personId: "",
    });
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/project?name=${qs.stringify(cleanObject(param))}`).then(async (response) => {
            if (response.ok) {
                setList(await response.json());
            }
        });
    }, [param]);

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json());
            }
        });
    }, [])
    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List list={list} users={users} />
        </div>
    );
};
