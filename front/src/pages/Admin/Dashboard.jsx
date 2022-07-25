import { useState, useEffect, useCallback } from 'react'
import ListComponent from './components/ListComponent'
import ArrayLoader from './components/ArrayLoader'
import { API_URL } from "../../services/constants/index.js";
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#F261E5', '#02F7F3', '#8502F7'];

function Dashboard() {

    const [logs, setLogs] = useState(false)

    useEffect(() => { fetchLogs() }, [])

    const fetchLogs = useCallback(() => {
        fetch(`${API_URL}/access-logs/dashboard`)
            .then((res) => res.json())
            .then((res) => {
                res.statusCodes = res.statusCodes.map((status) => {
                    return {
                        name: status._id,
                        value: status.totalReq
                    }
                })
                res.methods = res.methods.map((method) => {
                    return {
                        name: method._id,
                        value: method.totalReq
                    }
                })
                res.urls = res.urls.map((url) => {
                    return {
                        name: url._id,
                        value: url.totalReq
                    }
                })
                res.days = res.days.map((day) => {
                    return {
                        name: day._id,
                        value: day.totalReq
                    }
                })
                console.log(res)
                setLogs(res)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    return (
        <div>
            <div className="text-left overflow-x-auto relative mx-5 my-5">
                <h2 className="font-bold">Dashboard</h2>

                <div>
                    <p>Requests by status code:</p>
                    {logs?.statusCodes?.length > 0 &&
                        <PieChart width={300} height={300}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={logs.statusCodes}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                label
                            >
                                {logs.statusCodes.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    }
                    <p>Requests by method:</p>
                    {logs?.methods?.length > 0 &&
                        <PieChart width={300} height={300}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={logs.methods}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                label
                            >
                                {logs.methods.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    }

                    <p>Top 5 API URLs:</p>
                    {logs?.urls?.length > 0 &&
                        <PieChart width={300} height={300}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={logs.urls}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                label
                            >
                                {logs.urls.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    }
                    <p>Requests per day:</p>
                    {logs?.days?.length > 0 &&
                        <BarChart
                            width={500}
                            height={300}
                            data={logs.days}
                            label
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    }
                    {logs.length == 0 && <p>Aucune donnée trouvée</p>}
                    {!logs && <ArrayLoader />}
                </div>
            </div>
        </div>
    )
}

export default Dashboard