import { useEffect } from 'react';
import { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
} from "react-router-dom";

function ListComponent( {users = [], messages = [], logs = []}) {

    console.log(logs)
    const getProperties = (array) => {
        if(array !== undefined) {
            return Object.keys(array)
        }
    }

    const getValues = (array) => {
        if(array !== undefined) {
            return Object.values(array)
        }
    }

    const headTable = ( users, messages, logs ) => {

        let head = []

        if(users.length > 0) {
            getProperties(users[0]).map( (property) => {
                head.push(<th scope="col" class="py-3 px-6">{property}</th>)
            })
        }
        if(users.length > 0) {
            head.push(
            <th scope="col" class="py-3 px-6">Editer</th>,
            <th scope="col" class="py-3 px-6">Supprimer</th>
            )
        }
        if(messages.length > 0) {
            getProperties(messages[0]).map( (property) => {
                head.push(<th scope="col" class="py-3 px-6">{property}</th>)
            })
        }
        if(messages.length > 0) {
            head.push(<th scope="col" class="py-3 px-6">Editer</th>)
        }
        if(logs.length > 0) {
            head.push(
                <th scope="col" class="py-3 px-6">ID</th>,
                <th scope="col" class="py-3 px-6">Host</th>,
                <th scope="col" class="py-3 px-6">Method</th>,
                <th scope="col" class="py-3 px-6">Url</th>,
                <th scope="col" class="py-3 px-6">Status</th>,
                <th scope="col" class="py-3 px-6">Date</th>
            )
        }
        return head;
    }
    
    const bodyTable = ( users, messages, logs ) => {

        let body = [];

        if(users.length > 0) {
            users.map( (user) => {
                body.push(<tr>{getValues(user).map( (value) => {
                    return <td class="border px-6 py-4">{value}</td>
                })}</tr>)
            }
            )
        }
        if(messages.length > 0) {
            messages.map( (message) => {
                body.push(<tr>{getValues(message).map( (value) => {
                    return <td class="border px-6 py-4">{value}</td>
                })}</tr>)
            }
            )
        }
        if(logs.length > 0) {
            logs.map( (log) => {
                body.push(
                    <tr>
                        <td class="border px-6 py-4">{log[0].timestamp}</td>
                    </tr>
                )
            })
        }

        body.map( (item) => {
            item.props.children.push(
                users.length > 0 && (
                    <td class="border px-6 py-4">
                    <Link to={`/admin/users-list/${item.props.children[0].props.children}`}>
                        <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            Editer
                        </button>
                    </Link>
                    </td>
                ),
                messages.length > 0 && (
                    <td class="border px-6 py-4">
                    <Link to={`/admin/messages-list/${item.props.children[0].props.children}`}>
                        <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            Editer
                        </button>
                    </Link>
                    </td>
                )
            )
        }
        )

        return body;
    }

    return (
        <div class=" shadow-md sm:rounded-lg mx-5 my-5">
            <table class="table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    { headTable( users, messages, logs ) }
                </thead>
                <tbody>
                    { bodyTable( users, messages, logs ) }
                </tbody>
            </table>
        </div>
    )
}

export default ListComponent