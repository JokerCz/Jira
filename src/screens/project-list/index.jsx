import React from "react";
import { useEffect, useState } from "react";
import * as qs from "qs";
import { cleanObject } from "screens/uitls";
import { useMount, useDebounce } from "../uitls/index";

import { List } from "./list";
import { SearchPanel } from "./search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([]);

    const [param, setParam] = useState({
        name: "",
        personId: "",
    });
    const debounceParam = useDebounce(param, 2000);
    const [list, setList] = useState([]);

    useEffect(() => {
        // fetch(`http://localhost:3001/projects?name=${param.name}&personId=${param.personId}`).then(async (response) => {
        // fetch(`http://localhost:3001/projects?${qs.stringify(cleanObject(param))}`).then(async (response) => {
        fetch(
            `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
        ).then(async (response) => {
            if (response.ok) {
                setList(await response.json());
            }
        });
    }, [debounceParam]);

    useMount(() => {
        // fetch(`http://localhost:3001/users`).then(async response => {
        fetch(`${apiUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json());
            }
        });
    }, []);

    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List users={users} list={list} />
        </div>
    );
};
