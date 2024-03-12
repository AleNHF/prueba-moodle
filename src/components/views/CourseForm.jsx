import React, { useEffect, useState } from "react";

const CourseForm = () => {
    const [fullname, setFullname] = useState(''); //fullname 
    const [shortname, setShortname] = useState(''); //course short name
    const [categoryId, setCategoryId] = useState(1); //category id
    const [idNumber, setIdNumber] = useState(''); //optional - the new course idnumber
    const [summary, setSummary] = useState(''); //optional - summary
    const [summaryFormat, setSummaryFormat] = useState(1); //description format (1 = HTML, 0 = MOODLE, 2 = PLAIN, or 4 = MARKDOWN)
    const [startDate, setStartDate] = useState(0); //optional - timestamp when the course start
    const [endDate, setEndDate] = useState(0); //optional - timestamp when the course end
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([]);

    const wstoken = 'cabeb2dd739b6f1f17d4b5114bbd32e1';
    const wsfunctionCourse = 'core_course_create_courses';
    const wsfunctionCategories = 'core_course_get_categories';
    const moodlewsrestformat = 'json';
    const apiUrl = 'http://localhost/escuela-moodle/moodle/webservice/rest/server.php';

    useEffect(() => {
        const fetchCategories = async () => {
            const addsubcategories = 0;

            try {
                const response = await fetch(
                    `${apiUrl}?wstoken=${wstoken}&wsfunction=${wsfunctionCategories}&addsubcategories=${addsubcategories}&moodlewsrestformat=${moodlewsrestformat}`
                );

                if (!response.ok) {
                    throw new Error('Error al obtener las categorías');
                }

                const data = await response.json();

                const categoryList = data.map((category) => ({
                    id: category.id,
                    name: category.name,
                }));

                setCategories(categoryList);
            } catch (error) {
                console.error('Error al obtener las categorías:', error.message);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén completados
        if (!fullname || !shortname || !categoryId) {
            setError('Los campos "Nombre", "Nombre corto" y "Categoría" son obligatorios');
            return;
        }

        // Construir los datos para la solicitud
        const data = new URLSearchParams();
        data.append('moodlewsrestformat', moodlewsrestformat);
        data.append('wstoken', wstoken);
        data.append('wsfunction', wsfunctionCourse);
        data.append('courses[0][fullname]', fullname);
        data.append('courses[0][shortname]', shortname);
        data.append('courses[0][categoryid]', categoryId);
        data.append('courses[0][idnumber]', idNumber);
        data.append('courses[0][summary]', summary);
        data.append('courses[0][summaryformat]', summaryFormat);
        data.append('courses[0][startdate]', startDate);
        data.append('courses[0][enddate]', endDate);

        try {
            const url = `${apiUrl}?${data.toString()}`;
            console.log('url', url)
            const response = await fetch(`${apiUrl}?${data.toString()}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Error al crear el curso');
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            setMessage('Curso registrado con éxito');
            setTimeout(() => {
                setMessage(null);
            }, 2000);

            setFullname('');
            setShortname('');
            setCategoryId(0);
            setIdNumber('');
            setSummary('');
            setSummaryFormat('');
            setStartDate(0);
            setEndDate(0);
            setError('');
        } catch (error) {
            console.error('Error al crear el curso:', error.message);
            setError('Error al crear el curso');
        }
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Crear Curso</h2>
            {message && <p className="text-green-500 mb-2">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Nombre del Curso:
                    <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="w-full p-2 border rounded-md" />
                </label>
                <label className="block mb-2">
                    Nombre corto:
                    <input type="text" value={shortname} onChange={(e) => setShortname(e.target.value)} className="w-full p-2 border rounded-md" />
                </label>
                <label className="block mb-2">
                    Identificador:
                    <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="w-full p-2 border rounded-md" />
                </label>
                <label className="block mb-2">
                    Descripción:
                    <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full p-2 border rounded-md" />
                </label>
                <label className="block mb-2">
                    Seleccione una categoría:
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Seleccione una categoría</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="block mb-2">
                    Fecha de Inicio:
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 border rounded-md" />
                </label>
                <label className="block mb-2">
                    Fecha de Finalización:
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 border rounded-md" />
                </label>
                <label className="block mb-2">
                    Formato:
                    <select
                        value={summaryFormat}
                        onChange={(e) => setSummaryFormat(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="1">HTML</option>
                        <option value="0">MOODLE</option>
                        <option value="2">PLAIN</option>
                        <option value="4">MARKDOWN</option>
                    </select>
                </label>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Crear Curso</button>
            </form>
        </div>
    );
};

export default CourseForm;
