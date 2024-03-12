import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchCourses();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                'https://localhost:443/escuela-moodle/moodle/webservice/rest/server.php',
                {
                    params: {
                        wstoken: 'cabeb2dd739b6f1f17d4b5114bbd32e1',
                        wsfunction: 'core_course_get_categories',
                        addsubcategories: 0,
                        moodlewsrestformat: 'json',
                    },
                }
            );

            if (response.data && response.data.length > 0) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get(
                'https://localhost:443/escuela-moodle/moodle/webservice/rest/server.php',
                {
                    params: {
                        wstoken: 'cabeb2dd739b6f1f17d4b5114bbd32e1',
                        wsfunction: 'core_course_get_courses',
                        moodlewsrestformat: 'json',
                    },
                }
            );

            if (response.data && response.data.length > 0) {
                setCourses(response.data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    return (
        <div className="flex">
            {/* Tabla para mostrar categorías */}
            <div className="w-1/2 p-4">
                <h2 className="text-xl font-bold mb-4">Categorías Creadas</h2>
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Nombre</th>
                            <th className="border border-gray-300 p-2">ID</th>
                            {/* Agregar más columnas según sea necesario */}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td className="border border-gray-300 p-2">{category.name}</td>
                                <td className="border border-gray-300 p-2">{category.id}</td>
                                {/* Agregar más celdas según sea necesario */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tabla para mostrar cursos */}
            <div className="w-1/2 p-4">
                <h2 className="text-xl font-bold mb-4">Cursos</h2>
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Nombre del Curso</th>
                            <th className="border border-gray-300 p-2">ID del Curso</th>
                            {/* Agregar más columnas según sea necesario */}
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td className="border border-gray-300 p-2">{course.fullname}</td>
                                <td className="border border-gray-300 p-2">{course.id}</td>
                                {/* Agregar más celdas según sea necesario */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
