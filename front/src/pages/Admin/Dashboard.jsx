import { useState, useEffect, useCallback } from 'react'
import ListComponent from './components/ListComponent'
import ArrayLoader from './components/ArrayLoader'
import { API_URL } from "../../services/constants/index.js";
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
                console.log(res)
                setLogs(res)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    return (
        <div>
            <div class="text-left overflow-x-auto relative mx-5 my-5">
                <h2 class="font-bold">Dashboard</h2>
            </div>
            <div>
                <p>Requests by status code:</p>
                {logs?.statusCodes?.length > 0 &&
                    <PieChart width={300} height={200}>
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
                    <PieChart width={300} height={200}>
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
                {logs.length == 0 && <p>Aucune donnée trouvée</p>}
                {!logs && <ArrayLoader />}
            </div>
        </div>
    )
}

export default Dashboard