import { useEffect } from 'react';
import { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from "react-router-dom";

function ListComponent( {users = [], messages = [], logs = []}) {

    const bodyTable = ( users, messages, logs ) => {

        let body;

        if(users.length > 0) {
            body = (
                users.map( user => (
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            { user.id }
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            { user.email }
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            { user.fullName }
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            {/* <Link to={`/admin/users-list/${user.id}`}>
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Edit
                                </button>
                            </Link> */}
                        </td>
                    </tr>
                ))
            )
        }
        if(messages.length > 0) {
            body = (
                messages.map( message => (
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            { message.id }
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            { message.sender }
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            { message.receiver }
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            { message.message }
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            { message.date }
                        </td>
                    </tr>
                ))
            )
        }
        if(logs.length > 0) {
            body = (
                logs.map( log => (
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            { log.id }
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            { log.date }
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                            { log.message }
                        </td>
                    </tr>
                ))
            )
        }

        return body;
    }

    const headTable = ( users, messages, logs ) => {

        let head;

        if(users.length > 0) {
            head = (
                <tr>
                    <th scope="col" class="py-3 px-6">
                        Id
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Email
                    </th>
                    <th scope="col" class="py-3 px-6">
                        FullName
                    </th>
                    <th scope="col" class="py-3 px-6">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            )
        }
        if(messages.length > 0) {
            head = (
                <tr>
                    <th scope="col" class="py-3 px-6">
                        Id
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Sender
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Receiver
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Message
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Date
                    </th>
                    <th scope="col" class="py-3 px-6">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            )
        }
        if(logs.length > 0) {
            head = (
                <tr>
                    <th scope="col" class="py-3 px-6">
                        Id
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Date
                    </th>
                    <th scope="col" class="py-3 px-6">
                        Message
                    </th>
                </tr>
            )
        }

        return head;
    }
    return (
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg mx-5 my-5">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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