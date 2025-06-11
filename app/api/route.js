export async function GET(request) {
    // Fetch data from the API
    const url = 'https://api.freeapi.app/api/v1/kitchen-sink/response';
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(error.message, {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        });
    }
    }
