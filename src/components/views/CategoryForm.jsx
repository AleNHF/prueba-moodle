import React, { useState } from "react";

const CategoryForm = () => {
    const [name, setName] = useState(''); //new category name 
    const [idNumber, setIdNumber] = useState(''); //optional - the new category idnumber
    const [description, setDescription] = useState(''); //optional - the new category description
    const [descriptionFormat, setDescriptionFormat] = useState(1); //description format (1 = HTML, 0 = MOODLE, 2 = PLAIN, or 4 = MARKDOWN)
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const wstoken = 'cabeb2dd739b6f1f17d4b5114bbd32e1';
    const wsfunction = 'core_course_create_categories';
    const moodlewsrestformat = 'json';
    const apiUrl = 'http://localhost/escuela-moodle/moodle/webservice/rest/server.php';

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén completados
        if (!name || !descriptionFormat) {
            setError('Los campos "Nombre" y "Formato" son obligatorios');
            return;
        }

        // Construir los datos para la solicitud
        const data = new URLSearchParams();
        data.append('moodlewsrestformat', moodlewsrestformat);
        data.append('wstoken', wstoken);
        data.append('wsfunction', wsfunction);
        data.append('categories[0][name]', name);
        data.append('categories[0][parent]', 0); //the parent category id inside which the new category will be created - set to 0 for a root category
        data.append('categories[0][idnumber]', idNumber);
        data.append('categories[0][description]', description);
        data.append('categories[0][descriptionformat]', descriptionFormat);

        try {
            const url = `${apiUrl}?${data.toString()}`;
            console.log('url', url)
            const response = await fetch(`${apiUrl}?${data.toString()}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Error al crear la categoría');
            }

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            setMessage('Categoría registrada con éxito');
            setTimeout(() => {
                setMessage(null);
            }, 2000);

            setName('');
            setDescription('');
            setIdNumber('');
            setDescriptionFormat(1);
            setError('');
        } catch (error) {
            console.error('Error al crear la categoría:', error.message);
            setError('Error al crear la categoría');
        }
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Crear Categoría</h2>
            {message && <p className="text-green-500 mb-2">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Nombre de la Categoría:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-md" />
                </label>
                <label className="block mb-2">
                    Número ID:
                    <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="w-full p-2 border rounded-md" />
                </label>
                <label className="block mb-2">
                    Descripción:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-md" />
                </label>
                <label className="block mb-2">
                    Formato:
                    <select
                        value={descriptionFormat}
                        onChange={(e) => setDescriptionFormat(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="1">HTML</option>
                        <option value="0">MOODLE</option>
                        <option value="2">PLAIN</option>
                        <option value="4">MARKDOWN</option>
                    </select>
                </label>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Crear Categoría</button>
            </form>
        </div>
    );
};

export default CategoryForm;
