import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie"; // Importar useCookies
import DASHBOARD_ENDPOINTS from "../constants/endpoints";
import "./Dashboard.css";

const Dashboard = () => {
    const section = window.location.pathname.replace("/", "").toUpperCase();
    const queryClient = useQueryClient();
    const [editRow, setEditRow] = useState(null);
    const { register, handleSubmit, setValue, reset } = useForm();
    const [cookies, setCookie] = useCookies(["user"]); // Manejar cookies
    const userId = cookies.user?.id; // Obtener el ID del usuario de la cookie
    const { isPending, error, data } = useQuery({
        queryKey: ["getDashboardData", section],
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:8000/${DASHBOARD_ENDPOINTS[section]}`
            );
            return res.data;
        },
    });

    const mutation = useMutation({
        mutationFn: async (updatedRow) => {
            return axios.put(
                `http://localhost:8000/users/${updatedRow.id}`,
                updatedRow
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["getDashboardData", section]);
            setEditRow(null);
            reset();
        },
    });

    const handleEditClick = (row) => {
        setEditRow(row.id);
        Object.keys(row).forEach((key) => setValue(key, row[key]));
    };

    const onSubmit = (updatedRow) => {
        mutation.mutate(updatedRow);
    };

    useEffect(() => {
        const fetchToken = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8000/users/${userId}`); // Usar el ID de la cookie
                    const tokenData = response.data; // Ajusta esto según la respuesta de tu API

                    // Solo actualiza la cookie si los datos son diferentes
                    if (JSON.stringify(tokenData) !== JSON.stringify(cookies.user)) {
                        setCookie("user", tokenData, { path: '/' }); // Guardar en la cookie
                    }
                    console.log(tokenData);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    // Limpiar todas las cookies
                    Object.keys(cookies).forEach((key) => {
                        setCookie(key, "", { path: "/" });
                    });
                }
            } else {
                console.warn("No user ID found in cookies.");
            }
        };

        fetchToken();
    }, [userId]); // Dependencia de userId

    if (isPending) return `Loading ${DASHBOARD_ENDPOINTS[section]} data...`;

    if (error) return "An error has occurred: " + error.message;

    return (
        <main id="dashboardMain">
            <h1>Dashboard de {section}</h1>
            {data && data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key, index) => (
                                <th key={key + index}>{key}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                {editRow === row.id ? (
                                    Object.keys(row).map((key, index) => (
                                        <td key={key + index}>
                                            <input
                                                {...register(key)}
                                                defaultValue={row[key]}
                                            />
                                        </td>
                                    ))
                                ) : (
                                    Object.values(row).map((value, index) => (
                                        <td key={value + index}>{value}</td>
                                    ))
                                )}
                                <td>
                                    {editRow === row.id ? (
                                        <button onClick={handleSubmit(onSubmit)}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEditClick(row)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay data bro 😲</p>
            )}
        </main>
    );
};

export default Dashboard;
