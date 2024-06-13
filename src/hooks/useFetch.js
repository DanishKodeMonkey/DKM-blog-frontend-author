import { useEffect, useState } from 'react';

const useFetch = (fetchFunction) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await fetchFunction();
                console.log(result);
                setData(result);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fetchFunction]);
    return { data, loading, error };
};

export default useFetch;
